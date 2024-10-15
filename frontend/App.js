import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

// Import existing components
import TabNavigation from './App/Navigations/TabNavigation';
import BabyGrowthScreen from './App/Screens/BabyGrowthScreen';
import BabyGrowthDetails from './App/Screens/BabyGrowthDetails';
import Homescreen from './App/Screens/Index';
import OnboardingScreen from './App/Screens/OnboardingScreen';
import HealthMonitoringScreen from './App/Screens/HealthMonitoringScreen';
import PreviousCalculationsScreen from './App/Screens/PreviousCalculationsScreen';

// Import new components
import LogoScreen from './App/Screens/LogoScreen';
import OnboardingScreen1 from './App/Screens/OnboardingScreen1';
import OnboardingScreen2 from './App/Screens/OnboardingScreen2';

import { UserLocationContext } from './App/Context/UserLocationContext';
import { OnboardingProvider } from './OnboardingContext';

const Stack = createStackNavigator();

const OnboardingFlow = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
    <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fontsLoaded] = useFonts({
    'raleway': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-SemiBold.ttf'),
    'Appname': require('./assets/fonts/Fredoka-SemiBold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem('hasCompletedOnboarding');
        setHasCompletedOnboarding(onboardingStatus === 'true');

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading || !fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E75480" />
      </View>
    );
  }

  return (
    <OnboardingProvider>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Logo" component={LogoScreen} />
            {!hasCompletedOnboarding && (
              <Stack.Screen name="OnboardingFlow" component={OnboardingFlow} />
            )}
            <Stack.Screen name="Main" component={TabNavigation} />
            <Stack.Screen name="Homescreen" component={Homescreen} />
            <Stack.Screen name="BabyGrowth" component={BabyGrowthScreen} />
            <Stack.Screen name="BabyGrowthDetails" component={BabyGrowthDetails} />
            <Stack.Screen name="HealthMonitoring" component={HealthMonitoringScreen} />
            <Stack.Screen name="PreviousCalculations" component={PreviousCalculationsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </UserLocationContext.Provider>
    </OnboardingProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});












// import React, { useEffect, useState, createContext } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import TabNavigation from './App/Navigations/TabNavigation';
// import BabyGrowthScreen from './App/Screens/BabyGrowthScreen';
// import BabyGrowthDetails from './App/Screens/BabyGrowthDetails';
// import Homescreen from './App/Screens/Index';
// import OnboardingScreen from './App/Screens/OnboardingScreen';
// import HealthMonitoringScreen from './App/Screens/HealthMonitoringScreen'; // Import the new screen
// import PreviousCalculationsScreen from './App/Screens/PreviousCalculationsScreen'; // Import the new screen


// import * as Location from 'expo-location';
// import { UserLocationContext } from './App/Context/UserLocationContext';
// import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';

// // Create a Context for Onboarding
// export const OnboardingContext = createContext();

// const Stack = createStackNavigator();

// const App = () => {
//   const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [fontsLoaded] = useFonts({
//     'raleway': require('./assets/fonts/Raleway-Regular.ttf'),
//     'raleway-bold': require('./assets/fonts/Raleway-SemiBold.ttf'),
//     'Appname': require('./assets/fonts/Fredoka-SemiBold.ttf'),
//     'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
//    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),

//   });

//   useEffect(() => {
//     const checkOnboardingStatus = async () => {
//       const status = await AsyncStorage.getItem('hasCompletedOnboarding');
//       setHasCompletedOnboarding(status === 'true');
//     };
//     checkOnboardingStatus();

//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc);
//     })();
//   }, []);

//   // Handle fonts not loaded
//   if (!fontsLoaded || hasCompletedOnboarding === null) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#E75480" />
//       </View>
//     );
//   }

//   // Handle location permission error
//   if (errorMsg) {
//     return (
//       <View style={styles.container}>
//         <Text>{errorMsg}</Text>
//       </View>
//     );
//   }

//   return (
//     <OnboardingContext.Provider value={{ hasCompletedOnboarding, setHasCompletedOnboarding }}>
//       <UserLocationContext.Provider value={{ location, setLocation }}>
//         <NavigationContainer>
//           <Stack.Navigator
//             screenOptions={{ headerShown: false }}
//             initialRouteName={hasCompletedOnboarding ? "Main" : "Onboarding"}
//           >
//             <Stack.Screen name="Onboarding" component={OnboardingScreen} />
//             <Stack.Screen name="Main" component={TabNavigation} />
//             <Stack.Screen name="Homescreen" component={Homescreen} />
//             <Stack.Screen name="BabyGrowth" component={BabyGrowthScreen} />
//             <Stack.Screen name="BabyGrowthDetails" component={BabyGrowthDetails} />
//             <Stack.Screen name="HealthMonitoring" component={HealthMonitoringScreen} /> 
//             <Stack.Screen name="PreviousCalculations" component={PreviousCalculationsScreen} /> 

//             {/* Add other global screens here */}
//           </Stack.Navigator>
//         </NavigationContainer>
//         <StatusBar style="auto" />
//       </UserLocationContext.Provider>
//     </OnboardingContext.Provider>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });
