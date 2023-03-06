import { View, Text,TouchableOpacity,StyleSheet,TextInput,Alert } from 'react-native'
import React, { useState } from 'react';
import axios from 'axios';
var api_url = "http://192.168.0.106:3000/users";

const Signup = ({navigation}) => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');  
    const [input3, setInput3] = useState('');  
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    
    const dateString = date + "/" + month + "/" + year;

    const sendDataToServer = async (data) => {
      if (validate(data)== false) {
        return;
      }
    
      try {
        const response = await axios.post(api_url, data);
      
        if (response.status === 409) {
          console.log("response.data.message:", response.data.message);
          alert("Tài khoản đã tồn tại !!!!!!");
        } else {
          alert("Đăng ký thành công!!!");
          setInput1("");
          setInput2("");
          setInput3("");
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 409) {
          alert("Tài khoản đã tồn tại !!!!!!");
          
        } else {
          console.log(error);
          alert("Lỗi khi đăng ký !!!!!!");
        }
      }
    };

    const validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
    const validateUserName = (name) => {
        if (name === "" || name === null || name === undefined) {
          return false;
        }
        return true;
    };
    const validatePassword = (pass) => {
      if (pass.length<=6) {
        return false;
      }
      return true;
  };
    const validate = (data) => {
      let email = data.email;
      let name = data.name;
      let pass = data.password;
      let isValid = true;
    
      if (!validateEmail(email)) {
        isValid = false;
        alert("Email không hợp lệ");
      }
      if (!validateUserName(name)) {
        isValid = false;
        alert("username không được để trống");
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
        <Text style={{color:'#667EEA',fontSize:60,fontWeight:'bold'}}>SignUp</Text>
        <Text style={{color:'#4A5568',fontSize:15,marginBottom:20}} >Sign up to your account</Text>
        <TextInput
          style={styles.input}
          value={input1}
          onChangeText={text => setInput1(text)}
          placeholder='username..'
        />
        <TextInput
          style={styles.input}
          value={input2}
          onChangeText={text => setInput2(text)}
          placeholder='email'
        />
                <TextInput
          style={styles.input}
          value={input3}
          onChangeText={text => setInput3(text)}
          placeholder='password'
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={() => sendDataToServer({name:input1,email:input2,password:input3,create_at:dateString,img:"https://scontent.fhan2-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=7kXrC339WxsAX83xWpB&_nc_oc=AQmlplBoSt2I21Fz1AJ26D6Rc7Gk6Kg4Acux0supk7tzaoFNbKNJF3-n4TzDGMFbvGg&_nc_ht=scontent.fhan2-5.fna&oh=00_AfDQ4nM8F1bxcnH9hqc-FFZV3SnZtnH35a2HaLd3Xnialw&oe=6409F378",posts:[],friends:[],lowings:[]})}>
            <Text style={{color:'white',fontSize:20,fontWeight:'bold',textAlign:'center',lineHeight:47}}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20}} onPress={() => navigation.navigate('Login')}>
        <Text>Login!</Text>
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
export default Signup