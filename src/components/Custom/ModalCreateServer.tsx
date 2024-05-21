import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Button, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addServer, setModalVisible, setPickedImage } from '../../store/modalSlice';
import { Camera, CloseSquare } from 'iconsax-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Auth } from '../../firebase/firebase';
import { Channel, Member, Server } from '../../models/Server';


interface Props {
      onPress?: () => void;
}
const ModalCreateServer = (props: Props) => {

      const dispatch = useDispatch<any>();
      const modalVisible = useSelector((state: any) => state.modal.modalVisible);
      const pickedImage = useSelector((state: any) => state.modal.pickedImage);
      const infoUser = useSelector((state: any) => state.user.infoUser);

      const [serverName, setServerName] = useState(``);

      const pickImage = () => {
            ImagePicker.openPicker({ width: 300, height: 300, cropping: true })
                  .then(image => {
                        dispatch(setPickedImage(image.path));
                        console.log(image);
                  })
                  .catch(error => {
                        console.log('Error:', error);
                  });
      };
      useEffect(() => {
            if (infoUser) {
                  setServerName(`${infoUser.name}'s Server`);
            }
      }, [infoUser]);

      const handleCreateServer = () => {
            if (!serverName)
                  return Alert.alert('Please enter a server name');
            else if (!pickedImage)
                  return Alert.alert('Please upload an image');
            const member: Member = {
                  id: Auth.currentUser?.uid,
                  role: 'owner',
            }
            const channel: Channel = {
                  name: 'general',
            }
            const server: Server = {
                  id: new Date().toISOString(),
                  name: serverName,
                  image: pickedImage,
                  owner: Auth.currentUser?.uid,
                  members: [member],
                  channels: [channel],
            };
            dispatch(addServer(server));
      };

      return (
            <Modal visible={modalVisible} animationType="slide" transparent={true} >
                  <View style={styles.modalOverlay} className='items-center flex-1 '>
                        <View style={styles.modalContent} className='items-center pt-20 bg-[#313338]'>
                              <TouchableOpacity onPress={() => dispatch(setModalVisible(!modalVisible))}
                                    style={styles.closeButton} >
                                    <CloseSquare size={24} className='text-white' />
                              </TouchableOpacity>
                              <Text className='text-xl font-extrabold text-center text-white'>Customize Your Server</Text>
                              <Text className='text-center text-white '>
                                    Give your new server a personality with a name and an icon. You can always change these later.</Text>
                              <View >
                                    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}
                                          className='relative w-20 h-20 mx-6 my-3'>
                                          {pickedImage ? (
                                                <Image source={{ uri: pickedImage }} style={styles.image} />
                                          ) : (
                                                <>
                                                      <Camera size={24} className='text-white' />
                                                      <Text className='text-white'>Upload</Text>
                                                </>
                                          )}
                                    </TouchableOpacity>
                              </View>
                              <View className='w-full'>
                                    <Text className='m-2 font-bold text-white uppercase'>Server Name</Text>
                                    <TextInput
                                          className='p-2 text-white bg-[#1E1F22] rounded-md '
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
            </Modal>
      );
}

const styles = StyleSheet.create({
      modalOverlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
            padding: 10,
            width: '100%',
            height: '100%',
      },
      closeButton: {
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
      },
      title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
      },
      input: {
            borderBottomWidth: 1,
            marginBottom: 10,
            padding: 5,
      }, plusIcon: {
            position: 'absolute',
            top: 0,
            right: 0,
            borderRadius: 50, // to make it round
            padding: 4, // adjust padding as needed
      },
      imagePicker: {
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: '#ccc',
            borderRadius: 999,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
      },
      image: {
            width: 100,
            height: 100,
            borderRadius: 5,
      },
      buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
      },
});

export default ModalCreateServer