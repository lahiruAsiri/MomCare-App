import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from '../Screens/Index';
import Report from '../Screens/Report';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Map from '../Screens/map';
import Clinic from '../Screens/Clinic';
import Reminders from '../Screens/Remainders';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    
    return (
        <Tab.Navigator
        initialRouteName="Home" // Set the initial route to 'Home'

            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#EE9A72', // Set your tab bar background color here
                    borderTopWidth: 0, // Remove the top border
                    paddingBottom: 10, // Add padding to the bottom
                    height: 80,
                    borderRadius: 50, // Set a specific height for the tab bar
                    position: 'absolute', // Optional: Positioning can be adjusted if needed
                },
                tabBarLabelStyle: {
                    fontSize: 12, // Customize font size for labels (optional, can be removed)
                    marginBottom: 5, // Add margin to labels (optional, can be removed)
                    color: 'white', // Set label color to white (optional, can be removed)
                },
                tabBarIconStyle: {
                    // Center icons vertically
                    marginBottom: 0,
                },
                tabBarActiveTintColor: 'white', // Active tab icon color
                tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)', // Inactive tab icon color
            }}
        >
            <Tab.Screen
                name="Report"
                component={Report}
                options={{
                    tabBarLabel: () => null, // Remove label
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="search" size={24} color="white" />
                    ),
                }}
            />
            <Tab.Screen
                name="Remainders"
                component={Reminders}
                options={{
                    tabBarLabel: () => null, // Remove label
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="heartbeat" size={24} color="white" />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Index}
                options={{
                    tabBarLabel: () => null, // Remove label
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={45} color="white" />
                    ),
                }}
            />
            <Tab.Screen
                name="Clinic"
                component={Clinic}
                options={{
                    tabBarLabel: () => null, // Remove label
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-circle" size={24} color="white" />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarLabel: () => null, // Remove label
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="map" size={24} color="white" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
