import { set } from 'firebase/database';
import { Add, Additem, PenAdd, ProfileAdd, Setting2, Tag } from 'iconsax-react-native';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, setActiveChannel, setMessages } from '../../store/serverSlice';
import { list } from 'firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { LIMIT_MESSAGES } from '../../constants/config';
interface Props {
      channel: any;
}

export default function Channel({ channel }: Props) {
      const ActiveChannel = useSelector((state: any) => state.server.ActiveChannel);
      const dispatch = useDispatch<any>();

      useEffect(() => {
            let unsubscribe: () => void;
            const listenToMessages = async () => {
                  if (ActiveChannel === channel) {
                        unsubscribe = firestore()
                              .collection('channels').doc(ActiveChannel.uid).collection('buckets')
                              .orderBy('timeStamp', 'desc').limit(LIMIT_MESSAGES)
                              .onSnapshot(querySnapshot => {
                                    const messages: any = []
                                    querySnapshot.forEach((documentSnapshot): any => {
                                          messages.push(documentSnapshot.data());
                                    });
                                    dispatch(setMessages(messages));
                              });
                  }
            };
            listenToMessages();
            return () => {
                  if (unsubscribe) {
                        unsubscribe();
                  }
            };
      }, [ActiveChannel, dispatch]);

      const handleSelectChannel = async (channel: any) => {
            if (ActiveChannel === channel) {
                  return;
            }
            await dispatch(setActiveChannel(channel));
            dispatch(fetchChannels({ channel }));
      };
      return (
            <View className='flex-row justify-between py-1 pl-2 pr-1 my-1 mt-1 rounded-md'
                  style={{ backgroundColor: ActiveChannel == channel ? '#393d42' : 'transparent' }}>
                  <View className='w-[70%]'>
                        <TouchableOpacity className='flex-row'
                              onPress={() => handleSelectChannel(channel)}
                        >
                              <Tag size={20} color="white" />
                              <Text className='ml-1 text-xs font-bold text-white uppercase'>{channel.name}</Text>
                        </TouchableOpacity>
                  </View>
                  <View className='flex-row justify-between w-10 -mr-4'>
                        <Setting2 size={18} color="white" />
                  </View>
            </View>
      );
}

