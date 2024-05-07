import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppInput from '../components/AppInput';
import auth from '@react-native-firebase/auth'
import {KeyboardAvoidingView,Platform,Keyboard} from 'react-native';

const Login:React.FC<Props> = ({navigation:{navigate}}) => {
    const [values, setValues] = useState({ email: '', password: ''});
    const [focused, setFocused] = useState<boolean>(false);

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
                        <Image resizeMode='contain' source={require('../../assets/firebase.png')} className={`w-full h-40 ${focused ? 'hidden' : ''}`}></Image>
                        <Text className='text-3xl text-[#f6880e] my-1 font-bold text-center'>Login Here</Text>
                    </View>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <TouchableWithoutFeedback onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
                            <View className='justify-around'>
                                <AppInput placeholder='Email' name="email" value={values.email} updateInputval={updateInputval} />
                                <AppInput placeholder='Password' name="password" value={values.password} updateInputval={updateInputval} secure={true} />
                            </View>

                        </TouchableWithoutFeedback>
                        <TouchableOpacity onPress={() => loginSubmit()}>
                                <Text className='p-5 text-center text-white bg-orange-500 rounded-xl'>Sign In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigate("Signup") }} >
                                <Text className='p-5 text-center text-[#000] rounded-xl'>Create new account !</Text>
                            </TouchableOpacity>
                     </KeyboardAvoidingView>
                </View> 
        </SafeAreaView>
    );
}

export default Login;
