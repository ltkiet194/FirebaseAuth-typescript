import { View, Text, StyleSheet, StatusBar, Touchable } from 'react-native'
import React from 'react'
import { Headphone, Microphone, MicrophoneSlash, Setting, Setting2, Setting5 } from 'iconsax-react-native';
import Avatar from '../Custom/Avatar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChannelsList from '../Custom/ChannelsList';
import { Auth } from '../../firebase/firebase';

const ServerDetails = () => {
      return (
            <View className={`w-[67%] self-end h-[98%] bg-[#2c2f33]`}>
                  <ChannelsList />
                  <View style={styles.footer} className='absolute bottom-[5%] w-full'>
                        <View style={styles.userInfo}>
                              <View className='mx-2 w-15'>
                                    <Avatar alertOnline={true} isOnline />
                              </View>
                              <View>
                                    <Text className='text-white'>{Auth.currentUser?.displayName}</Text>
                                    <Text className='text-xs text-gray-400'>#0372</Text>
                              </View>
                        </View>
                        <View className='flex-row justify-end item-center'>
                              <TouchableOpacity>
                                    <MicrophoneSlash className='ml-1' size={20} color="grey" />
                              </TouchableOpacity>
                              <TouchableOpacity>
                                    <Headphone className='ml-1' size={20} color="grey" />
                              </TouchableOpacity>
                              <TouchableOpacity className='mr-1'>
                                    <Setting5 className='ml-1' size={20} color="grey" />
                              </TouchableOpacity>
                        </View>
                  </View>
            </View>

      )
}
const statusHeight = StatusBar.currentHeight;

const styles = StyleSheet.create({
      container: {
            flex: 1,
            flexDirection: 'row',
      },
      servers: {
            padding: 0,
            width: 75,
            backgroundColor: '#202225',
            paddingTop: statusHeight,
      },
      scroll: {
            alignItems: 'center',
            width: 75,
            padding: 0,
      },
      divider: {
            height: 3,
            width: '60%',
            backgroundColor: '#292b2f',
      },
      channels: {
            flex: 1,
            width: 150,
            paddingTop: statusHeight,
            backgroundColor: '#292b2f',
      },
      channels_header: {
            paddingHorizontal: 10,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
      },
      channels_body: {
            flex: 1,
            padding: 10,
            backgroundColor: '#2f3136',
      },
      channels_category: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
      },
      category_title: {
            fontSize: 14,
            textTransform: 'uppercase',
            color: 'grey',
            fontWeight: 'bold',
      },
      footer: {
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#292b2f',
            paddingRight: 10,
      },
      userInfo: {
            flexDirection: 'row',
            alignItems: 'center',
      },
      footer_icons: {
            width: 80,
            flexDirection: 'row',
            alignItems: 'center',

      },
});
export default ServerDetails