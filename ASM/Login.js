import { View, Text,TouchableOpacity,StyleSheet,TextInput,Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
var api_url = "http://192.168.0.106:3000/users/login";
import io from 'socket.io-client';
const socket = io('http://192.168.0.106:5000');
const Login = ({navigation}) => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');  
    const [data_v1, setData_v1] = useState('');

    const storeData = async (data) => {
      try {
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem('@storage_Key_v1', jsonValue)
      } catch (e) {
        // saving error
      }
    }
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key_v1');
        setData_v1(jsonValue != null ? JSON.parse(jsonValue) : nullvalue);
      } catch(e) {
        // error reading value

        console.log('error  '+e);
      }
    }

    useEffect(() => {
      async function getData_v1() {
        try {
          const value = await AsyncStorage.getItem('@storage_Key_v1');
          if (value !== null) {
            setData_v1(value != null ? JSON.parse(value) : nullvalue);
            navigation.navigate('HomeSC',data_v1);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getData_v1();

    }, []);

    const sendDataToServer = async (data) => {
      try {
        if (validate(data) == false) {
          return;
        }    
        const response = await axios.post(api_url, data);
        const { status, data_res } = response.data;

        if (status === 'success') {
          alert("Đăng nhập thành công");
          storeData(data_res);
          getData();
          navigation.navigate('HomeSC',data_v1);
        } else {
          console.log(response.data.message);
          alert(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("Sai mật khẩu!!");
          
        } else {
          console.log(error);
          alert("Tài khoản chưa tồn tại");
        }
      }
    };
    const validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    const validatePassword = (pass) => {
      if (pass.length<=6) {
        return false;
      }
      return true;
  };
    const validate = (data) => {
      let email = data.email;
      let pass = data.password;
      let isValid = true;
    
      if (!validateEmail(email)) {
        isValid = false;
        alert("Email không hợp lệ");
      }
      if (!validatePassword(pass)) {
        isValid = false;
        alert("Mật khẩu phải trên 6 ký tự");
      }
      // ... tiếp tục kiểm tra username và password
      return isValid;
    };
  return (
    
    <View style={styles.layout_main}>
        <Text style={{color:'#667EEA',fontSize:60,fontWeight:'bold'}} >Login</Text>
        <Text style={{color:'#4A5568',fontSize:15,marginBottom:20}} >Sign in to your account</Text>
        <TextInput
          style={styles.input}
          value={input1}
          onChangeText={text => setInput1(text)}
          placeholder='Email'
        />
        <TextInput
          style={styles.input}
          value={input2}
          onChangeText={text => setInput2(text)}
          placeholder='Password'
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={()=> sendDataToServer({email:input1,password:input2})}>
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',textAlign:'center',lineHeight:47}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20}} onPress={() => navigation.navigate('Signup')}>
        <Text>create a new account</Text>
    </TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({
    layout_main:{
        flex:1,
        alignContent:'center',
        alignItems:'center',
        marginTop:100
    },
    input: {
        width: 347,
        height: 50,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderColor: '#667EEA',
        borderWidth: 1,
        marginBottom:20
      },
    button:{
        backgroundColor:'#667EEA',
        width:347,
        height:47,
        borderRadius:20,
        marginTop:20
    }


})
export default Login