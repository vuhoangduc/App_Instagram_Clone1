import { View, Text,TouchableOpacity,ScrollView,StyleSheet } from 'react-native'
import React, { useEffect,useState } from 'react'

const Show_San_Pham_Bai_3 = ({navigation,route}) => {
    const SanPhams_Bai3=[{
        
            name:"haha",
            price:"1000 vnd"
          },
          {
            name:"bebe",
            price:"2000 vnd"
          },
          {
            name:"may tinh",
            price:"2000 vnd"
          },
          {
            name:"dien thoai",
            price:"2000 vnd"
          },
          {
            name:"game",
            price:"2000 vnd"
          },
    ]
    const [data, setdata] = useState({list:SanPhams_Bai3});


    useEffect(() => {
        if (route.params && route.params.newProduct) {

        }else{
            console.log(route.params);
            if(route.params != undefined){
                let a = data.list;
                a.push(route.params);
                setdata({list:a});  
                console.log(data);
            }
        }
      }, [route.params]);

  return (
    <View>
      <Text style={{fontSize:30, marginBottom:25}}> Show_San_Pham_Bai_3</Text>
      <TouchableOpacity style={{backgroundColor:'red',width:50,marginLeft:20,marginBottom:20}} onPress={() => navigation.navigate('add')}>
        <Text style={{color:'white'}}>add</Text>
      </TouchableOpacity>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {data.list.map((sanpham,index)=>(
          <TouchableOpacity key={index} onPress={() => navigation.navigate('show',{sanpham})}>
              <View style={styles.layout}>
                  <Text>{sanpham.name}</Text>
                  <Text style={{color:'red'}}>{sanpham.price}</Text>
              </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    layout:{
        marginLeft:10,
        marginBottom:10,
        borderWidth:1,
        borderColor:'#000',
        marginRight:10
    }
})

export default Show_San_Pham_Bai_3