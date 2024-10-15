import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountdownTimer = ({ countdown }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Baby coming to the world in</Text>
      <View style={styles.countdownContainer}>
        <View style={styles.timeBlock}>
          <Text style={styles.countdown}>{countdown.days}</Text>
          <Text style={styles.label}>Days</Text>
        </View>
        <Text style={styles.separator}>:</Text>
        <View style={styles.timeBlock}>
          <Text style={styles.countdown}>{countdown.hours}</Text>
          <Text style={styles.label}>Hours</Text>
        </View>
        <Text style={styles.separator}>:</Text>
        <View style={styles.timeBlock}>
          <Text style={styles.countdown}>{countdown.minutes}</Text>
          <Text style={styles.label}>Minutes</Text>
        </View>
        <Text style={styles.separator}>:</Text>
        <View style={styles.timeBlock}>
          <Text style={styles.countdown}>{countdown.seconds}</Text>
          <Text style={styles.label}>Seconds</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(235, 131, 23, 0.9)',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 176, 176, 0.3)',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBlock: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  countdown: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#C93D84',
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  separator: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#C93D84',
  },
});

export default CountdownTimer;
