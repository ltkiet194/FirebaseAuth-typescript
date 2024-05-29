import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Button, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addServer, setModalAccount, setModalVisible, setPickedImage, updateProfile } from '../../../store/modalSlice';
import { Camera, CloseSquare, Refresh } from 'iconsax-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Auth } from '../../../firebase/firebase';
import { Channel, Member, Server } from '../../../models/Server';
import { get, update } from 'firebase/database';
import { getUser } from '../../../store/userSlice';

const ModalAccount = () => {
      const dispatch = useDispatch<any>();
      const modalVisible = useSelector((state: any) => state.modal.modalAccount);
      const pickedImage = useSelector((state: any) => state.modal.pickedImage);
      const infoUser = useSelector((state: any) => state.user.infoUser);

      const [values, setValues]: any = useState({ displayname: '', tag: '' });
      const tagCheck = () => {
            if (values.tag.length < 4 || values.tag.length > 7) {
                  Alert.alert('Tag must be  > 3 and <= 6 characters');
                  return false;
            }
            return true;
      }
      const updateInputval = (val: any, key: any) => {
            const value: any = { ...values };
            value[key] = val;
            setValues({ ...value })
      };
      const RandomTag = () => {
            const tag = '#' + Math.floor(Math.random() * 100000);
            updateInputval(tag, 'tag');
      }
      const pickImage = () => {
            ImagePicker.openPicker({ width: 300, height: 300, cropping: true })
                  .then(image => {
                        dispatch(setPickedImage(image.path));
                  })
                  .catch(error => {
                        console.log('Error:', error);
                  });
      };

      const handleUpdateProfile = async () => {
            if (!values.displayname)
                  return Alert.alert('Please enter a display name');
            else if (!values.tag)
                  return Alert.alert('Please enter a tag');
            else if (tagCheck() == false) {
                  return;
            }
            const param = { name: values.displayname, tag: values.tag };
            let param2;

            if (pickedImage) {
                  param2 = { ...param, image: pickedImage };
            } else {
                  param2 = param;
            }
            await dispatch(updateProfile(param2));
            pickedImage ? dispatch(setPickedImage(null)) : null;
            updateInputval('', 'displayname');
            updateInputval('', 'tag');
            updateInputval('', 'pickedImage');

      }
      return (
            <Modal visible={modalVisible} animationType="slide" transparent={true} >
                  <View className='items-center justify-center flex-1 bg-opacity-50'>
                        <View className='items-center pt-20 bg-[#313338] w-full h-full'>
                              <TouchableOpacity onPress={() => dispatch(setModalAccount(false))}
                                    className='absolute top-2 right-2 z-1'>
                                    <CloseSquare size={24} className='text-white' />
                              </TouchableOpacity>
                              <Text className='text-xl font-extrabold text-center text-white'>
                                    Customize Your Server</Text>
                              <Text className='text-center text-white '>
                                    Give your new server a personality with a name and an icon. You can always change these later.</Text>
                              <View className='flex-row'>
                                    {infoUser ? (<Image source={{ uri: infoUser.image }} className='w-24 h-24 rounded-md' />) : (<Camera size={80} className='self-center text-white rounded-md' />)}

                                    <TouchableOpacity onPress={pickImage}
                                          className='relative items-center justify-center w-20 h-20 mx-6 my-3 border-2 border-white rounded-full'
                                          style={{ borderStyle: 'dashed' }}
                                    >
                                          {pickedImage ? (
                                                <Image source={{ uri: pickedImage }} className='w-24 h-24 rounded-md' />
                                          ) : (
                                                <>
                                                      <Camera size={24} className='text-white' />
                                                      <Text className='text-white'>Upload</Text>
                                                </>
                                          )}
                                    </TouchableOpacity>
                              </View>
                              <View className='w-full p-2'>
                                    <Text className='m-2 font-bold text-white uppercase'>Display Name</Text>
                                    <TextInput
                                          placeholderTextColor={'#8A8D90'}
                                          className='p-2 text-white bg-[#1E1F22] rounded-md'
                                          placeholder="Display name"
                                          value={values.displayname}
                                          onChangeText={(text) => updateInputval(text, 'displayname')}
                                    />
                                    <Text className='m-2 font-bold text-white uppercase'>Tag line</Text>
                                    <View className='flex-row items-center'>
                                          <TextInput
                                                placeholderTextColor={'#8A8D90'}
                                                className='p-2 text-white bg-[#1E1F22] rounded-md w-[88%]'
                                                placeholder="e: #1234 #college 6 char max"
                                                value={values.tag}
                                                onChangeText={(text) => updateInputval(text, 'tag')}
                                          />
                                          <TouchableOpacity onPress={RandomTag}>
                                                <Refresh size={24} color='white' className='mx-4 ' />
                                          </TouchableOpacity>
                                    </View>
                              </View>
                              <View className='flex-row justify-center w-full mt-4'>
                                    <TouchableOpacity onPress={handleUpdateProfile}>
                                          <Text className='px-10 py-2 text-white bg-[#5865F2] rounded-lg'>Update</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  </View>
            </Modal >
      )
}

export default ModalAccount