import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import CategoryItem from './CategoryItem'

const CategoryList = ({setSelectedCategory}) => {
    const categoryList=[
        {
            id:1,
            name:'Hospital',
            value:'hospital',
            icon:require('../../../assets/Hospital.png')
        },
        {
            id:2,
            name:'Doctor',
            value:'doctor',
            icon:require('../../../assets/Doctor.png')
        },
        {
            id:3,
            name:'Pharmacy',
            value:'pharmacy',
            icon:require('../../../assets/Pharmacy.png')
        },
    ]
      return (
        <View style={{marginTop:15}}>
    
          <FlatList
            data={categoryList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginTop:5}}
            renderItem={({item})=>(
              <TouchableOpacity 
              onPress={()=>setSelectedCategory(item.value)} >
                <CategoryItem category={item} />
              </TouchableOpacity>
            )}
          />
          
        </View>
  );
};

export default CategoryList;
