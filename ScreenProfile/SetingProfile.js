import { View, Text,StyleSheet,Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
var api_url = "http://192.168.0.106:3000/users/update";
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
const SetingProfile = ({navigation,route,props}) => {
    const [img_source, setimg_source] = useState(null)
    const [img_base64, setiimg_base64] = useState(route.params.data_v1.img)
    const [text_name,setTextName] = useState(route.params.data_v1.name);
    const [_id_user,setId_User] = useState(route.params.data_v1._id);
    const { setReloadFunction } = route.params;
    



    const pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
          if (response.type == 'success') {          
            let { name, size, uri } = response;
            let nameParts = name.split('.');
            let fileType = nameParts[nameParts.length - 1];
            var fileToUpload = {
              name: name,
              size: size,
              uri: uri,
              type: "application/" + fileType
            };
            console.log(fileToUpload, '...............file')
            setiimg_base64(fileToUpload.uri);
            setimg_source(fileToUpload);
          } 
        });
    }
    const sendDataToServer = async (data) => {
      const formData = new FormData();
      formData.append('_Id_user', data._id);
      formData.append('name_user', data.name);
      formData.append('img', data.img);
        try {
          const response = await axios.put(api_url, formData,{
            headers:{
              'Content-Type': 'multipart/form-data'
            }
          });
          const { status, result } = response.data;
          if (status === 'success') {
            alert("Chỉnh sửa thành công");
            getDataToServer(data._id);
      
            navigation.goBack();
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
      }
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
  return (
    <SafeAreaView style={styles.container}>
      <View >
      <Header_Seting_Profile guisangcha={navigation} sendDataToServer={sendDataToServer} img_source={img_source} text_name={text_name} _id_user={_id_user} />
      <View style={{borderBottomWidth: 1, borderBottomColor: 'gray',marginBottom:10}} />
      <Content_Seting_Profile guisangcha_V1={route.params}  pickDocument={pickDocument} img_base64={img_base64} text_name={text_name} setTextName={setTextName}/>
    </View>
    </SafeAreaView>
  )


}
const Header_Seting_Profile= ({guisangcha,sendDataToServer,img_source,text_name,_id_user}) =>{
    return(
        <View style={styles.container_v1}>

            <TouchableOpacity onPress={() => guisangcha.navigate('Seting')}>
            <Text style={{color:'#ccc'}}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity>
            <Text style={{color:'white',fontSize:15}}>Chỉnh sửa trang cá nhân</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sendDataToServer({_id:_id_user,name:text_name,img:img_source})}>
            <Text style={{color:'#667EEA',fontWeight:'bold'}}>Xong</Text>
            </TouchableOpacity>
        </View>
    )
}

const Content_Seting_Profile=({guisangcha_V1,pickDocument,img_base64,text_name,setTextName}) =>{

    console.log('img seting profile'+guisangcha_V1.img);
    return(
        <View>
          <View style={styles.seting_img}>
          {img_base64 && <Image source={{uri: img_base64}} style={styles.story} />}
          <TouchableOpacity onPress={ pickDocument}>
          <Text style={{color:'#667EEA',fontWeight:'bold'}}>Chỉnh sửa ảnh hoặc avatar</Text>
          </TouchableOpacity>
          </View> 


          <View style={{flexDirection:'row'}}>
          <Text style={{color:'white',lineHeight:50}}>Tên:</Text>
            <TextInput
            style={styles.input}
            defaultValue={text_name}
            onChangeText={text => setTextName(text)}>
            </TextInput>
          </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex:1
    },
    container_v1:{
        flexDirection:'row',justifyContent:'space-between',margin:5,alignItems:'center',height:30
        
    },
    container_v2:{

    },
    story:{
        width:80,
        height:80,
        borderRadius:50,
        marginBottom:10,
        marginTop:10
      },
      seting_img:{
        alignItems:'center'
      },
      input: {
        height: 50,
        backgroundColor:'#000'
      },
});

export default SetingProfile