import { View, Text,StyleSheet,ScrollView,Image,TouchableOpacity } from 'react-native'
import React, { useState,useEffect  } from 'react'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Peoples from './Peoples';
var api_url = "http://192.168.0.106:3000/users";
const ContentProfile = ({setReloadFunction}) => {
  const [listuser,setListUser] = useState([]);
  const [flow_or_unFlow,setOR] = useState('Theo dõi');

  useEffect(() => {
    getListUser();
  }, []);

    const getListUser = async () => {
      try {
        const res = await fetch(api_url);
        const data_json = await res.json();
        setListUser(data_json);
      } catch (err) {
        console.error(err);
      }

    };



  return (
    
    <View>
      <View style={styles.firstContainer}>
        <Text style={{color:'white',marginRight:150,fontSize:14,marginLeft:20}}>Khám phá mọi người</Text>
        <Text style={{color:'#667EEA',fontSize:14,fontWeight:'500'}}>Xem tất cả</Text>
      </View>
      <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {listuser.map((user,index)=>(
          <View key={index}>
          <Peoples user={user} setReloadFunction={setReloadFunction}/>
          </View>
      ))}
      </ScrollView>


      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginLeft:5}}>
        <View style={styles.postStory} >
        
        <Image style={{width:60,height:60,borderRadius:360,marginTop:10,borderColor:'#ccc',borderWidth:1}} source={{uri:"https://seed-mix-image.spotifycdn.com/v6/img/artist/2Xlia1jlI7JDki4Xa42uyK/en/default"}}/>
        <Text style={{color:'white'}}>First</Text>
        </View>

        <View style={styles.postStory} >
        
        <View style={{width:60,height:60,borderRadius:360,marginTop:10,borderColor:'#ccc',borderWidth:1}}>
        <Ionicons style={{textAlign:'center',lineHeight:60}} name="add-outline" size={35} color={'#fff'} />
        </View>
        <Text style={{color:'white'}}>Mới</Text>

        </View>
      </ScrollView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    firstContainer:{
        flexDirection:'row',
        marginTop:25
    },
    content_friend:{
        width:150,
        height:250,
        backgroundColor:'#262626',
        marginLeft:20,
        marginTop:5,
        alignItems:'center'
    },
    button:{
        backgroundColor:'#667EEA',
        width:120,
        height:30,
        borderRadius:10,
    },
    postStory:{
        alignItems:'center',
        marginLeft:15
    }
})
export default ContentProfile