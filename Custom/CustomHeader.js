import { View, Text, Image, StyleSheet,TouchableOpacity,Alert,Modal,Pressable,TextInput,Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
var api_url = "http://192.168.0.106:3000/posts";
import io from 'socket.io-client';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import LZString from 'lz-string';
const CustomHeader = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [content,setContetn] = useState('');
  const [img_base64, setiimg_base64] = useState(null);
  const [compressedData,setcompressedData] = useState(null);
  const [data_v1, setData_v1] = useState('');
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const dateString = date + "/" + month + "/" + year;
// Vu hoang duc ph24842
const socket = io('http://192.168.0.106:5000');

const [img_source, setimg_source] = useState(null);
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

}, []);


const sendDataToServer = async (data) => {
  const formData = new FormData();
  formData.append('_Id_user', data._Id_user);
  formData.append('name_user', data.name_user);
  formData.append('img_url_user', data.img_url_user);
  formData.append('content', data.content);
  formData.append('img', data.img);
  formData.append('create_at', data.create_at);
  console.log(formData);
  try {
    const response = await axios.post(api_url, formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
    const { status, result } = response.data;
    socket.emit('newPost');
    setiimg_base64(null);
    setContetn(null);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <View style={styles.iconsContainer}>
    
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.dialog}>
        <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            <View style={styles.container}>

      <TextInput
        style={styles.textInput}
        placeholder="nhập content"
        value={content}
        onChangeText={text => setContetn(text)}
      />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickDocument} />
      {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 200, height: 200 }} />}
    </View> 
    <TouchableOpacity style={styles.button} onPress={()=> sendDataToServer({_Id_user:data_v1._id,name_user:data_v1.name,img_url_user:data_v1.img,content:content,img:img_source,create_at:dateString})}>
      <Text style={{color:'white',fontSize:20,fontWeight:'bold',textAlign:'center',lineHeight:47}}>Post Bài viết</Text>
    </TouchableOpacity>
    </View>
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', justifyContent: 'center',justifyContent: "space-between",marginHorizontal: 20}}>
      <TouchableOpacity style={{marginRight:160}} >
          <Image style={styles.logo} source={require('../assets/LogoInstagram.png')}/>
      </TouchableOpacity>

        <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons  name="duplicate-outline" size={30} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:20}}>
        <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>10</Text>
        </View>
        <Ionicons name="chatbubble-outline" size={30} color={'#fff'} />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  iconsContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
logo:{
    width:100,
    height:50,
    resizeMode:'contain'
},
icon:{
    width:30,
    height:30,
    marginLeft:10,
    resizeMode: 'contain'
},
unreadBadge: {
  backgroundColor: "#FF3250",
  position: "absolute",
  flex: 20,
  bottom: 18,
  height: 18,
  width: 25,
  borderRadius: 25,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
  },
unreadBadgeText:{
  color:'white',
  fontWeight:'600'
},
dialog:{
  width:'100%',
  height:500,
  backgroundColor:'#ccc',
  marginTop:100,
  
},
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
textInput: {
  width: '80%',
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  marginVertical: 10,
  paddingHorizontal: 10,
},
imageContainer: {
  width: 100,
  height: 100,
  borderRadius: 50,
  overflow: 'hidden',
  marginVertical: 10,
},
image: {
  width: '100%',
  height: '100%',
},
button:{
  backgroundColor:'#667EEA',
  width:347,
  height:47,
  borderRadius:20,
  marginTop:20
}
});

export default CustomHeader;