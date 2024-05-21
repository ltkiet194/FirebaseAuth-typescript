import { View, Text, StyleSheet, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { Add, More } from 'iconsax-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Channel from './Channel';
import { fetchServers } from '../../store/serverSlice';
import { Server } from '../../models/Server';

const statusHeight = StatusBar.currentHeight;

const ChannelsList = () => {
      const dispatch = useDispatch<any>();

      useEffect(() => {
            const waitFetch = async () => {
                  dispatch(fetchServers());
            };
            waitFetch();
      }, [dispatch]);

      const ActiveServer: Server = useSelector((state: any) => state.server.ActiveServer);

      const renderChannels = () => {
            if (!ActiveServer || !ActiveServer.channels) {
                  return null;
            }
            return ActiveServer.channels.map((channel: any, index: number) => (
                  <View key={index}>

                        <View>
                              <Channel name={channel.name} selected={channel.selected} />
                        </View>
                  </View>
            ));
      };

      return (
            <View className='flex-1 w-full'>
                  <View className='flex-row justify-between m-2'>
                        {ActiveServer ? (
                              <>

                                    <Text className='font-bold text-white'>
                                          {ActiveServer.name}
                                    </Text>
                                    <TouchableOpacity>
                                          <More size={24} color="white" />
                                    </TouchableOpacity>
                              </>
                        ) : (
                              <Text className='font-bold text-white'>
                                    Loading...
                              </Text>
                        )}
                  </View>
                  <View className='flex-row justify-between'>
                        <Text className='mx-2 text-[12px] font-bold text-white uppercase'>
                              text channels</Text>
                        <Add size={22} color="grey" />
                  </View>
                  {renderChannels()}
            </View>
      );
};

export default ChannelsList;
