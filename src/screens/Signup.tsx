import React, { useState } from 'react';
import { Alert, Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppInput from '../components/AppInput';
import auth from '@react-native-firebase/auth'


const Signup:React.FC<Props> = ({navigation:{navigate}}) => {
    const [values, setValues] = useState({name: '', email: '', password: ''});
    const [focused, setFocused] = useState<boolean>(false);

    const updateInputval = (val:any, key:any) => {
        const value:any = {...values};
        value[key] = val;
        setValues({...value})
    };
    const signupSubmit = () => {    
        console.log(values);
        if(!values.name || !values.email || !values.password){
            Alert.alert("All fields are required");
            return false;
        }
        auth().createUserWithEmailAndPassword(values.email, values.password).then((res:any) => {
            res.user?.updateProfile({
                name: values.name
            })
            console.log("Created User", res);
            setValues({name: '', email: '', password: ''});
            navigate('Login');
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
                    <Text className='text-3xl text-[#f6880e] font-bold text-center'>Login Here</Text>
                </View>
                <TouchableWithoutFeedback  onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
                    <View className='justify-around'>
                        <AppInput placeholder='Name' name="name" value={values.name} updateInputval={updateInputval} />
                        <AppInput placeholder='Email' name="email" value={values.email} updateInputval={updateInputval}/>
                        <AppInput placeholder='Password' name="password" value={values.password} updateInputval={updateInputval} secure={true}/>
                    </View>
                </TouchableWithoutFeedback>
              
                <TouchableOpacity onPress={() => signupSubmit()}>
                    <Text className='p-5 text-center text-white bg-orange-500 rounded-xl'>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigate('Login')}}>
                    <Text className='p-5 text-center text-[#000] rounded-xl'>Already have an account !</Text>
                </TouchableOpacity>

            </View> 
            
        </SafeAreaView>
    );
}

export default Signup;
