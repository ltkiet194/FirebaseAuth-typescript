import { Image, View } from 'react-native'
import React, { act, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MessageIcon from '../../svgIcons/MessageIcon'
import { Server } from '../../../models/Server';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers, fetchServers, setActiveServer } from '../../../store/serverSlice';
import { ActivityIndicator } from 'react-native-paper';
import { current } from '@reduxjs/toolkit';
import { fetchChannels, setChannels, setCurrentServer } from '../../../store/mainAppSlice';
import { CpuSetting } from 'iconsax-react-native';

const ServerList = () => {
      const currentServer = useSelector((state: any) => state.MainApp.currentServer);
      const isLoading = useSelector((state: any) => state.MainApp.isLoading);
      const servers = useSelector((state: any) => state.MainApp.servers);
      const dispatch = useDispatch<any>();
      const list = servers ? Array.from(servers.values()) : [];

      const handelChangeServer = async (section: any) => {
            await dispatch(setCurrentServer(section.id))
            if (section.id == currentServer) {
                  console.log('same server no need to fetch channels')
                  return
            }
            dispatch(fetchChannels(section.id))
      }
      return !isLoading ? (list.map((section: any) => (
            <View className='flex-row' key={section.id}>
                  {(currentServer == section.id)
                        ? <View className='w-1 mr-1 bg-white rounded-r-full h-14' />
                        : <View className='w-1 mr-1 rounded-r-full h-14' />
                  }
                  <TouchableOpacity
                        className='items-center justify-center w-14 h-14  rounded-full bg-[#2c2f33] mb-2'
                        onPress={() => handelChangeServer(section)}
                  >
                        {section.image ? (
                              <Image source={{ uri: section.image }} className='rounded-full w-14 h-14' />
                        ) : (
                              <MessageIcon width={30} height={30} fill="white" />
                        )}
                  </TouchableOpacity>
            </View>

      ))) : <ActivityIndicator size={40} />

}

export default ServerList