// App/Screens/HealthMonitoringScreen.js

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  ImageBackground,
  ActivityIndicator 
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// Removed the .env import as per requirements

const HealthMonitoringScreen = ({ navigation }) => {
  // State variables
  const [babyHeight, setBabyHeight] = useState('');
  const [babyWeight, setBabyWeight] = useState('');
  const [ageDays, setAgeDays] = useState('');
  const [healthData, setHealthData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [motherName, setMotherName] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Fetch mother's name from AsyncStorage on component mount
  useEffect(() => {
    const fetchMotherName = async () => {
      try {
        const name = await AsyncStorage.getItem('motherName');
        if (name !== null) {
          setMotherName(name);
        } else {
          Alert.alert('Error', 'Mother name not found. Please set your profile.');
        }
      } catch (err) {
        console.error('Error fetching mother name:', err);
        Alert.alert('Error', 'Failed to fetch mother name.');
      }
    };
    fetchMotherName();
  }, []);

  // Function to calculate mean weight based on age
  const calculateMeanWeight = (ageDays) => {
    const ageMonths = Math.floor(ageDays / 30);
    const ageYears = Math.floor(ageDays / 365);

    let meanWeight = 0;

    if (ageMonths < 12) {
      // Infants < 12 months
      meanWeight = (ageMonths + 9) / 2;
    } else if (ageYears >= 1 && ageYears < 5) {
      // Children aged 1-5 years
      meanWeight = 2 * (ageYears + 5);
    } else if (ageYears >= 5 && ageYears < 14) {
      // Children aged 5-14 years
      meanWeight = 4 * ageYears;
    } else {
      // For ages outside the defined ranges
      meanWeight = 0;
    }

    return meanWeight;
  };

  // Function to handle health calculation
  const handleCalculateHealth = () => {
    // Reset previous errors
    setError('');
    
    // Parse inputs
    const parsedAgeDays = parseInt(ageDays, 10);
    const parsedHeight = parseFloat(babyHeight);
    const parsedWeight = parseFloat(babyWeight);

    // Input validation
    if (isNaN(parsedAgeDays) || parsedAgeDays < 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of days (0 or more).');
      return;
    }

    if (isNaN(parsedHeight) || parsedHeight <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid baby height in centimeters.');
      return;
    }

    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid baby weight in kilograms.');
      return;
    }

    // Show loading indicator
    setIsCalculating(true);

    // Calculate mean weight
    const meanWeight = calculateMeanWeight(parsedAgeDays);

    if (meanWeight === 0) {
      Alert.alert('Invalid Age', 'Age must be between 0 and 14 years.');
      setIsCalculating(false);
      return;
    }

    // Determine health status
    const healthStatus = parsedWeight >= meanWeight ? 'Good' : 'Needs Attention';

    // Set health data
    const calculatedHealth = {
      babyHeight: parsedHeight,
      babyWeight: parsedWeight,
      ageDays: parsedAgeDays,
      meanWeight,
      healthStatus,
      calculatedAt: new Date(),
    };

    setHealthData(calculatedHealth);

    // Prepare chart data with distinct colors
    setChartData({
      labels: ['Actual Weight (kg)', 'Mean Weight (kg)'],
      datasets: [
        {
          data: [parsedWeight, meanWeight],
          colors: [
            (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green for Actual Weight
            (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Blue for Mean Weight
          ],
        },
      ],
      legend: ['Weight Comparison'],
    });

    // Provide immediate feedback
    if (healthStatus === 'Good') {
      Alert.alert('Great!', 'Your baby is in good health.');
    } else {
      Alert.alert('Attention Needed', 'Your baby\'s weight is below the mean for age.');
    }

    // Hide loading indicator
    setIsCalculating(false);
  };

  // Function to handle saving health data
  const handleSaveHealthData = async () => {
    setError('');

    if (!healthData) {
      Alert.alert('No Data', 'Please calculate health data before saving.');
      return;
    }

    setIsSaving(true);

    try {
      const dataToSend = {
        motherName,
        babyHeight: parseFloat(healthData.babyHeight),
        babyWeight: parseFloat(healthData.babyWeight),
        ageDays: parseInt(healthData.ageDays, 10),
        meanWeight: parseFloat(healthData.meanWeight),
        healthStatus: healthData.healthStatus,
      };

      console.log('Saving health data:', dataToSend);

      // Updated API URL for POST request
      const postUrl = 'https://momcare.azurewebsites.net/add-record';

      const response = await axios.post(postUrl, dataToSend, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Health data saved successfully!', [
          {
            text: 'OK',
            // You can navigate or perform other actions here if needed
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to save health data. Please try again.');
      }
    } catch (err) {
      console.error('Error saving health data:', err.response?.data || err.message || err);
      setError(err.response?.data?.message || 'Failed to save health data. Please try again.');
      Alert.alert('Error', err.response?.data?.message || 'Failed to save health data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Background.png')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.7 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Health Monitoring</Text>

          {chartData && (
            <BarChart
              data={chartData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 30,
                },
                propsForBackgroundLines: {
                  strokeDasharray: '6 8',
                  stroke: '#e0e0e0',
                },
              }}
              style={styles.chart}
              fromZero={true}
              showBarTops={false}
              showValuesOnTopOfBars={true}
            />
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Baby Height (cm):</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter baby height in cm"
              keyboardType="numeric"
              value={babyHeight}
              onChangeText={setBabyHeight}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Baby Weight (kg):</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter baby weight in kg"
              keyboardType="numeric"
              value={babyWeight}
              onChangeText={setBabyWeight}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age (Days):</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter baby's age in days"
              keyboardType="numeric"
              value={ageDays}
              onChangeText={setAgeDays}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity 
            style={[styles.calculateButton, (isCalculating || isSaving) && styles.buttonDisabled]} 
            onPress={handleCalculateHealth}
            disabled={isCalculating || isSaving}
          >
            {isCalculating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Calculate Health</Text>
            )}
          </TouchableOpacity>

          {healthData && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Health Status: {healthData.healthStatus}</Text>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.saveButton, (isSaving || isCalculating) && styles.buttonDisabled]} 
            onPress={handleSaveHealthData}
            disabled={isSaving || isCalculating}
          >
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Health Data</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.viewButton, (isSaving || isCalculating) && styles.buttonDisabled]} 
            onPress={() => navigation.navigate('PreviousCalculations')}
            disabled={isSaving || isCalculating}
          >
            <Text style={styles.buttonText}>View Previous Calculations</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  viewButton: {
    backgroundColor: '#E75480',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'raleway', // Ensure 'raleway' font is loaded
    fontSize: 24,
    marginTop: 40,
    fontWeight: 'bold',
    color: '#8B4C70',
    marginBottom: 20,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 5,
    backgroundColor: 'rgba(231, 84, 128, 0.7)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 5,
  },
  label: {
    fontFamily: 'raleway', // Ensure 'raleway' font is loaded
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',  // Centers the text horizontally
  },
  input: {
    fontFamily: 'raleway', // Ensure 'raleway' font is loaded
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(235, 131, 23, 0.9)',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'rgba(255, 176, 176, 0.3)',
    textAlign: 'center', 
  },
  calculateButton: {
    backgroundColor: '#EE9A72',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignSelf: 'center',
  },
  saveButton: {
    backgroundColor: '#EE9A72',
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignSelf: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    borderWidth: 2,
    borderColor: '#E75480',
    borderRadius: 10,
    padding: 7,
    backgroundColor: 'rgba(231, 84, 128, 0.2)',
    marginTop: 8,
    alignItems: 'center',
  },
  resultText: {
    fontFamily: 'raleway', // Ensure 'raleway' font is loaded
    fontSize: 18,
    color: '#D91656',
    fontWeight: 'bold',
  },
  errorText: {
    fontFamily: 'raleway', // Ensure 'raleway' font is loaded
    color: 'red',
    marginBottom: 10,
  },
});

