import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import PlaceItem from './PlaceItem';
import { FlatList } from 'react-native';
import PlaceItemBig from './PlaceItemBig';
import { useNavigation } from '@react-navigation/native';

const PlaceList = ({placeList}) => {

const navigator= useNavigation();
const onPlaceClick=(item)=>{

  navigator.navigate('place-detail',{place:item});
}

  return (
    <View>
      <FlatList
      data={placeList}
      renderItem={({item, index})=>(
        <TouchableOpacity onPress={()=>onPlaceClick(item)}>
          {index%4==0?
            <PlaceItemBig place={item} />
          :<PlaceItem place={item}/>}
          </TouchableOpacity>     
      )}
      />
    </View>
  );
};

export default PlaceList;
