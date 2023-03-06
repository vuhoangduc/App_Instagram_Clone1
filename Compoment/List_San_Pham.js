import { View, Text,Image,StyleSheet,TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import { SanPhams } from '../data/SanPhams'
import { ScrollView } from 'react-native';

const List_San_Pham = ({navigation}) => {

  return (
    <View>
    <TouchableOpacity style={{backgroundColor:'red',width:50}} onPress={() => navigation.navigate('bai3')}>
        <Text style={{color:'white'}}>Bai 3</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{backgroundColor:'red',width:50}} onPress={() => navigation.navigate('bai4')}>
        <Text style={{color:'white'}}>Bai 4</Text>
    </TouchableOpacity>
    <ScrollView vertical showsVerticalScrollIndicator={false}>
      {SanPhams.map((sanpham,index)=>(
        <TouchableOpacity key={index} onPress={() => navigation.navigate('show',{sanpham})}>
            <View>
                <Text>{sanpham.name}</Text>
                <Image style={{width:150,height:150}} source={sanpham.image}/>
    
            </View>
        </TouchableOpacity>
            ))}
    </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch',
        backgroundColor:'#fff',
        justifyContent:'center',
        marginBottom:50

    }
})
export default List_San_Pham