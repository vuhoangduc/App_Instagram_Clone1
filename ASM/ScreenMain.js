import { View, Text,Image,StyleSheet,Alert, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Setting from './Setting';
import Video from './Video';
import Thongbao from './Thongbao';
import CustomHeader from '../Custom/CustomHeader';
const Tab = createBottomTabNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
const socket = io('http://192.168.0.106:5000');
import * as ImagePicker from 'expo-image-picker';
import { Dimensions, Platform } from 'react-native';
import CustomHeaderProfile from '../Custom/CustomHeaderProfile';
<ion-icon name="notifications-circle-outline"></ion-icon>
const ScreenHome = ({navigation,route}) => {
  const { height, width } = Dimensions.get('window');
  const isIphoneX = Platform.OS === 'ios' && height >= 812 && width >= 375;

  const [color_icon, setColor] = useState('#fff');
  const [data_v1, setData_v1] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key_v1');
        const data_user = value != null ? JSON.parse(value) : nullvalue;
        setData_v1(data_user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function setColor_new() {
    setColor('#fff')
  }
    socket.on(`Notification${data_v1._id}`, (data) => {
      setColor('red')
    });
  return (
  
    <SafeAreaView style={{ flex: 1,backgroundColor:'#000' }}>
    <View style={{ flex: 1,backgroundColor:'#000',   }}>
    <Tab.Navigator
  tabBarOptions={{
    activeTintColor: '#fff',
    inactiveTintColor: '#ccc',
    tabStyle: {
      backgroundColor: '#000',
    },
  }}>
    <Tab.Screen 
      name="Home" 
      component={Home} 
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name="ios-home" size={size} color={color} />
        ),
        header: (props) => <CustomHeader title="Home" />,
        screenOptions: ({ route }) => ({
        // pass the navigation prop to Home
        navigation: navigation,
        }),
      }}
      initialParams={{ route: route }}
    />
        <Tab.Screen 
      name="Video" 
      component={Video} 
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name="film-outline" size={size} color={color} />
        ),
        headerShown: false
      }}
      initialParams={{ route: route }}
    />
        <Tab.Screen 
      name="thongbao" 
      component={Thongbao} 
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name="notifications-circle-outline" size={size} color={color_icon} />
        ),
        headerStyle: {
        backgroundColor: 'black',
        },
        title: 'Thông báo',
        headerTintColor: 'white',
        
      }}
      initialParams={{ route: route,setColor_new:setColor_new }}
    />
    <Tab.Screen 
      name="Seting" 
      component={Setting} 
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name="person-circle-outline" size={size} color={color} />
        ),
        headerStyle: {
        backgroundColor: 'black',
        },
        header: (props) => <CustomHeaderProfile title="Home" />,
      }}
      initialParams={{ route: route }}
    />
  </Tab.Navigator>
  </View>
  </SafeAreaView>

  
  )
}
const styles = StyleSheet.create({
  logo:{
    width:100,
    height:50,
    resizeMode:'contain'
  },
})
export default ScreenHome