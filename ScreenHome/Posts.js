import { View, Text,Image,StyleSheet,TouchableOpacity,FlatList, ScrollView,RefreshControl,Alert } from 'react-native'
import React, { useState,useEffect  } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
var api_url = "http://192.168.0.106:3000/posts";



const Posts = ({guitucha,ResretData,navigarion}) => { 
  console.log(guitucha);
  return (
    <View>
      <View style={{borderBottomWidth: 1, borderBottomColor: 'gray',marginBottom:10}} />
      <SafeAreaView>
      
        <FlatList 
        data={guitucha} 
        renderItem={({item, index}) => (
                <View>
                <PostHeader guitucha={item.author}/>
                <PostContent guitucha={item.image_url}/>
                <PostFooter guitucha={item.content} guiluotlike={item.like} guiBinhLuan={item.comments} guithongtin_post={item} ResretData={ResretData} navigarion={navigarion}

                />
                </View>     
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        />
    
      </SafeAreaView>
    </View>
  )
}

const PostHeader = ({guitucha }) =>{

    return(
      <View style={{flexDirection:'row',justifyContent:'space-between',margin:5,alignItems:'center',height:30}}>
      <View style={{flexDirection:'row'}}>
      <Image source={{uri:guitucha.img_author}} style={styles.story}/>
        <Text style={{color:'white',lineHeight:35}}>{guitucha.name_author}</Text>
      </View>
      <Ionicons name="ellipsis-horizontal" size={20} color={'#fff'} />
    </View>
    )
    
  }
const PostContent =({guitucha }) =>{
    return(
        <View style={{marginTop:10}}>
            <Image style={{width:'100%',height:420,}} source={{uri:guitucha }} />
        </View>
    )
}
const PostFooter=({guitucha,guiluotlike,guiBinhLuan,guithongtin_post,ResretData,navigarion})=>{
  const [iconName, setIconName] = useState('heart-outline');
  const [color_ic, setColor_ic] = useState('#fff');

  
  useEffect(() => {
    let check = true;
      async function vuhoangduc() {
        const value = await AsyncStorage.getItem('@storage_Key_v1');
        const data_user = value != null ? JSON.parse(value) : nullvalue;
        for (let index = 0; index < guiluotlike.length; index++) {
          const element = guiluotlike[index].user_id;
          console.log(element);
          if (element === data_user._id) {
            check = false;
            break; // exit the loop when condition is met
          }
        }
        if (check === false) {
          setIconName('heart');
          setColor_ic('red');
        }
      }
      vuhoangduc();
  }, [guiluotlike]);
  

    const [inf_user, setInf_user] = useState('');
    const update_Post_like = async (data) =>{
      console.log(data);
      var api_url = "http://192.168.0.106:3000/posts/upLike";
      try {
        const response = await axios.put(api_url, data);
        const { status, result } = response.data;

        ResretData();
      } catch (error) {
          console.log(error);
        }
    }
    const handlePress = async () => {
      const value = await AsyncStorage.getItem('@storage_Key_v1');
        setInf_user(value != null ? JSON.parse(value) : nullvalue);
        const data_user = value != null ? JSON.parse(value) : nullvalue;
      console.log(value);
      if (iconName === 'heart-outline') {
        setIconName('heart');
        setColor_ic('red');
        update_Post_like({_id:guithongtin_post._id,_id_user:data_user._id});
      } else {
        setIconName('heart-outline');
        setColor_ic('#fff');
        update_Post_like({_id:guithongtin_post._id,_id_user:data_user._id});

      }
    };
    return(
        <View style={{marginLeft:10,marginBottom:10}}>
        <View style={{flexDirection:'row',marginTop:10}}>
        <TouchableOpacity onPress={()=> handlePress()} style={{marginRight:10}}>
        <Ionicons name={iconName} size={30} color={color_ic} />
        </TouchableOpacity>

        <TouchableOpacity style={{marginRight:10}} onPress={() => navigarion.navigate('comment',{guithongtin_post})}>
        <Ionicons name="chatbubble-ellipses-outline" size={30} color={'#fff'} />
        </TouchableOpacity>

        <TouchableOpacity style={{marginRight:10}}>
        <Ionicons name="share-social-outline" size={30} color={'#fff'} />
        </TouchableOpacity>        
        </View>
        <Text style={{color:'white',marginLeft:5}}>{guiluotlike.length+" lượt thích"}</Text>
        <Text style={{color:'white',marginLeft:5,marginBottom:10}}>{guitucha}</Text>
        <Text style={{color:'white',marginLeft:5,marginBottom:10}}>{"xem tất cả "+guiBinhLuan.length+" bình luận"}</Text>
        </View>
    )
}

  const styles = StyleSheet.create({
    story:{
        width:35,
        height:35,
        borderRadius:50,
        marginLeft:6,
        marginRight:5
      }
  })
export default Posts