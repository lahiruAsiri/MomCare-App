import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { OnboardingContext } from '../../OnboardingContext';

const OnboardingScreen = () => {
  const [motherName, setMotherName] = useState('');
  const [pregnancyStartDate, setPregnancyStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const navigation = useNavigation();
  const { setHasCompletedOnboarding } = useContext(OnboardingContext);

  const handleSubmit = async () => {
    if (!motherName || !pregnancyStartDate) {
      console.log('Validation failed: Missing fields');
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    console.log('Submitting data:', {
      motherName,
      pregnancyStartDate,
    });

    try {
      console.log('Sending POST request to: https://momcare.azurewebsites.net/paregnancy-add');
      const response = await axios.post('https://momcare.azurewebsites.net/paregnancy-add', {
        motherName,
        pregnancyStartDate,
      });

      console.log('Response received:', response.data);

      console.log('Storing motherName in AsyncStorage');
      await AsyncStorage.setItem('motherName', motherName);

      console.log('Setting hasCompletedOnboarding to true');
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      setHasCompletedOnboarding(true);

      console.log('Showing success alert');
      Alert.alert('Success', 'Pregnancy information submitted successfully!', [
        {
          text: 'OK',
          onPress: () => {
            console.log('Navigating to Main');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Homescreen' }],
            });
          },
        },
      ]);
    } catch (error) {
      console.error('Error details:', error);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Background.png')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.7 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Set Up Your Preferences </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mother's Name</Text>
            <TextInput
              style={styles.input}
              value={motherName}
              onChangeText={setMotherName}
              placeholder="Enter mother's name"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pregnancy Start Date</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowCalendar(!showCalendar)}>
              <Text style={styles.dateButtonText}>{pregnancyStartDate}</Text>
            </TouchableOpacity>
            {showCalendar && (
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={(day) => {
                    setPregnancyStartDate(day.dateString);
                    setShowCalendar(false);
                  }}
                  markedDates={{
                    [pregnancyStartDate]: { selected: true, marked: true, selectedColor: '#E75480' },
                  }}
                  theme={{
                    selectedDayBackgroundColor: '#E75480',
                    todayTextColor: '#E75480',
                    dayTextColor: '#E75480',
                    textSectionTitleColor: '#E75480',
                    monthTextColor: '#E75480',
                    arrowColor: '#E75480',
                  }}
                />
              </View>
            )}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>{isSubmitting ? "Submitting..." : "Submit"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
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
    alignItems: 'center',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Appname',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E75480',
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontFamily: 'raleway',
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
  },
  errorText: {
    fontFamily: 'raleway',
    color: 'red',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#EE9A72',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
    marginBottom: 20,
  },
  dateButtonText: {
    fontFamily: 'raleway',
    color: '#fff',
    fontSize: 16,
  },
  calendarContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EE9A72',
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#EE9A72',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A0D3E8',
  },
});

export default OnboardingScreen;








// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ImageBackground } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Calendar } from 'react-native-calendars'; // Import Calendar
// import axios from 'axios';
// import { EXPO_PUBLIC_API_URL } from '@env';

// const OnboardingScreen = () => {
//   const [motherName, setMotherName] = useState('');
//   const [pregnancyStartDate, setPregnancyStartDate] = useState(new Date().toISOString().split('T')[0]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [showCalendar, setShowCalendar] = useState(false);
//   const navigation = useNavigation();

//   const apiUrl = EXPO_PUBLIC_API_URL;

//   const handleSubmit = async () => {
//     if (!motherName || !pregnancyStartDate) {
//       console.log('Validation failed: Missing fields');
//       setError('Please fill in all fields.');
//       return;
//     }

//     setIsSubmitting(true);
//     setError('');

//     console.log('Submitting data:', {
//       motherName,
//       pregnancyStartDate,
//     });
//     console.log('API URL:', apiUrl);

