import { View, Text,StyleSheet,Image,TouchableOpacity,FlatList, ScrollView } from 'react-native'
import React, { useState,useEffect  } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Peoples = ({user,route,setReloadFunction}) => {

    const [following, setFollowing] = useState(false);
    useEffect(() => {
        let check = true;
          async function vuhoangduc() {
            const value = await AsyncStorage.getItem('@storage_Key_v1');
            const data_user = value != null ? JSON.parse(value) : nullvalue;
            for (let index = 0; index < data_user.flowings.length; index++) {
              const element = data_user.flowings[index];
              console.log(element);
              if (element === user._id) {
                check = false;
                break;
              }
            }
            if (check === false) {
                setFollowing('Đang theo dõi')
            }
          }
          vuhoangduc();
      }, []);
    const handlePress = async () => { 
        const value = await AsyncStorage.getItem('@storage_Key_v1');
        const data_user = value != null ? JSON.parse(value) : nullvalue;
      setFollowing(!following);
      update_Flow({_id_user:data_user._id,_id_user_flow:user._id})
    };

    const getDataToServer = async (value) => {
        try {
            const response = await axios.get(`http://192.168.0.106:3000/users/${value}`);
            const { status, data_res } = response.data;
            if (status === 'success') {
                console.log(data_res);
                removeData('@storage_Key_v1');
                storeData(data_res);

            }
        } catch (error) {
            console.log(error);
        }
    };
    const storeData = async (data_v2) => {
        try {
          const jsonValue = JSON.stringify(data_v2);
          console.log("hahahahahah"+jsonValue);
          await AsyncStorage.setItem('@storage_Key_v1', jsonValue);
          setReloadFunction();
        } catch (e) {
          // saving error
        }
      }
    const removeData= async (key)=> {
        try {
          await AsyncStorage.removeItem(key);
          console.log('Data removed successfully.');
          // navigation.navigate('Login');
        } catch (error) {
          console.error('Error removing data: ', error);
        }
      };
    const update_Flow = async (data) =>{
        var api_url = "http://192.168.0.106:3000/users/flowing";
        try {
          const response = await axios.put(api_url, data);
          const { status, result } = response.data;
          const value = await AsyncStorage.getItem('@storage_Key_v1');
          const data_user = value != null ? JSON.parse(value) : nullvalue;
            getDataToServer(data_user._id)
        } catch (error) {
            console.log(error);
          }
      }
  return (
    <View style={styles.content_friend}>
        <Image style={{width:80,height:80,borderRadius:360,marginTop:10,marginBottom:20}} source={{uri:user.img}}/>
        <Text style={{color:'white',fontWeight:'400',marginBottom:70}}>{user.name}</Text>
        <TouchableOpacity style={styles.button} onPress={()=> handlePress()}>
            <Text style={{color:'white',fontWeight:'bold',textAlign:'center',lineHeight:30}}>{following ? 'Đang theo dõi' : 'Theo dõi'}</Text>
        </TouchableOpacity>
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

export default Peoples