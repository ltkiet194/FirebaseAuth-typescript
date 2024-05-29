
import { View, Text, Modal, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModalGenerateKey, setModalVisibleFindServer } from '../../../store/modalSlice';
import { CloseSquare, Copy, Refresh, Refresh2, RefreshCircle, Send, } from 'iconsax-react-native';
import uuid from 'react-native-uuid';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger, } from "react-native-popup-menu";

const ModalInviteFriend = () => {
      const dispatch = useDispatch<any>();
      const modalVisible = useSelector((state: any) => state.modal.modalGenerateKey);
      const currentServer = useSelector((state: any) => state.MainApp.currentServer);
      const Servers = useSelector((state: any) => state.MainApp.servers);
      const [values, setValues]: any = useState({ keyGenerate: '' });
      const ActiveServer = currentServer ? Servers.get(currentServer) : {};
      const updateInputval = (val: any, key: any) => {
            const value: any = { ...values };
            value[key] = val;
            setValues({ ...value })
      };
      const RandomKey = () => {
            const key = uuid.v4().toString();
            updateInputval(key, 'keyGenerate');
      };
      useEffect(() => {
            RandomKey();
      }, [modalVisible]);
      return (
            <Modal visible={modalVisible} animationType="slide" transparent={true} >

                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                        className='items-center justify-center flex-1 bg-black'>
                        <View className='items-center bg-[#313338] w-[90%] h-[35%] rounded-2xl'>
                              <TouchableOpacity onPress={() => dispatch(setModalGenerateKey(false))}
                                    className='absolute top-2 right-2 z-1'>
                                    <CloseSquare size={24} className='text-white' />
                              </TouchableOpacity>
                              <View className='w-full px-4 mt-2'>
                                    <Text className='m-2 font-bold text-white uppercase'>Generate Code Invite</Text>
                                    <View className='flex-row items-center'>
                                          <View className=' bg-[#1E1F22] rounded-md w-full flex-row py-1 items-baseline'>
                                                <Text
                                                      className='p-1 text-lg text-white'
                                                >
                                                      {ActiveServer.invitedkey}
                                                </Text>
                                          </View>
                                    </View>
                                    <Text className='m-2 text-[11px] text-white'>
                                          By copy this code, you can share with your friend to join this server.
                                          <Text className='mx-1 text-blue-500'> {' Good Luck!'}</Text>
                                    </Text>

                                    <View className='flex-row justify-center gap-5 p-2 item-center'>
                                          <TouchableOpacity >
                                                <Copy size={35} color='white' className='mx-2' />
                                          </TouchableOpacity>
                                          <TouchableOpacity>
                                                <RefreshCircle size={35} color='white' className='mx-2' />
                                          </TouchableOpacity>
                                    </View>
                              </View>
                        </View>
                  </View>
            </Modal>
      )
}
const styles = StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
            flexDirection: "column",
      },
});
export default ModalInviteFriend


