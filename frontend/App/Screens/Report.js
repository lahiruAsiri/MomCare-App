import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icons from react-native-vector-icons

const Report = () => {
  const [doctorName, setDoctorName] = useState('');
  const [healthTips, setHealthTips] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuIcon} />
          <View style={styles.menuIcon} />
          <View style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>MomCare</Text>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Add Health tips note</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Enter Doctor Name</Text>
        <TextInput
          style={styles.input}
          placeholder="doctor name"
          value={doctorName}
          onChangeText={setDoctorName}
        />

        <Text style={styles.label}>Enter Health Tips</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Health Tips from Doctor"
          multiline
          numberOfLines={4}
          value={healthTips}
          onChangeText={setHealthTips}
        />

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Health Tips Note</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="bell" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="pencil" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="map-pin" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  menuButton: {
    width: 24,
    justifyContent: 'space-between',
    height: 18,
  },
  menuIcon: {
    height: 2,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B71C6F',
  },
  profileButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DDD',
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DDD',
  },
  searchBar: {
    backgroundColor: '#FDE8EF',
    padding: 12,
    margin: 16,
    borderRadius: 25,
  },
  searchText: {
    color: '#B71C6F',
    textAlign: 'center',
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFE5D9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#FFA07A',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingVertical: 8,
  },
  navItem: {
    padding: 8,
  },
});

export default Report;