export default HealthMonitoringScreen;






// // App/Screens/HealthMonitoringScreen.js

// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TextInput, 
//   TouchableOpacity, 
//   Alert, 
//   Dimensions, 
//   KeyboardAvoidingView, 
//   Platform, 
//   ScrollView 
// } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { EXPO_PUBLIC_API_URL } from '@env'; // Correctly import the environment variable

// const HealthMonitoringScreen = ({ navigation }) => {
//   const [babyHeight, setBabyHeight] = useState('');
//   const [babyWeight, setBabyWeight] = useState('');
//   const [ageDays, setAgeDays] = useState('');
//   const [healthData, setHealthData] = useState(null);
//   const [chartData, setChartData] = useState(null);
//   const [motherName, setMotherName] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false); // For loading indicator
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const getMotherName = async () => {
//       const name = await AsyncStorage.getItem('motherName');
//       setMotherName(name);
//     };
//     getMotherName();
//   }, []);

//   // Function to calculate mean weight based on age
//   const calculateMeanWeight = (ageDays) => {
//     const ageMonths = Math.floor(ageDays / 30);
//     const ageYears = Math.floor(ageDays / 365);

//     let meanWeight = 0;

//     if (ageMonths < 12) {
//       // Infants < 12 months
//       meanWeight = (ageMonths + 9) / 2;
//     } else if (ageYears >= 1 && ageYears < 5) {
//       // Children aged 1-5 years
//       meanWeight = 2 * (ageYears + 5);
//     } else if (ageYears >= 5 && ageYears < 14) {
//       // Children aged 5-14 years
//       meanWeight = 4 * ageYears;
//     } else {
//       // For ages outside the defined ranges
//       meanWeight = 0;
//     }

//     return meanWeight;
//   };

//   const calculateHealth = () => {
//     const parsedAgeDays = parseInt(ageDays, 10);

//     if (isNaN(parsedAgeDays) || parsedAgeDays < 0) {
//       Alert.alert('Invalid Input', 'Please enter a valid number of days (0 or more).');
//       return;
//     }

//     const height = parseFloat(babyHeight);
//     const weight = parseFloat(babyWeight);

//     if (isNaN(height) || isNaN(weight)) {
//       Alert.alert('Invalid Input', 'Please enter valid numbers for height and weight.');
//       return;
//     }

//     // Calculate mean weight based on age
//     const meanWeight = calculateMeanWeight(parsedAgeDays);

//     if (meanWeight === 0) {
//       Alert.alert('Invalid Age', 'Age must be between 0 and 14 years.');
//       return;
//     }

//     // Determine health status
//     const healthStatus = weight >= meanWeight ? 'Good' : 'Needs Attention';

//     const calculatedHealth = {
//       babyHeight,
//       babyWeight,
//       ageDays,
//       meanWeight,
//       healthStatus,
//       calculatedAt: new Date(),
//     };

//     setHealthData(calculatedHealth);

//     // Prepare data for the chart
//     setChartData({
//       labels: ['Actual Weight (kg)', 'Mean Weight (kg)'],
//       datasets: [
//         {
//           data: [weight, meanWeight],
//         },
//       ],
//       legend: ['Weight Comparison'],
//     });

//     // Provide immediate feedback based on health status
//     if (healthStatus === 'Good') {
//       Alert.alert('Great!', 'Your baby is in good health.');
//     } else {
//       Alert.alert('Attention Needed', 'Your baby\'s weight is below the mean for age.');
//     }
//   };

//   const saveHealthData = async () => {
//     if (!healthData) {
//       Alert.alert('No Data', 'Please calculate health data before saving.');
//       return;
//     }

//     setIsSubmitting(true);
//     setError('');

//     try {
//       const response = await axios.post(`${EXPO_PUBLIC_API_URL}/api/v1/health`, {
//         motherName,
//         babyHeight: parseFloat(babyHeight),
//         babyWeight: parseFloat(babyWeight),
//         ageDays: parseInt(ageDays, 10),
//         meanWeight: healthData.meanWeight,
//         healthStatus: healthData.healthStatus,
//         calculatedAt: healthData.calculatedAt,
//       }, {
//         timeout: 10000, // 10 seconds timeout
//       });

//       if (response.status === 201) {
//         Alert.alert('Success', 'Health data saved successfully!', [
//           {
//             text: 'OK',
//             onPress: () => navigation.goBack(),
//           },
//         ]);
//       } else {
//         Alert.alert('Error', 'Failed to save health data. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error saving health data:', error.response?.data || error.message || error);
//       setError(error.response?.data?.message || error.message || 'An error occurred. Please try again.');
//       Alert.alert('Error', error.response?.data?.message || 'Failed to save health data. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Health Monitoring</Text>

//         {chartData && (
//           <BarChart
//             data={chartData}
//             width={Dimensions.get('window').width - 40}
//             height={220}
//             chartConfig={{
//               backgroundColor: '#ffffff',
//               backgroundGradientFrom: '#ffffff',
//               backgroundGradientTo: '#ffffff',
//               decimalPlaces: 2,
//               color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               style: {
//                 borderRadius: 16,
//               },
//               propsForBackgroundLines: {
//                 stroke: '#E75480',
//                 strokeDasharray: '', // solid background lines
//               },
//             }}
//             style={styles.chart}
//             fromZero={true}
//             showBarTops={false}
//             showValuesOnTopOfBars={true}
//           />
//         )}

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Baby Height (cm):</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter baby height in cm"
//             keyboardType="numeric"
//             value={babyHeight}
//             onChangeText={setBabyHeight}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Baby Weight (kg):</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter baby weight in kg"
//             keyboardType="numeric"
//             value={babyWeight}
//             onChangeText={setBabyWeight}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Age (Days):</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter baby's age in days"
//             keyboardType="numeric"
//             value={ageDays}
//             onChangeText={setAgeDays}
//           />
//         </View>

//         {error ? <Text style={styles.errorText}>{error}</Text> : null}

//         <TouchableOpacity 
//           style={[styles.calculateButton, isSubmitting && styles.buttonDisabled]} 
//           onPress={calculateHealth}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.buttonText}>{isSubmitting ? "Calculating..." : "Calculate Health"}</Text>
//         </TouchableOpacity>

//         {healthData && (
//           <View style={styles.resultContainer}>
//             <Text style={styles.resultText}>Health Status: {healthData.healthStatus}</Text>
//           </View>
//         )}

//         <TouchableOpacity 
//           style={[styles.saveButton, isSubmitting && styles.buttonDisabled]} 
//           onPress={saveHealthData}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.buttonText}>{isSubmitting ? "Saving..." : "Save Health Data"}</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#8B4C70',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 16,
//   },
//   inputContainer: {
//     width: '100%',
//     marginVertical: 10,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#8B4C70',
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 16,
//     backgroundColor: '#F9F9F9',
//   },
//   calculateButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   saveButton: {
//     backgroundColor: '#2196F3',
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonDisabled: {
//     backgroundColor: '#A5D6A7',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   resultContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   resultText: {
//     fontSize: 18,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
// });

// export default HealthMonitoringScreen;














// // // App/Screens/HealthMonitoringScreen.js

// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// // import { LineChart } from 'react-native-chart-kit';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import axios from 'axios';

// // const HealthMonitoringScreen = ({ navigation }) => {
// //   const [babyHeight, setBabyHeight] = useState('');
// //   const [babyWeight, setBabyWeight] = useState('');
// //   const [daysUntilBorn, setDaysUntilBorn] = useState('');
// //   const [healthData, setHealthData] = useState(null);
// //   const [chartData, setChartData] = useState(null);
// //   const [motherName, setMotherName] = useState('');

// //   useEffect(() => {
// //     const getMotherName = async () => {
// //       const name = await AsyncStorage.getItem('motherName');
// //       setMotherName(name);
// //     };
// //     getMotherName();
// //   }, []);

// //   const calculateHealth = () => {
// //     // Simple example calculation
// //     // In a real app, replace with actual health calculation logic
// //     const height = parseFloat(babyHeight);
// //     const weight = parseFloat(babyWeight);
// //     const days = parseInt(daysUntilBorn, 10);

// //     if (isNaN(height) || isNaN(weight) || isNaN(days)) {
// //       Alert.alert('Invalid Input', 'Please enter valid numbers for height, weight, and days.');
// //       return;
// //     }

// //     // Example health status based on height and weight
// //     let healthStatus = 'Good';
// //     if (height < 50 || weight < 3) {
// //       healthStatus = 'Needs Attention';
// //     }

// //     const calculatedHealth = {
// //       babyHeight,
// //       babyWeight,
// //       daysUntilBorn,
// //       healthStatus,
// //       calculatedAt: new Date(),
// //     };

// //     setHealthData(calculatedHealth);

// //     // Prepare data for the chart
// //     setChartData({
// //       labels: ['Height', 'Weight'],
// //       datasets: [
// //         {
// //           data: [height, weight],
// //         },
// //       ],
// //     });
// //   };

// //   const saveHealthData = async () => {
// //     if (!healthData) {
// //       Alert.alert('No Data', 'Please calculate health data before saving.');
// //       return;
// //     }

// //     try {
// //       const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Ensure this environment variable is set
// //       const response = await axios.post(`${apiUrl}/api/v1/health`, {
// //         motherName,
// //         babyHeight: parseFloat(babyHeight),
// //         babyWeight: parseFloat(babyWeight),
// //         daysUntilBorn: parseInt(daysUntilBorn, 10),
// //         healthStatus: healthData.healthStatus,
// //         calculatedAt: healthData.calculatedAt,
// //       });

// //       if (response.status === 201) {
// //         Alert.alert('Success', 'Health data saved successfully!', [
// //           {
// //             text: 'OK',
// //             onPress: () => navigation.goBack(),
// //           },
// //         ]);
// //       } else {
// //         Alert.alert('Error', 'Failed to save health data. Please try again.');
// //       }
// //     } catch (error) {
// //       console.error('Error saving health data:', error);
// //       Alert.alert('Error', 'Failed to save health data. Please try again.');
// //     }
// //   };

// //   return (
// //     <KeyboardAvoidingView
// //       style={styles.container}
// //       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
// //     >
// //       <ScrollView contentContainerStyle={styles.scrollContainer}>
// //         <Text style={styles.title}>Health Monitoring</Text>

// //         {chartData && (
// //           <LineChart
// //             data={chartData}
// //             width={Dimensions.get('window').width - 40}
// //             height={220}
// //             chartConfig={{
// //               backgroundColor: '#ffffff',
// //               backgroundGradientFrom: '#ffffff',
// //               backgroundGradientTo: '#ffffff',
// //               decimalPlaces: 2,
// //               color: (opacity = 1) => `rgba(231, 84, 128, ${opacity})`,
// //               labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
// //               style: {
// //                 borderRadius: 16,
// //               },
// //               propsForDots: {
// //                 r: '6',
// //                 strokeWidth: '2',
// //                 stroke: '#E75480',
// //               },
// //             }}
// //             bezier
// //             style={styles.chart}
// //           />
// //         )}

// //         <View style={styles.inputContainer}>
// //           <Text style={styles.label}>Baby Height (cm):</Text>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Enter baby height in cm"
// //             keyboardType="numeric"
// //             value={babyHeight}
// //             onChangeText={setBabyHeight}
// //           />
// //         </View>

// //         <View style={styles.inputContainer}>
// //           <Text style={styles.label}>Baby Weight (kg):</Text>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Enter baby weight in kg"
// //             keyboardType="numeric"
// //             value={babyWeight}
// //             onChangeText={setBabyWeight}
// //           />
// //         </View>

// //         <View style={styles.inputContainer}>
// //           <Text style={styles.label}>Days Until Born:</Text>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Enter days until birth"
// //             keyboardType="numeric"
// //             value={daysUntilBorn}
// //             onChangeText={setDaysUntilBorn}
// //           />
// //         </View>

// //         <TouchableOpacity style={styles.calculateButton} onPress={calculateHealth}>
// //           <Text style={styles.buttonText}>Calculate Health</Text>
// //         </TouchableOpacity>

// //         {healthData && (
// //           <View style={styles.resultContainer}>
// //             <Text style={styles.resultText}>Health Status: {healthData.healthStatus}</Text>
// //           </View>
// //         )}

// //         <TouchableOpacity style={styles.saveButton} onPress={saveHealthData}>
// //           <Text style={styles.buttonText}>Save Health Data</Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </KeyboardAvoidingView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   scrollContainer: {
// //     padding: 20,
// //     alignItems: 'center',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#8B4C70',
// //     marginBottom: 20,
// //   },
// //   chart: {
// //     marginVertical: 8,
// //     borderRadius: 16,
// //   },
// //   inputContainer: {
// //     width: '100%',
// //     marginVertical: 10,
// //   },
// //   label: {
// //     fontSize: 16,
// //     color: '#333',
// //     marginBottom: 5,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#8B4C70',
// //     borderRadius: 8,
// //     padding: 10,
// //     fontSize: 16,
// //   },
// //   calculateButton: {
// //     backgroundColor: '#4CAF50',
// //     padding: 15,
// //     borderRadius: 8,
// //     marginTop: 20,
// //     width: '100%',
// //     alignItems: 'center',
// //   },
// //   saveButton: {
// //     backgroundColor: '#2196F3',
// //     padding: 15,
// //     borderRadius: 8,
// //     marginTop: 20,
// //     width: '100%',
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   resultContainer: {
// //     marginTop: 20,
// //     alignItems: 'center',
// //   },
// //   resultText: {
// //     fontSize: 18,
// //     color: '#4CAF50',
// //     fontWeight: 'bold',
// //   },
// // });

// // export default HealthMonitoringScreen;
