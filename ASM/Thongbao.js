import { View, Text,StyleSheet,Alert,ScrollView,Image } from 'react-native'
import React, { useState,useEffect  } from 'react'
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
const socket = io('http://192.168.0.106:5000');
import axios from 'axios';
import NhanThongBao from './NhanThongBao';
const Thongbao = ({setColor_new}) => {
  const [data_v1, setData_v1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setColor_new();
        const value = await AsyncStorage.getItem('@storage_Key_v1');
        const data_user = value != null ? JSON.parse(value) : nullvalue;
        const response = await axios.get("http://192.168.0.106:3000/thongbao1/getThongBao", {
          params: data_user
        });
        const { status, notification } = response.data;
        setData_v1(notification);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{color:'white',fontWeight:'bold'}}>Tháng này</Text>
      <ScrollView vertical showsHorizontalScrollIndicator={false}>
      <NhanThongBao guitucha={data_v1}/>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex:1
    }
})

export default Thongbao