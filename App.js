import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Alert } from 'react-native';
import List_San_Pham from './Compoment/List_San_Pham';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import ShowSanPham from './Compoment/ShowSanPham';
import Add_SanPham from './Compoment/Add_SanPham';
import Add_SanPham_lab4 from './Lab4/Add_SanPham_lab4';
import Show_San_Pham_Bai_3 from './Compoment/Show_San_Pham_Bai_3';
import Lab4 from './Lab4/Lab4';
import Login from './ASM/Login';
import Signup from './ASM/Signup';
import ScreenHome from './ASM/ScreenMain';
import Show_BaiViet from './Lab4/Show_BaiViet';
import SetingProfile from './ScreenProfile/SetingProfile';
import Comment_sc from './ScreenHome/Comment_sc';
import baitap from './DropDown/baitap';
import listProduct from './DropDown/listProduct';
const StackDemo = createNativeStackNavigator();
import React, { useState, useEffect } from 'react';
export default function App() {

  return (
    <NavigationContainer independent={true}>
      <StackDemo.Navigator initialRouteName='Login' >
        <StackDemo.Screen 
          name='Home' 
          component={List_San_Pham}
          options={{
             title: 'Ds Sản phẩm',
              }} 
        />
          <StackDemo.Screen 
          name='show' 
          component={ShowSanPham} 
          options={{ title: 'Sản phẩm' }} 
        />
          <StackDemo.Screen 
          name='add' 
          component={Add_SanPham} 
          options={{ title: 'Thêm Sản Phẩm' }} 
        />
          <StackDemo.Screen 
          name='bai3' 
          component={Show_San_Pham_Bai_3} 
          options={{ title: 'Bai 3' }} 
        />
          <StackDemo.Screen 
          name='bai4' 
          component={Lab4} 
          options={{ title: 'Bai 4' }} 
        />
          <StackDemo.Screen 
          name='add_lab4' 
          component={Add_SanPham_lab4} 
          options={{ title: 'them san pham' }} 
        />
          <StackDemo.Screen 
          name='show_lab4' 
          component={Show_BaiViet} 
          options={{ title: 'Update'}} 
        />
          <StackDemo.Screen 
          name='Login' 
          component={Login} 
          options={{ 
            title: 'DK',
            headerShown: false
           }} 
        />
          <StackDemo.Screen 
          name='Signup' 
          component={Signup} 
          options={{ title: 'DN', headerShown: false }} 
        />
          <StackDemo.Screen 
          name='HomeSC' 
          component={ScreenHome} 
          options={{ title: 'Home', headerShown: false, }} 
        />
          <StackDemo.Screen 
          name='setingProfile' 
          component={SetingProfile} 
          options={{ title: 'setingProfile', headerShown: false, }} 
        />
          <StackDemo.Screen 
          name='baitap' 
          component={baitap} 
          options={{ title: 'baitapDropDown'}} 
        />

        {/* 
          <StackDemo.Screen 
          name='listProduct' 
          component={listProduct} 
          options={{ title: 'baitapDropDown'}} 
          />
        */}

          <StackDemo.Screen 
          name='comment' 
          component={Comment_sc} 
          options={{ 
            title: 'Bình luận',
            headerStyle: {
              backgroundColor: '#000', // màu nền của thanh header
            },
            headerTintColor: '#fff', // màu chữ của nút back và title
            headerTitleStyle: {
              fontWeight: 'bold', // định dạng title
            },
          }
        }
        />
      </StackDemo.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop:20
  },
});



