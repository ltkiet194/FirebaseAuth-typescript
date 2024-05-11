import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputComponent from '../../components/InputComponent';
import auth from '@react-native-firebase/auth'
import { TextInput } from 'react-native-paper';


const SignupScreen = ({ navigation: { navigate } }: any) => {
      const [values, setValues] = useState({ name: '', email: '', password: '' });

      const [isSecure, setIsSecure] = useState(true);
      const [errorText, setErrorText] = useState('');
      const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

      const updateInputval = (val: any, key: any) => {
            const value: any = { ...values };
            value[key] = val;
            setValues({ ...value })
      };
      const handleSignup = async () => {
            if (!values.name || !values.email || !values.password) {
                  Alert.alert('Please fill all the fields');
                  return;
            }
            if (values.password.length < 6) {
                  Alert.alert('Password must be at least 6 characters');
                  return
            }
            if (values.name.length < 3) {
                  Alert.alert('Name must be at least 3 characters');
                  return
            }
            if (!values.email.includes('@')) {
                  Alert.alert('Email must include @');
                  return
            }
            try {
                  setErrorText('');
                  const userCredential = await auth().createUserWithEmailAndPassword(values.email, values.password);
                  const user = userCredential.user;
                  await user.updateProfile({
                        displayName: values.name
                  });

                  console.log('User account created & signed in!', user);
            } catch (error) {
                  console.error('Error creating account:', error);
            } finally {
            }
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
      return (
            <SafeAreaView>
                  <View className='p-5'>
                        <View className='justify-center'>
                              <Image resizeMode='contain' source={require('../../../assets/firebase.png')} className={`w-full h-40 ${isKeyboardOpen ? 'hidden' : ''}`}></Image>
                              <Text className='text-3xl text-[#f6880e] font-bold text-center'>Login Here</Text>
                        </View>
                        <View className='my-1 '>
                              <InputComponent placeholder='Name' name="name" value={values.name} updateInputval={updateInputval} styled='my-2 rounded-xl'
                                    left={<TextInput.Icon icon="card-account-details-star" />}
                              />
                              <InputComponent placeholder='Email' name="email" value={values.email} updateInputval={updateInputval} styled='my-2 rounded-xl'
                                    left={<TextInput.Icon icon="email" />}
                              />
                              <InputComponent placeholder='Password' name="password" value={values.password} updateInputval={updateInputval} styled='my-2 rounded-xl'
                                    secure={isSecure}
                                    left={<TextInput.Icon icon="lock" />}
                                    right={<TextInput.Icon icon="eye" onPress={() => setIsSecure(!isSecure)} />}
                              />
                        </View>
                        <TouchableOpacity onPress={() => handleSignup()}>
                              <Text className='p-5 text-center text-white bg-orange-500 rounded-xl'>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigate('LoginScreen') }}>
                              <Text className='p-5 text-center text-[#000] rounded-xl'>Already have an account !</Text>
                        </TouchableOpacity>
                  </View>
            </SafeAreaView>
      );
}

export default SignupScreen;