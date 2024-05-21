import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import MessageIcon from '../svgIcons/MessageIcon'
import PlusIcon from '../svgIcons/PlusIcon'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setModalVisible } from '../../store/modalSlice'
import ServerList from '../Custom/ServerList'
//@ts-ignore


const ServerNavbar = () => {
      const dispatch = useDispatch<any>();
      const modalVisible = useSelector((state: any) => state.modal.modalVisible);
      return (
            <View className='w-[18%] h-[98%] bg-[#23272a] items-center self-end'>
                  <TouchableOpacity onPress={() => dispatch(setModalVisible(!modalVisible))}
                        className='items-center justify-center w-11 h-11 rounded-full bg-[#2c2f33] mb-2'>
                        <PlusIcon width={25} height={25} fill='lightgreen' />
                  </TouchableOpacity>
                  <ScrollView className='h-[90%]' showsVerticalScrollIndicator={false}>
                        <ServerList />
                  </ScrollView>
                  <View className='h-[7%]'>
                  </View>
            </View>
      )
}

export default ServerNavbar