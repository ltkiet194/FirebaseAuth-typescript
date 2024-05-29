import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addChannel, setModalVisibleAddChannel } from '../../../store/modalSlice';
import { CloseSquare } from 'iconsax-react-native';

const ModalAddChannel = () => {
      const dispatch = useDispatch<any>();
      const modalVisible = useSelector((state: any) => state.modal.modalAddChannel);
      const [channelName, setChannelName]: any = useState(``);
      const currentServer = useSelector((state: any) => state.MainApp.currentServer);
      const Servers = useSelector((state: any) => state.MainApp.servers);

      const ActiveServer = Servers && currentServer ? Servers.get(currentServer) : null;
      const paraAddChannel = {
            Server: ActiveServer,
            channelName: channelName
      }
      return (
            <Modal visible={modalVisible} animationType="slide" transparent={true} >
                  <View className='items-center justify-center flex-1 bg-opacity-50'>
                        <View className='items-center pt-20 bg-[#313338] w-full h-full'>
                              <TouchableOpacity onPress={() => dispatch(setModalVisibleAddChannel(!modalVisible))}
                                    className='absolute top-2 right-2 z-1'>
                                    <CloseSquare size={24} className='text-white' />
                              </TouchableOpacity>
                              <Text className='text-xl font-extrabold text-center text-white'>
                                    Customize Your Server</Text>
                              <View className='w-full p-2'>
                                    <Text className='m-2 font-bold text-white uppercase'>Channel name</Text>
                                    <TextInput
                                          placeholderTextColor={'#8A8D90'}
                                          className='p-2 text-white bg-[#1E1F22] rounded-md'
                                          placeholder="Create a channel name"
                                          value={channelName}
                                          onChangeText={setChannelName}
                                    />
                                    <Text className='m-2 text-[11px] text-white'>By channel a server, you agree to Discord's <Text className='text-blue-500'>Community Guidelines</Text> </Text>
                              </View>
                              <View className='flex-row justify-center w-full mt-4'>
                                    <TouchableOpacity onPress={() => { dispatch(addChannel(paraAddChannel)) }}>
                                          <Text className='px-10 py-2 text-white bg-[#5865F2] rounded-lg'>Create</Text>
                                    </TouchableOpacity>
                              </View>
                        </View>
                  </View>
            </Modal >
      )
}
export default ModalAddChannel