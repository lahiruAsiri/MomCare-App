import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage
import * as Font from 'expo-font'; // Import Font for loading

const HomeScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false); // State to check if fonts are loaded

  // Load custom fonts
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

  // Function to restart onboarding
  const handleRestartOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'false'); // Change the value to false
      navigation.navigate('OnboardingFlow'); // Navigate back to the onboarding screen
    } catch (error) {
      console.error('Error restarting onboarding:', error);
    }
  };

  // Function to retrieve and display motherName from AsyncStorage
  const displayMotherName = async () => {
    try {
      const storedMotherName = await AsyncStorage.getItem('motherName');
      if (storedMotherName) {
        Alert.alert('Mother Name', storedMotherName);
      } else {
        Alert.alert('No Name Found', 'Please set the mother name first.');
      }
    } catch (error) {
      console.error('Error retrieving mother name:', error);
    }
  };

  // Conditional rendering based on font loading
  if (!fontsLoaded) {
    return null; // You can also return a loading spinner here
  }

  return (
    <ImageBackground
      source={require('../../assets/Background.png')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.7 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>MomCare</Text>
        

        {/* Grid for images */}
        <View style={styles.imageGrid}>
          {/* Image 1 */}
          <TouchableOpacity onPress={() => navigation.navigate('BabyGrowth')}>
            <Image
              source={require('../../assets/growth.png')} // Replace with your image path
              style={styles.image}
            />
          </TouchableOpacity>
          
          {/* Image 2 */}
          <TouchableOpacity onPress={() => navigation.navigate('ImagePage2')}>
            <Image
              source={require('../../assets/tips.png')} // Replace with your image path
              style={styles.image}
            />
          </TouchableOpacity>

          {/* Image 3 */}
          <TouchableOpacity onPress={() => navigation.navigate('ImagePage3')}>
            <Image
              source={require('../../assets/cards.png')} // Replace with your image path
              style={styles.image}
            />
          </TouchableOpacity>

          {/* Image 4 */}
          <TouchableOpacity onPress={() => navigation.navigate('ImagePage4')}>
            <Image
              source={require('../../assets/doctors.png')} // Replace with your image path
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        {/* View Baby Growth Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BabyGrowth')}
        >
          <Text style={styles.buttonText}>View Baby Growth</Text>
        </TouchableOpacity>

        {/* Restart Onboarding Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRestartOnboarding} // Call the function on button press
        >
          <Text style={styles.buttonText}>Restart Onboarding</Text>
        </TouchableOpacity>

        {/* Display Mother Name Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={displayMotherName} // Call the function on button press
        >
          <Text style={styles.buttonText}>Show Mother's Name</Text>
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
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 36, // Increase font size for better visibility
    fontFamily: 'Appname', // Use the Fredoka font for the title
    marginBottom: 20,
    color: '#E75480',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20, // Spacing below the grid
  },
  image: {
    width: 162,
    height: 172,
    margin: 5, // Margin between images
    borderRadius: 10, // Optional: Rounded corners
  },
  button: {
    backgroundColor: '#E75480',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10, // Adding margin for spacing between buttons
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;



// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage
// import * as Font from 'expo-font'; // Import Font for loading

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [motherName, setMotherName] = useState('');
//   const [fontsLoaded, setFontsLoaded] = useState(false); // State to check if fonts are loaded

//   // Load custom fonts
//   useEffect(() => {
//     const loadFonts = async () => {
//       await Font.loadAsync({
//         'raleway': require('../../assets/fonts/Raleway-Regular.ttf'),
//         'raleway-bold': require('../../assets/fonts/Raleway-SemiBold.ttf'),
//         'Appname': require('../../assets/fonts/Fredoka-SemiBold.ttf'),
//       });
//       setFontsLoaded(true); // Set fonts loaded to true
//     };

//     loadFonts();
//   }, []);

//   // Function to restart onboarding
//   const handleRestartOnboarding = async () => {
//     try {
//       await AsyncStorage.setItem('hasCompletedOnboarding', 'false'); // Change the value to false
//       navigation.navigate('Onboarding'); // Navigate back to the onboarding screen
//     } catch (error) {
//       console.error('Error restarting onboarding:', error);
//     }
//   };

//   // Function to retrieve and display motherName from AsyncStorage
//   const displayMotherName = async () => {
//     try {
//       const storedMotherName = await AsyncStorage.getItem('motherName');
//       if (storedMotherName) {
//         Alert.alert('Mother Name', storedMotherName);
//       } else {
//         Alert.alert('No Name Found', 'Please set the mother name first.');
//       }
//     } catch (error) {
//       console.error('Error retrieving mother name:', error);
//     }
//   };

//   // Conditional rendering based on font loading
//   if (!fontsLoaded) {
//     return null; // You can also return a loading spinner here
//   }

//   return (
//     <ImageBackground
//       source={require('../../assets/Background.png')}
//       style={styles.backgroundImage}
//       imageStyle={{ opacity: 0.7 }}
//     >
//       <View style={styles.container}>
//         <Text style={styles.title}>MomCare</Text>

//         {/* View Baby Growth Button */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate('BabyGrowth')}
//         >
//           <Text style={styles.buttonText}>View Baby Growth</Text>
//         </TouchableOpacity>

//         {/* Restart Onboarding Button */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleRestartOnboarding} // Call the function on button press
//         >
//           <Text style={styles.buttonText}>Restart Onboarding</Text>
//         </TouchableOpacity>

//         {/* Display Mother Name Button */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={displayMotherName} // Call the function on button press
//         >
//           <Text style={styles.buttonText}>Show Mother's Name</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   title: {
//     marginTop: 50,
//     fontSize: 36, // Increase font size for better visibility
//     fontFamily: 'Appname', // Use the Fredoka font for the title
//     marginBottom: 20,
//     color: '#E75480',
//   },
//   button: {
//     backgroundColor: '#E75480',
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 10, // Adding margin for spacing between buttons
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;
