import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text, TouchableOpacity, Image, Keyboard } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const Register = ({ navigation }: any) => {
    const USER = firestore().collection("USERS")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardOpen(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardOpen(false);
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    const hasErrorPassword = () => password.length < 6;
    const hasErrorPasswordConfirm = () => passwordConfirm != password;
    const hasErrorEmail = () => !email.includes("@");

    const handleRegister = () => {
        USER.doc(email)
            .onSnapshot(u => {
                if (!u.exists) {
                    auth().createUserWithEmailAndPassword(email, password)
                        .then(() => USER.doc(email).set({
                            name: 'new Customer',
                            email,
                            phone: '09090990',
                            address: 'No where',
                            password,
                            role: 'customer'
                        }).then(() => { console.log("Add new user success!"); navigation.navigate('Login') }))
                        .catch(error => {
                            console.error("Failed to add user:", error);
                        });
                }
            })
    };

    return (
        <View className='justify-center flex-1 -mt-10 bg-white'>
            <View className='justify-center'>
                <Image resizeMode='contain' source={require('../../../assets/firebase.png')} className={`w-full h-28 ${isKeyboardOpen ? 'hidden' : ''}`}></Image>
                <Text className='text-3xl text-[#f6880e] my-1 font-bold text-center'>Login Here</Text>
            </View>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                autoCapitalize="none"
                keyboardType="email-address"
                activeUnderlineColor='transparent'
                underlineColor='transparent'
                className='m-2 rounded-xl'
            />
            <HelperText type='error' visible={hasErrorEmail()}>Required Email</HelperText>
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                autoCapitalize="none"
                keyboardType="email-address"
                activeUnderlineColor='transparent'
                underlineColor='transparent'
                className='m-2 rounded-xl'
                secureTextEntry={!showPassword}
                right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
            />
            <HelperText type='error' visible={hasErrorPassword()}>Password at least 6 characters</HelperText>
            <TextInput
                label="Confirm Password"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                mode="outlined"
                autoCapitalize="none"
                keyboardType="email-address"
                activeUnderlineColor='transparent'
                underlineColor='transparent'
                className='m-2 rounded-xl'
                secureTextEntry={!showPasswordConfirm}
                right={<TextInput.Icon icon="eye" onPress={() => setShowPasswordConfirm(!showPasswordConfirm)} />}
            />
            <HelperText type='error' visible={hasErrorPasswordConfirm()}>Password not match</HelperText>

            <TouchableOpacity
                disabled={hasErrorEmail() || hasErrorPassword() || hasErrorPasswordConfirm()}
                className='p-5 text-center text-white bg-orange-500 rounded-xl'
                onPress={handleRegister}

            >
                <Text className='w-full text-center text-white bg-orange-500 rounded-xl'>Sign In</Text>

            </TouchableOpacity>
            <View className='flex-row justify-center mt-5 '>
                <Text>Have account already?</Text>
                <TouchableOpacity style={{ marginLeft: 10 }} >
                    <Text onPress={() => navigation.navigate('Login')}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;
