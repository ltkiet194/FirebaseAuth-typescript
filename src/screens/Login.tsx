import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppInput from '../components/AppInput';
import auth from '@react-native-firebase/auth'

const Login:React.FC<Props> = ({navigation:{navigate}}) => {
    const [values, setValues] = useState({ email: '', password: ''});
    const updateInputval = (val:any, key:any) => {
        const value:any = {...values};
        value[key] = val;
        setValues({...value})
    };

    const loginSubmit = () => {    
        console.log(values);
        if( !values.email || !values.password){
            Alert.alert("All fields are required");
            return false;
        }
        auth().signInWithEmailAndPassword(values.email, values.password).then((res:any) => {
            console.log( res);
            setValues({ email: '', password: ''});
            navigate('Home');
        })
        .catch((error: any) => {
            Alert.alert(error.message);
        })

    }
    return (
        <SafeAreaView>
            <View className='p-5 '>
                <View className='justify-center'>
                    <Image resizeMode='contain' source={require('../../assets/firebase.png')} className='w-full h-56'></Image>
                    <Text className='text-3xl text-[#f6880e] my-1 font-bold text-center'>Login Here</Text>
                </View>
                <View className='my-7'>
                    <AppInput placeholder='Email' name="email" value={values.email} updateInputval={updateInputval}/>
                    <AppInput placeholder='Password' name="password" value={values.password} updateInputval={updateInputval} secure={true}/>
                </View>
                <TouchableOpacity onPress={() => loginSubmit()}>
                    <Text className='p-5 text-center text-white bg-orange-500 rounded-xl'>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>{ navigate("Signup")}} >
                    <Text className='p-5 text-center text-[#000] rounded-xl'>Create new account !</Text>
                </TouchableOpacity>

            </View> 
            
        </SafeAreaView>
    );
}

export default Login;
