// OnboardingScreen2.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const OnboardingScreen2 = ({ navigation }) => {
  return (
    <ImageBackground
    source={require('../../assets/Background.png')}
    style={styles.backgroundImage}
    imageStyle={{ opacity: 0.7 }}
  >
    <View style={styles.container}>
      <Image
        source={require('../../assets/onboard2.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Discover Our Features</Text>
      <Text style={styles.description}>Description for the second onboarding screen.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Onboarding')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ffffff',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#E75480',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen2;