//     try {
//       console.log('Sending POST request to:', `${apiUrl}/api/v1/pregnancy`);
//       const response = await axios.post(`${apiUrl}/api/v1/pregnancy`, {
//         motherName,
//         pregnancyStartDate,
//       });

//       console.log('Response received:', response.data);

//       console.log('Storing motherName in AsyncStorage');
//       await AsyncStorage.setItem('motherName', motherName);

//       console.log('Setting hasCompletedOnboarding to true');
//       await AsyncStorage.setItem('hasCompletedOnboarding', 'true');

//       console.log('Showing success alert');
//       Alert.alert('Success', 'Pregnancy information submitted successfully!', [
//         {
//           text: 'OK',
//           onPress: () => {
//             console.log('Navigating to Homescreen');
//             navigation.navigate('Homescreen');
//           },
//         },
//       ]);
//     } catch (error) {
//       console.error('Error details:', error);
//       setError(error.response?.data?.message || 'An error occurred. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/Background.png')}
//       style={styles.backgroundImage}
//       imageStyle={{ opacity: 0.7 }}
//     >
//       <SafeAreaView style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <Text style={styles.title}>Set Up Your Preferences </Text>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Mother's Name</Text>
//             <TextInput
//               style={styles.input}
//               value={motherName}
//               onChangeText={setMotherName}
//               placeholder="Enter mother's name"
//               placeholderTextColor="#888"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Pregnancy Start Date</Text>
//             <TouchableOpacity style={styles.dateButton} onPress={() => setShowCalendar(!showCalendar)}>
//               <Text style={styles.dateButtonText}>{pregnancyStartDate}</Text>
//             </TouchableOpacity>
//             {showCalendar && (
//               <View style={styles.calendarContainer}>
//                 <Calendar
//                   onDayPress={(day) => {
//                     setPregnancyStartDate(day.dateString);
//                     setShowCalendar(false);
//                   }}
//                   markedDates={{
//                     [pregnancyStartDate]: { selected: true, marked: true, selectedColor: '#E75480' },
//                   }}
//                   theme={{
//                     selectedDayBackgroundColor: '#E75480',
//                     todayTextColor: '#E75480',
//                     dayTextColor: '#E75480',
//                     textSectionTitleColor: '#E75480',
//                     monthTextColor: '#E75480',
//                     arrowColor: '#E75480',
//                   }}
//                 />
//               </View>
//             )}
//           </View>

//           {error ? <Text style={styles.errorText}>{error}</Text> : null}

//           <TouchableOpacity
//             style={[styles.submitButton, isSubmitting && styles.disabledButton]}
//             onPress={handleSubmit}
//             disabled={isSubmitting}
//           >
//             <Text style={styles.submitButtonText}>{isSubmitting ? "Submitting..." : "Submit"}</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontFamily: 'Appname',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#E75480',
//   },
//   inputContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     fontFamily: 'raleway',
//     fontSize: 18,
//     marginBottom: 10,
//     color: '#000',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 15,
//     fontSize: 16,
//   },
//   errorText: {
//     fontFamily: 'raleway',
//     color: 'red',
//     marginBottom: 10,
//   },
//   dateButton: {
//     backgroundColor: '#EE9A72',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     marginTop: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 3.5,
//     elevation: 5, // For Android
//     marginBottom: 20,
//   },
//   dateButtonText: {
//     fontFamily: 'raleway',
//     color: '#fff',
//     fontSize: 16,
//   },
//   calendarContainer: {
//     borderRadius: 10, // Adjust the radius as needed
//     overflow: 'hidden', // Ensures the border radius is applied to the Calendar
//     borderWidth: 1,
//     borderColor: '#EE9A72', // Optional: Add border color
//     marginVertical: 10, // Optional: Space around the calendar
//   },
//   submitButton: {
//     backgroundColor: '#EE9A72',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//     marginTop: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 3.5,
//     elevation: 5, // For Android
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   disabledButton: {
//     backgroundColor: '#A0D3E8',
//   },
// });

// export default OnboardingScreen;
