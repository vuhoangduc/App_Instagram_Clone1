import { View, Text,ScrollView,Image,StyleSheet,StatusBar,RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState,useEffect  } from 'react'
import { USERS } from '../data/USERS'
import { POSTS } from '../data/posts'
import { Ionicons } from '@expo/vector-icons';
import Posts from '../ScreenHome/Posts';
import { SafeAreaView } from 'react-native-safe-area-context';
var api_url = "http://192.168.0.106:3000/posts/getPost";
import axios from 'axios';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({props,navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [baiviet,setbaiviet] = useState([]);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getListSP_v2();

      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {

    getListSP_v2();
  }, []);
    const getListSP_v2 = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key_v1');
        const data_user = value != null ? JSON.parse(value) : nullvalue;
        console.log(data_user);
        const response = await axios.get("http://192.168.0.106:3000/posts/getPost", {
          params: data_user
        });
        // const data_json = response.data;
        const { status, data_v1 } = response.data;
        console.log(data_v1);
        setbaiviet(data_v1);
      } catch (error) {
        console.error(error);
      } finally {
        setRefreshing(false);
      }
    };

  return (
       <View style={{backgroundColor:'black',flex:1}}>
      <ScrollView vertical 
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        >
      <View style={{marginLeft:10,alignItems:'center'}}>
        <View style={{marginRight:20}}>
        <View style={styles.unreadBadge}>
        <Ionicons style={{alignItems:'center',lineHeight:25}} name="add-outline" size={20} color={'#fff'} />
        </View>
          <Image style={{width:75,height:75,borderRadius:360,marginBottom:5}} source={{uri:"https://scontent.fhan2-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=7kXrC339WxsAX83xWpB&_nc_oc=AQmlplBoSt2I21Fz1AJ26D6Rc7Gk6Kg4Acux0supk7tzaoFNbKNJF3-n4TzDGMFbvGg&_nc_ht=scontent.fhan2-5.fna&oh=00_AfDQ4nM8F1bxcnH9hqc-FFZV3SnZtnH35a2HaLd3Xnialw&oe=6409F378"}}/>
        </View>
          <TouchableOpacity >
          <Text style={{color:'#ccc'}}>Tin của bạn</Text>
          </TouchableOpacity>
      </View>
            {USERS.map((story,index)=>(
              <View key={index} style={{alignItems:'center',marginRight:10}}>
                <Image source={story.image}
                                style={styles.story}
                                />
               <Text style={{ color: 'white',marginLeft:6,}}>
              {story.user.length > 11
                ? story.user.slice(0, 10).toLowerCase() + '...'
                : story.user.toLowerCase()}
            </Text>
              </View>
            ))}
            </ScrollView>
        <ScrollView vertical>
         <Posts guitucha={baiviet} ResretData={getListSP_v2} navigarion={navigation} />
      </ScrollView> 
        </ScrollView>
        <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  story:{
    width:75,
    height:75,
    borderRadius:50,
    marginLeft:6,
    borderWidth:2,
    borderColor:'#ff8501'
  },
  story_v2:{
    width:35,
    height:35,
    borderRadius:50,
    marginLeft:6,
    borderWidth:1,
    borderColor:'#ff8501'
  },
  unreadBadge: {
    backgroundColor: "#667EEA",
    position: "absolute",
    flex: 30,
    bottom: 5,
    width: 25,
    height:25,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    marginLeft:55,

    },
    unreadBadgeText:{
      color:'white',
      fontWeight:'600'
    }
})
export default Home