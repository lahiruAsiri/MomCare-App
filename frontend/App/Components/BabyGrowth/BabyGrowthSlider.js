// App/Components/BabyGrowth/BabyGrowthSlider.js

import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import babyGrowthData from '../../data/babyGrowthData';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.45; // Width of each item
const ITEM_SPACING = (width - ITEM_WIDTH) / 2; // Spacing to center the item

const BabyGrowthSlider = ({ currentWeek, onWeekChange, onViewMore }) => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();


  useEffect(() => {
    // Scroll to the current week item when the component mounts
    if (flatListRef.current && currentWeek > 0 && currentWeek <= babyGrowthData.length) {
      flatListRef.current.scrollToIndex({
        index: currentWeek - 1,
        animated: true,
      });
    }
  }, [currentWeek]);

  const renderItem = ({ item, index }) => {
    const isCurrent = index === currentWeek - 1;

    return (
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => onWeekChange(index + 1)}
        style={[
          styles.itemContainer,
          isCurrent && styles.currentItemContainer
        ]}
      >
        <Image 
          source={item.image} 
          style={[
            styles.babyImage,
            isCurrent ? styles.currentBabyImage : styles.sideBabyImage
          ]} 
        />
        <Text style={styles.weekText}>Week {index + 1}</Text>
      </TouchableOpacity>
    );
  };

  const getItemLayout = (_, index) => (
    { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      onWeekChange(index + 1);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const handleViewMore = () => {
    navigation.navigate('BabyGrowthDetails', { week: currentWeek });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={babyGrowthData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
        initialScrollIndex={currentWeek - 1}
      />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {babyGrowthData[currentWeek - 1]?.description || 'Description not available for this week.'}
        </Text>
      </View>
      <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
      <Text style={styles.viewMoreText}>View More</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 3,
    // Add your desired background color here
},
  currentItemContainer: {
    width: 170,
    height: 200,
    // Optional: Add any additional styling for the centered item
  },
  babyImage: {
    borderRadius: 10,
  },
  currentBabyImage: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#E75480',
    backgroundColor: 'rgba(255, 176, 176, 0.9)'


  },
  sideBabyImage: {
    width: 130,
    height: 130,
    resizeMode: 'cover',
    opacity: 0.7,
    borderWidth: 2,
    borderColor: '#E75480',
    backgroundColor: 'rgba(235, 131, 23, 0.3)'
  },
  weekText: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
    fontSize: 18,
    color: '#E75480',
    fontWeight: '500',
  },
  descriptionContainer: {
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(235, 131, 23, 0.9)',
    backgroundColor: 'rgba(235, 131, 23, 0.2)',
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 25,
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: 'raleway',
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  viewMoreButton: {
    backgroundColor: '#EE9A72',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BabyGrowthSlider;
