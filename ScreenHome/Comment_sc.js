import { View, Text,StyleSheet, ScrollView,Image,TextInput,TouchableOpacity, FlatList,Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import io from 'socket.io-client';

var api_url = "http://192.168.0.106:3000/posts";
const Comment_sc = ({route}) => {
  const [comments, setComments] = useState([]);
  const [data_res, setDatares] = useState([]);
  const [reload, setReload] = useState(false);
  const socket = io('http://192.168.0.106:5000');
  const [data_v1, setData_v1] = useState('');
useEffect(() => {
  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key_v1');
      const data_user = value != null ? JSON.parse(value) : nullvalue;
      setData_v1(data_user);
      socket.emit('join',{name:data_user.name,_id:data_user._id,room:route.params.guithongtin_post._id});
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [reload]);
// const showNotification = () => {
//   Alert.alert(
//     'Notification Title',
//     'Notification Message',
//     [
//       { text: 'OK', onPress: () => console.log('OK Pressed') }
//     ],
//     { cancelable: false }
//   );
// };

  async function fetchComments() {
    try {
      const response = await axios.post("http://192.168.0.106:3000/posts/getcomment", { post_id: route.params.guithongtin_post._id });
      const { status, comments : commentData } = response.data; 
      if (status === 'success') {
        setComments(commentData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function setReloadFunction() { 
    setReload(!reload);
  }
  return (
    <View style={styles.container}>
     <View style={{borderBottomWidth: 1, borderBottomColor: 'gray'}} />
      <ScrollView>
        <Content_Comment id_post={route.params.guithongtin_post._id} comments={comments} socket={socket} setReloadFunction={setReloadFunction} fetchComments={fetchComments}/>
      </ScrollView>
      <View style={{borderBottomWidth: 1, borderBottomColor: 'gray'}} />
      <Footer_Comment id_post={route.params.guithongtin_post._id} fetchComments={fetchComments} socket={socket} setReloadFunction={setReloadFunction}/>
    </View>
  )
}

const Content_Comment = ({comments,socket,setReloadFunction,fetchComments}) =>{
  socket.on('receive', (data) => {
    fetchComments();
  });
  return(
    <View style={styles.content}>
      <ScrollView>
        {comments.map((comment,index) => (
          <View key={index}>
            <View style={{flexDirection:'row'}}>
            <Image style={{width:40,height:40,borderRadius:360,marginBottom:5,marginLeft:10}} source={{uri:comment.user.img}}/>
              <View>
              <Text style={{color:'white'}}>{comment.user.name}</Text>
              <Text style={{color:'white'}}>{comment.content}</Text>
              </View>
            </View>
            <View style={{borderBottomWidth: 1, borderBottomColor: 'gray'}} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const Footer_Comment = ({id_post,fetchComments,socket,setReloadFunction}) =>{
  const [text_input,setText] = useState('');
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
  }, []);
  const sendCommentToServer = async (data) => {
    setText('');
    try {
      socket.emit('new-comment',{comment:data.comment,_id:data.user_id,name:data.name,room:data.post_id} );
      const response = await axios.put("http://192.168.0.106:3000/posts/upcomment",data);  
    } catch (error) {
        console.log(error);   
      }
  };

  return(
    <View style={styles.footer}>
      <Image style={{width:40,height:40,borderRadius:360,marginBottom:5,marginLeft:10}} source={{uri:"https://scontent.fhan2-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=7kXrC339WxsAX83xWpB&_nc_oc=AQmlplBoSt2I21Fz1AJ26D6Rc7Gk6Kg4Acux0supk7tzaoFNbKNJF3-n4TzDGMFbvGg&_nc_ht=scontent.fhan2-5.fna&oh=00_AfDQ4nM8F1bxcnH9hqc-FFZV3SnZtnH35a2HaLd3Xnialw&oe=6409F378"}}/>
      <View style={styles.textInput}>
      <TextInput
        placeholder="Thêm bình luận..."
        placeholderTextColor="white"
        value={text_input}
        onChangeText={text => setText(text)}
        style={{ color: 'white' }}
      />
      <TouchableOpacity onPress={() =>sendCommentToServer({post_id:id_post,name:data_v1.name,user_id:data_v1._id,comment:text_input})}>
      <Text style={{color:'#E0EFFE',lineHeight:35}}>Đăng</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#000'
  },
  content:{
    width:'100%',
    height:550,
    backgroundColor:'#000'
  },
  footer:{
    backgroundColor:'#000',
    height:125,
    width:'100%',
    flexDirection:'row',
    alignItems:'center'
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:20,
    marginVertical: 10,
    paddingHorizontal: 10,
    marginLeft:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
})
export default Comment_sc