import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useLogin } from './LoginProvider';

const Login = () => {
    const navigation = useNavigation();
    const {login}=useLogin();
    const[user,setUser]=useState('');
    const[pass,setPass]=useState('');


    const btnLogin=()=>{
        if (user===""|| pass==="") {
            Alert.alert("Vui lòng nhập đủ thông tin");
            return;
        }
        navigation.navigate('home')
    }

    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingHorizontal:12}}>
            <Text style={{fontSize:30}}>Đăng nhập</Text>
            <TextInput style={styles.input} placeholder='Tên đăng nhập' onChangeText={(txt)=>setUser(txt)} />
            <TextInput style={styles.input} placeholder='Mật khẩu' onChangeText={(txt)=>setPass(txt)}/>
            <Button onPress={() => {login(), btnLogin() }} title='Đăng nhập' />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 3,
        marginBottom: 6,
        borderRadius: 6,
        marginTop: 10,
        width:'100%'
      },
})