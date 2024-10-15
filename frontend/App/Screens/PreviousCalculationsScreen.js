// App/Screens/PreviousCalculationsScreen.js

import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  Dimensions,
  ImageBackground,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const PreviousCalculationsScreen = ({ navigation }) => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHealthRecords = async () => {
      try {
        const motherName = await AsyncStorage.getItem('motherName');
        if (!motherName) {
          Alert.alert('Error', 'Mother name not found. Please set your profile.');
          navigation.goBack();
          return;
        }

        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/api/v1/health`, {
          params: { motherName },
          timeout: 10000,
        });

        if (response.status === 200) {
          setHealthRecords(response.data);
        } else {
          Alert.alert('Error', 'Failed to fetch health records.');
        }
      } catch (err) {
        console.error('Error fetching health records:', err.response?.data || err.message || err);
        setError(err.response?.data?.message || 'Failed to fetch health records.');
        Alert.alert('Error', err.response?.data?.message || 'Failed to fetch health records.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthRecords();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this record?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteRecord(id),
        },
      ]
    );
  };

  const deleteRecord = async (id) => {
    try {
      const response = await axios.delete(`${EXPO_PUBLIC_API_URL}/api/v1/health/${id}`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Include if your API requires auth
        },
      });
  
      if (response.status === 200) {
        // Remove the deleted record from state
        setHealthRecords(healthRecords.filter(record => record._id !== id));
        Alert.alert('Success', 'Record deleted successfully.');
      } else {
        Alert.alert('Error', 'Failed to delete the record. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting record:', err.response?.data || err.message || err);
      Alert.alert('Error', err.response?.data?.message || 'Failed to delete the record.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.recordContainer}>
      <Text style={styles.recordDate}>{new Date(item.calculatedAt).toLocaleDateString()}</Text>
      <BarChart
        data={{
          labels: ['Actual Weight (kg)', 'Mean Weight (kg)'],
          datasets: [
            {
              data: [item.babyWeight, item.meanWeight],
              colors: [
                (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green
                (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Blue
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 60}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: () => 'rgba(0, 0, 0, 1)',
          labelColor: () => 'rgba(0, 0, 0, 1)',
          
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            stroke: '#E75480',
            strokeDasharray: '5, 5', // Creates a dashed line pattern
          },
        }}
        style={styles.chart}
        fromZero={true}
        showBarTops={false}
        showValuesOnTopOfBars={true}
      />
      <Text style={styles.healthStatus}>Health Status: {item.healthStatus}</Text>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDelete(item._id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E75480" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/Background.png')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.7 }}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Previous Calculations</Text>
      {healthRecords.length === 0 ? (
        <Text style={styles.noDataText}>No records found.</Text>
      ) : (
        <FlatList
          data={healthRecords}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
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
    // backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontFamily: 'Appname', // Use the Fredoka font for the title
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4C70',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  recordContainer: {
    fontFamily: 'raleway',

    borderWidth: 1,
    borderColor: 'rgba(235, 131, 23, 0.9)',
    backgroundColor: 'rgba(231, 84, 128, 0.3)',

    // backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  healthStatus: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  deleteButtonText: {
    fontFamily: 'raleway',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#EE9A72',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordDate: {
    fontFamily: 'raleway',
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  noDataText: {
    fontFamily: 'raleway',
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PreviousCalculationsScreen;
