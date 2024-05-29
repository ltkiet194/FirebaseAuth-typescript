import { View, Text, Modal, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { joinUserToServer, setModalVisibleFindServer } from '../../../store/modalSlice';
import { CloseSquare, Send, } from 'iconsax-react-native';


const ModalFindServer = () => {
      const dispatch = useDispatch<any>();
      const modalVisible = useSelector((state: any) => state.modal.modalFindServer);
      const currentServer = useSelector((state: any) => state.MainApp.currentServer);
      const Servers = useSelector((state: any) => state.MainApp.servers);
      const [values, setValues]: any = useState({ keyJoin: '' });

      const updateInputval = (val: any, key: any) => {
            const value: any = { ...values };
            value[key] = val;
            setValues({ ...value })

      };
      const handleJoinServer = async () => {
            if (!values.keyJoin || values.keyJoin.length < 10)
                  return Alert.alert('Please enter a key', values.keyJoin);
            else {
                  await dispatch(joinUserToServer(values.keyJoin))
                  await dispatch(setModalVisibleFindServer(!modalVisible))
                  updateInputval('', 'keyJoin')
                  return Alert.alert('Join Server Success');
            }
      }
      return (
            <Modal visible={modalVisible} animationType="slide" transparent={true} >
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                        className='items-center justify-center flex-1 bg-black'>
                        <View className='items-center bg-[#313338] w-[90%] h-[35%] rounded-2xl justify-center'>
                              <TouchableOpacity onPress={() => dispatch(setModalVisibleFindServer(!modalVisible))}
                                    className='absolute top-2 right-2 z-1'>
                                    <CloseSquare size={24} className='text-white' />
                              </TouchableOpacity>
                              <View className='w-full px-4 -m-5'>
                                    <Text className='m-2 font-bold text-white uppercase'>Enter Key</Text>
                                    <View className='flex-row items-center'>
                                          <TextInput
                                                placeholderTextColor={'#8A8D90'}
                                                className='p-2 text-white bg-[#1E1F22] rounded-md w-[88%]'
                                                placeholder="Enter the Code to join the server"
                                                value={values.keyJoin}
                                                onChangeText={(text) => updateInputval(text, 'keyJoin')}
                                          />
                                          <TouchableOpacity onPress={handleJoinServer}>
                                                <Send size={24} color='white' className='mx-4 ' />
                                          </TouchableOpacity>
                                    </View>
                              </View>
                        </View>
                  </View>
            </Modal>
      )
}

export default ModalFindServer