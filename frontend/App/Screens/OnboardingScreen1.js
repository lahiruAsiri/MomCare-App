import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen1 = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
    source={require('../../assets/Background.png')}
    style={styles.backgroundImage}
    imageStyle={{ opacity: 0.7 }}
  >
    <View style={styles.container}>
      <Image
        source={require('../../assets/onboard1.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Discover Our Features</Text>
      <Text style={styles.description}>Description for the second onboarding screen.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OnboardingScreen2')}
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
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#E75480',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen1;