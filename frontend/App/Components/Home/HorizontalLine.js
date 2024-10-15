import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../Shared/Colors'

const HorizontalLine = () => {
  return (
    <View>
       <View style={{borderWidth:0.3,
            marginTop:10,
            borderColor:Colors.GRAY}}></View>
    </View>
  )
};

export default HorizontalLine;