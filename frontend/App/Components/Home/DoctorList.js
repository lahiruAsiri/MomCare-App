import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Updated import for LinearGradient

const doctors = [
  { id: '1', name: 'Dr. John Doe', image: require('../../../assets/DoctorImage.jpeg') },
  { id: '2', name: 'Dr. Sarah Smith', image: require('../../../assets/DoctorImage.jpeg') },
  { id: '3', name: 'Dr. William Lee', image: require('../../../assets/DoctorImage.jpeg') },
  { id: '4', name: 'Dr. Emily Clark', image: require('../../../assets/DoctorImage.jpeg') },
  { id: '5', name: 'Dr. James Bond', image: require('../../../assets/DoctorImage.jpeg') },
  { id: '6', name: 'Dr. Jane Miller', image: require('../../../assets/DoctorImage.jpeg') },
  { id: '7', name: 'Dr. David Wong', image: require('../../../assets/DoctorImage.jpeg') },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

const DoctorList = () => {
  const [scrollX] = useState(new Animated.Value(0));
  const flatListRef = useRef(null);

  useEffect(() => {
    const middleIndex = Math.floor(doctors.length / 2);
    const offset = middleIndex * (SCREEN_WIDTH * 0.35);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset, animated: false });
    }
  }, []);

  const renderDoctor = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (SCREEN_WIDTH * 0.35), 
      index * (SCREEN_WIDTH * 0.35),        
      (index + 1) * (SCREEN_WIDTH * 0.35),  
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8], 
      extrapolate: 'clamp', 
    });

    return (
      <Animated.View style={[styles.doctorCard, { transform: [{ scale }] }]}>
        <Image source={item.image} style={styles.doctorImage} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.89)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientOverlay}
        />
        <View style={styles.nameOverlay}>
          <Text style={styles.doctorName}>{item.name}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingHorizontal: (SCREEN_WIDTH - 185) / 2, // Adjust as needed for spacing
        }} 
        snapToInterval={SCREEN_WIDTH * 0.35} 
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true } 
        )}
        scrollEventThrottle={16} 
      />
    </View>
  );
};

export default DoctorList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  doctorCard: {
    marginHorizontal: 1, // Change this value to increase/decrease the gap between doctor cards
    backgroundColor: '#fff',
    borderRadius: 15,
    width: SCREEN_WIDTH * 0.35,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  doctorImage: {
    width: '100%', 
    height: 150, 
    borderRadius: 15, 
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  nameOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
