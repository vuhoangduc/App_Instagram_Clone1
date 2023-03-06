import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderProfile = () => {
  return (

          <View style={styles.iconsContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'center',justifyContent: "space-between",marginHorizontal: 20}}>
      <TouchableOpacity style={{marginRight:160}}>
          <Image style={styles.logo} source={require('../assets/LogoInstagram.png')}/>
      </TouchableOpacity>

        <View style={styles.iconsContainer}>
        <TouchableOpacity>
        <Ionicons  name="duplicate-outline" size={30} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:20}}>
        <Ionicons name="menu-outline" size={30} color={'#fff'} />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )


}
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

export default CustomHeaderProfile