import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../Shared/Colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const Header = () => {
  const navigation = useNavigation(); // Hook to access navigation

  // Declare the function before using it in the return statement
  const handleSearchPress = () => {
    navigation.navigate('Search'); // Navigate to Search.js
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.textStyle}>MomCare</Text>
        <Image source={require('../../../assets/user.png')} style={styles.userImage} />
      </View>
      <TouchableOpacity style={styles.searchBarContainer} onPress={handleSearchPress}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={24} color={Colors.DARK_GRAY} style={styles.searchIcon} />
          <Text style={styles.searchBar}>Search</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    top: 25,
    gap: 20,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    top: 5,
  },
  textStyle: {
    fontFamily: 'Appname',
    fontSize: 35.35,
    fontWeight: '400',
    lineHeight: 42.77,
    textAlign: 'center',
    color: '#A91E64',
    opacity: 0.8,
    top: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    top: 5,
  },
  searchBarContainer: {
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    paddingHorizontal: 10,
    width: Dimensions.get('screen').width * 0.6,
    height: 40,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBar: {
    flex: 1,
    color: Colors.DARK_GRAY,
    fontSize: 18,
    fontFamily: 'raleway-bold',
    textAlign: 'left',
  },
});
