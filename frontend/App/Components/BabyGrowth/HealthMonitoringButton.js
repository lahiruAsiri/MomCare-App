import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const HealthMonitoringButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Health Monitoring</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EE9A72',
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HealthMonitoringButton;