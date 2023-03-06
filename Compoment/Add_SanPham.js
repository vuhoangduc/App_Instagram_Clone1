import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Add_SanPham = ({navigation},props) => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');  


    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={input1}
          onChangeText={text => setInput1(text)}
        />
        <TextInput
          style={styles.input}
          value={input2}
          onChangeText={text => setInput2(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Thêm" onPress={() => navigation.navigate('bai3',{name:input1,price:input2})} />
          <Button title="Hủy" onPress={() => navigation.navigate('bai3')} />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '100%',
      height: 40,
      paddingHorizontal: 10,
      marginVertical: 10,
      borderColor: 'gray',
      borderWidth: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
  });
  

export default Add_SanPham