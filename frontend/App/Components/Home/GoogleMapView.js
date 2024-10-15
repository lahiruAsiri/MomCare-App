import { Dimensions, View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocationContext } from '../../Context/UserLocationContext';
import PlaceMarker from './PlaceMarker';
import Colors from '../../Shared/Colors';

const GoogleMapView = ({placeList}) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });

  const { location } = useContext(UserLocationContext);

  useEffect(() => {
    if (location && location.coords) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0321,
      });
    }
  }, [location]);

  return (
    <View style={{ marginTop: -7 }}>
      <Text style={{ fontSize: 17, fontWeight: '500', fontFamily: 'raleway-bold', textAlign: 'center' , color:Colors.DARK_GRAY}}>
       Doctor Locator
      </Text>
      <View style={{ marginTop: 12, borderRadius: 20, overflow: 'hidden' }}>
      {location?    <MapView
          style={{
            width: Dimensions.get("screen").width * 0.89,
            height: Dimensions.get("screen").height * 0.30,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion}
        >
            <Marker 
            title="You" 
            coordinate={mapRegion}
             />
            {placeList.map((item,index)=>index<=10&&(
                <PlaceMarker item={item} key={index} />
            ))}
           
        </MapView>:null} 
      </View>
    </View>
  );
};

export default GoogleMapView;
