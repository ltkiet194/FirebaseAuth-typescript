import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Button, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addServer, setModalVisible, setPickedImage } from '../../../store/modalSlice';
import { Camera, CloseSquare } from 'iconsax-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Auth } from '../../../firebase/firebase';
import { Channel, Member, Server } from '../../../models/Server';

import uuid from 'react-native-uuid';
interface Props {
      onPress?: () => void;
}
const ModalCreateServer = (props: Props) => {
      const dispatch = useDispatch<any>();
      const modalVisible = useSelector((state: any) => state.modal.modalVisible);
      const pickedImage = useSelector((state: any) => state.modal.pickedImage);
      const infoUser = useSelector((state: any) => state.user.infoUser);
      const [serverName, setServerName] = useState(``);
      useEffect(() => {
            if (infoUser) {
                  setServerName(`${infoUser.name}'s Server`);
            }
      }, [infoUser]);

      const pickImage = () => {
            ImagePicker.openPicker({ width: 300, height: 300, cropping: true })
                  .then(image => {
                        dispatch(setPickedImage(image.path));
                  })
                  .catch(error => {
                        console.log('Error:', error);
                  });
      };
      const handleCreateServer = () => {
            if (!serverName)
                  return Alert.alert('Please enter a server name');
            else if (!pickedImage)
                  return Alert.alert('Please upload an image');
            const member: Member = {
                  id: Auth.currentUser?.uid,
                  role: 'owner',
            }
            const newUid = uuid.v4().toString();
            const server: any = {

                  name: serverName,
                  image: pickedImage,
                  owner: Auth.currentUser?.uid,
                  invitedkey: uuid.v4().toString(),
                  channels: [],
            };
            dispatch(addServer(server));
      };

      return (
            <Modal visible={modalVisible} animationType="slide" transparent={true} >
                  <View className='items-center justify-center flex-1 bg-opacity-50'>
                        <View className='items-center pt-20 bg-[#313338] w-full h-full'>
                              <TouchableOpacity onPress={() => dispatch(setModalVisible(!modalVisible))}
                                    className='absolute top-2 right-2 z-1'>
                                    <CloseSquare size={24} className='text-white' />
                              </TouchableOpacity>
                              <Text className='text-xl font-extrabold text-center text-white'>
                                    Customize Your Server</Text>
                              <Text className='text-center text-white '>
                                    Give your new server a personality with a name and an icon. You can always change these later.</Text>
                              <View >
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
                                    <Text className='m-2 font-bold text-white uppercase'>Server Name</Text>
                                    <TextInput
                                          className='p-2 text-white bg-[#1E1F22] rounded-md'
                                          placeholder=""
                                          value={serverName}
                                          onChangeText={setServerName}
                                    />
                                    <Text className='m-2 text-[11px] text-white'>By creating a server, you agree to Discord's <Text className='text-blue-500'>Community Guidelines</Text> </Text>
                              </View>
                              <View className='flex-row justify-center w-full mt-4'>
                                    <TouchableOpacity onPress={handleCreateServer}>
                                          <Text className='px-10 py-2 text-white bg-[#5865F2] rounded-lg'>Create</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  </View>
            </Modal >
      );
}


export default ModalCreateServer