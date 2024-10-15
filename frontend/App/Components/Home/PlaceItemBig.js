import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../Shared/Colors";
import Entypo from '@expo/vector-icons/Entypo';
import HorizontalLine from "./HorizontalLine";

const PlaceItemBig = ({place}) => {
  return (
    <View style={{marginTop:20}}>
     {place?.photos?  <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo" +
            "?maxwidth=400" +
            "&photo_reference=" +
            place?.photos[0]?.photo_reference +
            "&key=AIzaSyDpwy79IM6EjuRUy0-lpf3wrkkfRvjuGsk",
        }}
        style={{ width: "100%", height: 130, borderRadius: 15 }}
      />:null}
      <Text
        numberOfLines={2}
        style={{ fontSize: 18, marginBottom: 2, fontFamily: "raleway-bold" }}
      >
        {place.name}
      </Text>
      <Text
        style={{ fontSize: 16, marginBottom: 5, color: Colors.DARK_GRAY }}
        numberOfLines={2}
      >
        {place.vicinity}
      </Text>
      <View
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            flexDirection: "row",
          }}
        >
          <Entypo name="star" size={20} color={Colors.YELLOW} />
          <Text>{place.rating}</Text>
        </View>
          <HorizontalLine/>
    </View>
  );
};

export default PlaceItemBig;