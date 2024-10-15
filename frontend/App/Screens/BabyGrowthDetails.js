import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import babyGrowthData from '../data/babyGrowthData';

const BabyGrowthDetails = ({ route, navigation }) => {
  const { week } = route.params; // Passed week number from the previous screen
  const babyData = babyGrowthData[week - 1];

  // Function to navigate to the previous week's data
  const goToPreviousWeek = () => {
    const previousWeek = week - 1;
    if (previousWeek > 0) {
      navigation.navigate('BabyGrowthDetails', { week: previousWeek });
    } else {
      alert('This is the first week. No previous week data available.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Background.png')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.7 }}
    >
      <View style={styles.container}>
        <Image source={babyData.image} style={styles.babyImage} />

        <View style={styles.descriptionContainer}>
          <Text style={styles.weekText}>Week {week}</Text>
          <Text style={styles.descriptionText}>
            {babyData.description_2 || 'Detailed description not available for this week.'}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.goBackButton} 
          onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>

        {/* New button for navigating to previous week */}
        <TouchableOpacity 
          style={styles.previousWeekButton} 
          onPress={goToPreviousWeek}>
          <Text style={styles.previousWeekText}>View Previous Week's Info</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Set to transparent to see the background
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  babyImage: {
    position: 'absolute', // Fix the image position
    top: 90, // Adjust this value to change the vertical position
    left: '50%', // Center horizontally
    transform: [{ translateX: -80 }], // Adjust based on image width (e.g., half of 200px)
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: '#E75480',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 176, 176, 0.9)',
  },
  descriptionContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(235, 131, 23, 0.9)',
    backgroundColor: 'rgba(235, 131, 23, 0.2)',
    borderRadius: 10,
    marginTop: 240, // Adjust this value to prevent overlap with the image
    marginBottom: 10,
  },
  weekText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: 'raleway',
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: '#EE9A72',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 5,
  },
  goBackText: {
    
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previousWeekButton: {
    backgroundColor: '#E75480',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
  },
  previousWeekText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BabyGrowthDetails;
