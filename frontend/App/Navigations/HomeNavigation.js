import { View, Text } from 'react-native';
import React from 'react';
import PlaceDetail from '../Components/PlaceDetails/PlaceDetail';
import Search from '../Screens/Search';
import BabyGrowth from '../Screens/BabyGrowthScreen'; // Import the BabyGrowth component
import BabyGrowthDetails from '../Screens/BabyGrowthDetails'; // Import the BabyGrowth component

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

const HomeNavigation = () => {
  const isAndroid = true;
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS)
      }}
    >
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
      {/* <Stack.Screen name="BabyGrowth" component={BabyGrowth} options={{ headerShown: false }} />
      <Stack.Screen name="BabyGrowthDetails" component={BabyGrowthDetails} options={{ headerShown: false }} /> */}

    </Stack.Navigator>
  );
};

export default HomeNavigation;