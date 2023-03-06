import { View, Text,Image } from 'react-native'
import React from 'react'

const ShowSanPham = ({navigation,route}) => {
  return (
    <View>
    <Text>{route.params.sanpham.name}</Text>
    <Image style={{width:150,height:150}} source={route.params.sanpham.image}/>
    <Text style={{color:'red'}}>Gia:{route.params.sanpham.price}</Text>
    </View>
  )
}

export default ShowSanPham