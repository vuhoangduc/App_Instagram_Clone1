import React, { useState,useEffect  } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Reels from '../ScreenVideo/Reels';


const Video = () => {
  const Windowwidth = Dimensions.get('window').width;
  const Windowheight = Dimensions.get('window').height;
  const [baiviet,setbaiviet] = useState([]);

  useEffect(() => {
    getListSP_v2();
  }, []);

    const getListSP_v2 = async () => {
      try {
        const res = await fetch('http://192.168.0.106:3000/videos');
        const data_json = await res.json();
        console.log(data_json);
        setbaiviet(data_json);
      } catch (err) {
        console.error(err);
      }

    };

  return (
<View style={{width:Windowwidth,height:Windowheight,backgroundColor:'black',position:'relative'}}>
      <View style={{position:'absolute',top:0,left:0,right:0,}}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Reels</Text>
      <Reels baiviet={baiviet}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  bottomContainer: {
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16
  },
  userHandle: {
    color: 'gray',
    fontSize: 14
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButtonText: {
    fontSize: 14,
    color: 'gray'
  }
});
export default Video