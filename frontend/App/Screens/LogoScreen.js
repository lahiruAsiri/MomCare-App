import React, { useEffect, useContext } from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingContext } from '../../OnboardingContext';

const LogoScreen = ({ navigation }) => {
  const { hasCompletedOnboarding, setHasCompletedOnboarding } = useContext(OnboardingContext);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('hasCompletedOnboarding');
        if (status === 'true') {
          setHasCompletedOnboarding(true);
          navigation.replace('Main');
        } else {
          navigation.replace('OnboardingFlow');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        navigation.replace('OnboardingFlow');
      }
    };

    const timer = setTimeout(checkOnboardingStatus, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
    source={require('../../assets/Background.png')}
    style={styles.backgroundImage}
    imageStyle={{ opacity: 0.7 }}
  >
    <View style={styles.container}>
      <Image
        source={require('../../assets/logonew.png')}
        style={styles.logo}
      />
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
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default LogoScreen;