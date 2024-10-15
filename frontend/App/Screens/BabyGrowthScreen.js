import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import BabyGrowthSlider from '../Components/BabyGrowth/BabyGrowthSlider';
import CountdownTimer from '../Components/BabyGrowth/CountdownTimer';
import { calculateCurrentWeek, calculateDeliveryCountdown } from '../utils/Calculations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Font from 'expo-font'; // Import Font for loading

const BabyGrowthScreen = ({ navigation }) => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [pregnancyStartDate, setPregnancyStartDate] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'raleway': require('../../assets/fonts/Raleway-Regular.ttf'),
        'raleway-bold': require('../../assets/fonts/Raleway-SemiBold.ttf'),
        'Appname': require('../../assets/fonts/Fredoka-SemiBold.ttf'),
      });
      setFontsLoaded(true); // Set fonts loaded to true
    };

    loadFonts();
  }, []);

  // Fetch pregnancyStartDate from backend using motherName
  const fetchPregnancyStartDate = async () => {
    try {
      const motherName = await AsyncStorage.getItem('motherName');
      if (!motherName) {
        console.log('Error: Mother name not found in storage.');
        Alert.alert('Error', 'Mother name not found in storage.');
        return;
      }
  
      console.log('Fetching data for mother:', motherName);
  
      const apiUrl = 'https://momcare.azurewebsites.net//pregnancy-get';
      console.log('Full request URL:', `${apiUrl}?motherName=${motherName}`);
  
      const response = await axios.get(`${apiUrl}?motherName=${motherName}`);
      
      console.log('Response data:', response.data);
  
      if (response.data && response.data.pregnancyStartDate) {
        const pregnancyDate = new Date(response.data.pregnancyStartDate);
        setPregnancyStartDate(pregnancyDate);
  
        const calculatedWeek = calculateCurrentWeek(pregnancyDate);
        setCurrentWeek(calculatedWeek);
  
        const interval = setInterval(() => {
          const newCountdown = calculateDeliveryCountdown(pregnancyDate);
          setCountdown(newCountdown);
        }, 1000);
  
        return () => clearInterval(interval);
      } else {
        console.log('Error: Pregnancy start date not found in response');
        Alert.alert('Error', 'Pregnancy start date not found for the mother.');
      }
    } catch (error) {
      console.error('Error fetching pregnancy start date:', error);
      console.error('Error details:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to fetch pregnancy start date. Please try again.');
    }
  };

  useEffect(() => {
    fetchPregnancyStartDate();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/Background.png')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.7 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Baby Growth</Text>
        {pregnancyStartDate && (
          <>
            <BabyGrowthSlider
              currentWeek={currentWeek}
              onWeekChange={(week) => setCurrentWeek(week)}
              onViewMore={() => navigation.navigate('BabyGrowthDetails', { week: currentWeek })}
            />
            <CountdownTimer countdown={countdown} />
            
            {/* Health Monitoring Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('HealthMonitoring')}
            >
              <Text style={styles.buttonText}>Health Monitoring</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Appname', // Use the Fredoka font for the title
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#8B4C70',
    marginTop: 60,
  },
  button: {
    backgroundColor: '#E75480',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Appname', // Use the Fredoka font for the title
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BabyGrowthScreen;





















// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, ImageBackground, Alert } from 'react-native';
// import BabyGrowthSlider from '../Components/BabyGrowth/BabyGrowthSlider';
// import CountdownTimer from '../Components/BabyGrowth/CountdownTimer';
// // import HealthMonitoringButton from '../Components/BabyGrowth/HealthMonitoringButton';
// import { calculateCurrentWeek, calculateDeliveryCountdown } from '../utils/Calculations';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const BabyGrowthScreen = ({ navigation }) => {
//   const [currentWeek, setCurrentWeek] = useState(1);
//   const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//   const [pregnancyStartDate, setPregnancyStartDate] = useState(null);

//   // Fetch pregnancyStartDate from backend using motherName
//   const fetchPregnancyStartDate = async () => {
//     try {
//       const motherName = await AsyncStorage.getItem('motherName');
//       if (!motherName) {
//         Alert.alert('Error', 'Mother name not found in storage.');
//         return;
//       }

//       const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Update with your actual API URL
//       const response = await axios.get(`${apiUrl}/api/v1/pregnancy?motherName=${motherName}`);
      
//       if (response.data && response.data.pregnancyStartDate) {
//         const pregnancyDate = new Date(response.data.pregnancyStartDate);
//         setPregnancyStartDate(pregnancyDate);

//         const calculatedWeek = calculateCurrentWeek(pregnancyDate);
//         setCurrentWeek(calculatedWeek);

//         const interval = setInterval(() => {
//           const newCountdown = calculateDeliveryCountdown(pregnancyDate);
//           setCountdown(newCountdown);
//         }, 1000);

//         return () => clearInterval(interval);
//       } else {
//         Alert.alert('Error', 'Pregnancy start date not found for the mother.');
//       }
//     } catch (error) {
//       console.error('Error fetching pregnancy start date:', error);
//       Alert.alert('Error', 'Failed to fetch pregnancy start date. Please try again.');
//     }
//   };

//   useEffect(() => {
//     fetchPregnancyStartDate();
//   }, []);

//   return (
//     <ImageBackground
//       source={require('../../assets/Background.png')}
//       style={styles.backgroundImage}
//       imageStyle={{ opacity: 0.7 }}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>Your Baby Growth</Text>
//         {pregnancyStartDate && (
//           <>
//             <BabyGrowthSlider
//               currentWeek={currentWeek}
//               onWeekChange={(week) => setCurrentWeek(week)}
//               onViewMore={() => navigation.navigate('BabyGrowthDetails', { week: currentWeek })}
//             />
//             <CountdownTimer countdown={countdown} />
            
//           </>
//         )}
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color: '#8B4C70',
//     marginTop: 50,
//   },
// });

// export default BabyGrowthScreen;






















// // App/Screens/BabyGrowthScreen.js

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
// import BabyGrowthSlider from '../Components/BabyGrowth/BabyGrowthSlider';
// import CountdownTimer from '../Components/BabyGrowth/CountdownTimer';
// import HealthMonitoringButton from '../Components/BabyGrowth/HealthMonitoringButton';
// import { calculateCurrentWeek, calculateDeliveryCountdown } from '../utils/Calculations';

// const BabyGrowthScreen = ({ navigation }) => {
//   const [currentWeek, setCurrentWeek] = useState(1);
//   const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

//   useEffect(() => {
//     // In a real app, you'd fetch the pregnancy start date from a database or storage
//     const dummyPregnancyStartDate = new Date('2024-03-03'); // Replace with actual data fetching
//     const calculatedWeek = calculateCurrentWeek(dummyPregnancyStartDate);
//     setCurrentWeek(calculatedWeek);

//     const interval = setInterval(() => {
//       const newCountdown = calculateDeliveryCountdown(dummyPregnancyStartDate);
//       setCountdown(newCountdown);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <ImageBackground
//       source={require('../../assets/Background.png')}
//       style={styles.backgroundImage}
//       imageStyle={{ opacity: 0.7 }}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>Your Baby Growth</Text>
//         <BabyGrowthSlider 
//           currentWeek={currentWeek} 
//           onWeekChange={(week) => setCurrentWeek(week)}
//           onViewMore={() => navigation.navigate('BabyGrowthDetails', { week: currentWeek })}
//         />
//         <CountdownTimer countdown={countdown} />
//         <HealthMonitoringButton onPress={() => navigation.navigate('HealthMonitoring')} />
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   container: {
//     padding: 20,
//     paddingBottom: 40, // Extra padding to prevent content from being hidden behind buttons
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color: '#8B4C70', 
//     marginTop:50, // Updated to match your theme
//   },
// });

// export default BabyGrowthScreen;
