import { View, Text , Image} from 'react-native';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '../../Shared/Colors';

const PlaceItem = ({place}) => {
  return (
    <View style={{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:15,
      marginTop:20
    }}>
    {place?.photos?  <Image
        source={{uri:
          "https://maps.googleapis.com/maps/api/place/photo" +
          "?maxwidth=400" +
          "&photo_reference=" +
          place?.photos[0]?.photo_reference +
          "&key=AIzaSyDpwy79IM6EjuRUy0-lpf3wrkkfRvjuGsk",
        }}
        style={{ width: 110, height: 110, borderRadius: 15 }}
      />:
      <Image source={require('../../../assets/placeholder.png')}
      style={{ width: 110, height: 110, borderRadius: 15 }}
      />}
      
      <View style={{flex:1}}>
        <Text 
        numberOfLines={2}
        style={{fontSize:18, fontFamily:'raleway-bold', marginBottom:5}}>{place.name}</Text>
        <Text 
        numberOfLines={2}
        style={{fontSize:18, marginBottom:5}}>{place.vicinity}</Text>

        <View style={{display:'flex',flexDirection:'row', gap:5, alignItems:'center'}}>
        <Entypo name="star" size={20} color={Colors.YELLOW} />
        <Text>{place.rating}</Text>
      </View>
      </View>
    </View>
  );
};

export default PlaceItem;
