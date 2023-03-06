import { View, Text,FlatList,Image,SafeAreaView } from 'react-native'
import React, { useState,useEffect  } from 'react'

const nhanthongbao = ({guitucha}) => {
  return (
      <View style={{flexDirection:'row',justifyContent:'space-between',margin:5,alignItems:'center'}}>
      <View style={{flexDirection:'row'}}>
      <Image style={{width:50,height:50, borderRadius:360,marginRight:20}} source={{uri:guitucha.img_user}}/>
      <Text style={{color:'white',fontWeight:'bold'}}>{guitucha.name_user}</Text>
      <Text style={{color:'white'}}> đã commet vào bài viết {'\n'}của bạn</Text>
      </View>
      <Image style={{width:60,height:60}} source={{uri:guitucha.img_post}}/>
      </View> 
  )
}

export default nhanthongbao