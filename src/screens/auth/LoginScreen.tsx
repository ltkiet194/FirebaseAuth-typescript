import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputComponent from '../../components/InputComponent';
import auth from '@react-native-firebase/auth'
import { Sms } from 'iconsax-react-native';
import { TextInput } from 'react-native-paper';

const LoginScreen = ({ navigation: { navigate } }: any) => {
      const [values, setValues] = useState({ email: '', password: '' });
      const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
      const [isSecure, setIsSecure] = useState(true);

      const updateInputval = (val: any, key: any) => {
            const value: any = { ...values };
            value[key] = val;
            setValues({ ...value })
      };
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
      const handleLogin = async () => {
            if (!values.email || !values.password) {
                  Alert.alert('Please fill all the fields');
                  return;
            }
            try {
                  const userCredential = await auth().signInWithEmailAndPassword(values.email, values.password);

                  console.log('Login with!', userCredential);
            } catch (error) {
                  Alert.alert('Thông tin tài khoản không đúng');
            }
      };

      return (
            <SafeAreaView>
                  <View className='p-5 '>
                        <View className='justify-center'>
                              <Image resizeMode='contain' source={require('../../../assets/firebase.png')} className={`w-full h-40 ${isKeyboardOpen ? 'hidden' : ''}`}></Image>
                              <Text className='text-3xl text-[#f6880e] my-1 font-bold text-center'>Login Here</Text>
                        </View>
                        <View className='my-7'>
                              <InputComponent
                                    placeholder='Email' name="email"
                                    value={values.email} updateInputval={updateInputval}
                                    type='email'
                                    left={<TextInput.Icon icon="email" />}
                                    styled='my-2 rounded-xl'
                              />
                              <InputComponent
                                    placeholder='Password'
                                    name="password" value={values.password}
                                    updateInputval={updateInputval} secure={true}
                                    type='lock'
                                    styled='my-2 rounded-xl'
                                    left={<TextInput.Icon icon="lock" />}
                                    right={<TextInput.Icon icon="eye" onPress={() => setIsSecure(!isSecure)} />}
                              />
                        </View>
                        <TouchableOpacity onPress={handleLogin}>
                              <Text className='p-5 text-center text-white bg-orange-500 rounded-xl'>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigate("SignupScreen") }} >
                              <Text className='p-5 text-center text-[#000] rounded-xl'>Create new account !</Text>
                        </TouchableOpacity>

                  </View>

            </SafeAreaView>
      );
}

export default LoginScreen;