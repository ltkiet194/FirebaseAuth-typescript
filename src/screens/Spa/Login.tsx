import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-paper';
import { login, useMyContextController } from '../../context';

const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('123456');
    const [showPassword, setShowPassword] = useState(false);
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin != null) {
            if (userLogin.role == "admin")
                navigation.navigate("RouterService")
            else
                navigation.navigate("RouterServiceCustomer")
        }
    }, [userLogin])

    const onSubmit = () => {
        login(dispatch, email, password);
    }


    return (
        <View style={styles.container} className='bg-white' >
            <View className='justify-center'>
                <Image resizeMode='contain' source={require('../../../assets/firebase.png')} className={`w-full h-28 `}></Image>
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
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                className='m-2 rounded-xl'
                right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
            />
            <TouchableOpacity
                className='p-5 text-center text-white bg-orange-500 rounded-xl'
                onPress={onSubmit}
            >
                <Text className='w-full text-center text-white bg-orange-500 rounded-xl'
                    onPress={onSubmit}>Sign In</Text>

            </TouchableOpacity>
            <View style={styles.view}>
                <Text>You not have account?</Text>
                <TouchableOpacity style={{ marginLeft: 10 }} >
                    <Text style={styles.text} onPress={() => navigation.navigate('Register')}>Sign Up</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        marginBottom: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: "white",
        fontWeight: 'bold',
        marginBottom: 50
    }, view: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20
    },
    text: {
        fontWeight: 'bold'
    }
});

export default Login;