import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TextInput, TouchableOpacity } from 'react-native';

const AppointmentItem = ({ title, date, location }) => (
  <View style={styles.appointmentItem}>
    <Text style={styles.appointmentTitle}>{title}</Text>
    <Text style={styles.appointmentDate}>{date}</Text>
    <Text style={styles.appointmentLocation}>{location}</Text>
    <Switch style={styles.switch} />
  </View>
);

const CustomizationItem = ({ title }) => (
  <View style={styles.customizationItem}>
    <Text style={styles.customizationTitle}>{title}</Text>
    <Switch style={styles.switch} />
  </View>
);

const Reminders = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <View style={styles.menuIcon}>
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
              <View style={styles.menuLine} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>MomCare</Text>
          <TouchableOpacity>
            <View style={styles.profileIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search"
          />
        </View>

        <Text style={styles.sectionTitle}>Reminder Settings</Text>
        <Text style={styles.subTitle}>Upcoming Appointments</Text>

        <AppointmentItem 
          title="Prenatal Checkup"
          date="Sept 15, 2024, 10:30 AM"
          location="Dr. John Doe, City Clinic"
        />
        <AppointmentItem 
          title="Baby Vaccination"
          date="Sept 18, 2024, 2:00 PM"
          location="Pediatric Health Center"
        />
        <AppointmentItem 
          title="Routine Ultrasound"
          date="Sept 22, 2024, 9:00 AM"
          location="Dr. Sarah Smith, Maternity"
        />

        <Text style={styles.subTitle}>Customized reminder settings</Text>
        <View style={styles.customizationContainer}>
          <CustomizationItem title="Send to the mobile number" />
          <CustomizationItem title="Send to the email" />
          <CustomizationItem title="Send mobile notification" />
        </View>
      </ScrollView>

      {/* <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <BarChart2 size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Bell size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Home size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <PenLine size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MapPin size={24} color="#000" />
        </TouchableOpacity>
      </View> */}
    </View>
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
    backgroundColor: '#FFF',
  },
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: 'space-around',
  },
  menuLine: {
    height: 2,
    backgroundColor: '#C41E3A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C41E3A',
  },
  profileIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#ccc',
    borderRadius: 12,
  },
  searchBar: {
    margin: 16,
    backgroundColor: '#FAE3E3',
    borderRadius: 20,
    padding: 8,
  },
  searchInput: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
    color: '#C41E3A',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    color: '#C41E3A',
  },
  appointmentItem: {
    backgroundColor: '#F5D0A9',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  appointmentDate: {
    fontSize: 14,
    color: '#000',
  },
  appointmentLocation: {
    fontSize: 14,
    color: '#000',
  },
  customizationContainer: {
    backgroundColor: '#F5D0A9',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  customizationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customizationTitle: {
    fontSize: 16,
    color: '#000',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFD1DC',
  },
  navItem: {
    alignItems: 'center',
  },
});

export default Reminders;
