import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Button, ScrollView } from 'react-native';
import ContentProfile from '../ScreenProfile/ContentProfile';
import HeaderProfile from '../ScreenProfile/HeaderProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Setting = ({navigation,route}) => {
  const [reload, setReload] = useState(false);
  const [data_v1, setData_v1] = useState('');
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
    console.log('thay');
    setReload(!reload);
  }

  return (
    <View style={{backgroundColor:'black',flex:1}}>
    <ScrollView vertical>
    <HeaderProfile navigation={navigation} data_v1_2={data_v1}/>
    <ContentProfile route={route.params} setReloadFunction={setReloadFunction}/>
    </ScrollView>
    </View>
  );
}
const styles = {
  container: {
    backgroundcolor:'#000'
  },


};

export default Setting