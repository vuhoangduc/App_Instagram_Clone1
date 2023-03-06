import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HeaderProfile = ({navigation,route,data_v1_2}) => {
  const [data_v1, setData_v1] = useState(data_v1_2);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    async function getData_v1() {
      try {
        const value = await AsyncStorage.getItem('@storage_Key_v1');
        if (value !== null) {  
          setData_v1(value != null ? JSON.parse(value) : nullvalue);
        }
  
      } catch (error) {
        console.log(error);
      }
    }
  
    getData_v1();
  
  }, [reload]);

  function setReloadFunction() {
    setReload(!reload);
  }

  const removeData= async (key)=> {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Data removed successfully.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error removing data: ', error);
    }
  }

  return (
    <View>

    <View style={styles.container}>
      <View style={{marginLeft:10,alignItems:'center',marginRight:30}}>
    <Image style={{width:80,height:80,borderRadius:360,marginBottom:5}} source={{uri:data_v1.img}}/>
    <Text style={{color:'white'}}>{data_v1.name}</Text>
      </View>

      <View style={{marginLeft:10,alignItems:'center',marginRight:10,justifyContent:'center'}}>
    <Text style={{color:'#ccc'}}>{data_v1.count_baiviet}</Text>
    <Text style={{color:'white'}}>Bài viết</Text>
      </View>

      <View style={{marginLeft:10,alignItems:'center',marginRight:10,justifyContent:'center'}}>
    <Text style={{fontWeight:'bold',color:'white'}} >{data_v1.count_flowing}</Text>
    <Text style={{fontSize:12,color:'white'}}>Người theo dõi</Text>
      </View>

      <View style={{marginLeft:10,alignItems:'center',marginRight:10,justifyContent:'center'}}>
    <Text style={{fontWeight:'bold',color:'white'}} >{data_v1.count_friend}</Text>
    <Text style={{fontSize:12,color:'white'}}>Đang theo dõi</Text>
      </View>
    </View>


    <View style={styles.container_v2}>
    <TouchableOpacity style={styles.button_v3} onPress={()=>navigation.navigate('setingProfile',{data_v1:data_v1,setReloadFunction})}>
        <Text style={styles.text_}>Chỉnh sửa</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button}>
        <Text style={styles.text_}>Chia sẻ trang cá nhân</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button_v2}>
    <Ionicons style={{textAlign:'center',lineHeight:35}} name="person-add" size={20} color={'#fff'} />
    </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.button_v2} onPress={()=>removeData('@storage_Key_v1')}>
    <Ionicons style={{textAlign:'center',lineHeight:35}} name="log-out-outline" size={20} color={'#fff'} />
    </TouchableOpacity>

    </View>
    
  )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    container_v2:{
        flexDirection:'row',
        marginTop:20
    },
    button:{
        backgroundColor:'#3C3B3B',
        marginRight:5,
        width:150,
        height:35,
        borderRadius:8
    },
    button_v2:{
        backgroundColor:'#3C3B3B',
        marginRight:5,
        width:50,
        height:35,
        borderRadius:8
    },
    button_v3:{
        backgroundColor:'#3C3B3B',
        marginRight:5,
        width:150,
        height:35,
        borderRadius:8,
        marginLeft:20
    },
    text_:{
        color:'white',
        textAlign:'center',
        lineHeight:35
    }

})

export default HeaderProfile