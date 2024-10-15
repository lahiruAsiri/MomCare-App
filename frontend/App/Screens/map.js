import { View, Text, ActivityIndicator, ImageBackground } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Home/Header';
import GoogleMapView from '../Components/Home/GoogleMapView';
import CategoryList from '../Components/Home/CategoryList';
import GlobalApi from '../Services/GlobalApi';
import PlaceList from '../Components/Home/PlaceList';
import { ScrollView } from 'react-native';
import { UserLocationContext } from '../Context/UserLocationContext';
import DoctorList from '../Components/Home/DoctorList'; // Import the DoctorList component

const Home = () => {
  const [placeList, setPlaceList] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location && location.coords) {
      GetNearBySearchPlace('hospital');
    }
  }, []);

  const GetNearBySearchPlace = (value) => {
    GlobalApi.nearByPlace(location.coords.latitude, location.coords.longitude, value)
      .then(resp => {
        setPlaceList(resp.data.results);
      });
  };

  return (
    <ImageBackground 
      source={require('../../assets/Background.png')} 
      style={{ flex: 1, resizeMode: 'cover' }} 
      imageStyle={{ opacity: 0.7 }}  
    >
            <Header />
      <ScrollView style={{ padding: 20, backgroundColor: 'transparent', flex: 1 }}>
        <GoogleMapView placeList={placeList}/>
        <CategoryList setSelectedCategory={(value)=>GetNearBySearchPlace(value)} />
        
        {/* Add the DoctorList component here */}
        <DoctorList /> 

        {placeList ? <PlaceList placeList={placeList} /> : null}
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;
