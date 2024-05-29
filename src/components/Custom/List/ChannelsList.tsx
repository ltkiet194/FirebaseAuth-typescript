import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { AddCircle, Setting5 } from 'iconsax-react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Channel from '../Channel';
import { setModalGenerateKey, setModalVisibleAddChannel } from '../../../store/modalSlice';
import { ActivityIndicator } from 'react-native-paper';
import ModalInviteFriend from '../Modal/ModalInviteFriend';

const statusHeight = StatusBar.currentHeight;

const ChannelsList = () => {
      const currentServer = useSelector((state: any) => state.MainApp.currentServer);
      const isLoading = useSelector((state: any) => state.MainApp.isFetchChannels);
      const servers = useSelector((state: any) => state.MainApp.servers);
      const dispatch = useDispatch<any>();
      const modalVisible = useSelector((state: any) => state.modal.modalVisibleAddChannel);
      const ActiveServer: any = currentServer ? servers.get(currentServer) : {};

      const listChannels = useSelector((state: any) => state.MainApp.channels);
      const renderChannels = () => {
            if (!listChannels) {
                  return <ActivityIndicator size={10} />
            }
            const channels = Array.from(listChannels.values());
            return channels.map((channel: any) => (
                  <View key={channel.uid}>
                        <View className=''>
                              <Channel channel={channel} />
                        </View>
                  </View>
            ));
      };

      return (
            <View className='flex-1 w-full '>
                  <View className='flex-row justify-between m-2'>
                        {currentServer ? (
                              <>
                                    <Text className='font-bold text-white'>
                                          {ActiveServer.name}
                                    </Text>
                                    <View className='flex-row '>
                                          <TouchableOpacity onPress={() => dispatch(setModalGenerateKey(true))}>
                                                <Setting5 size={20} color="white" />
                                          </TouchableOpacity>
                                    </View>
                              </>
                        ) : (
                              <View className='self-center'>
                                    <Text className='font-bold text-white'>No Server was chosen </Text>
                              </View>
                        )}
                  </View>
                  {ActiveServer ? (
                        <View className='flex-row justify-between'>
                              <Text className='mx-2 text-[12px] font-bold text-white uppercase mb-2'>
                                    text channels</Text>
                              <TouchableOpacity className='mr-2' onPress={() => dispatch(setModalVisibleAddChannel(!modalVisible))}>
                                    <AddCircle size={22} color="white" />
                              </TouchableOpacity>
                        </View>
                  ) : (
                        <ActivityIndicator size={50} />
                  )}
                  {isLoading == false ? (<ScrollView className='max-h-[79%]'>
                        {renderChannels()}
                  </ScrollView>) : <ActivityIndicator size={20} />
                  }
            </View>

      );
};

export default ChannelsList;
