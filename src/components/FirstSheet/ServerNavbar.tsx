import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import MessageIcon from '../svgIcons/MessageIcon'
import PlusIcon from '../svgIcons/PlusIcon'
import { ScrollView } from 'react-native-gesture-handler'

import firestore from '@react-native-firebase/firestore'
import { Image } from 'react-native'
function container() {
      return 'items-center justify-center w-10 h-10 rounded-full bg-[#2c2f33]'
}
const ServerNavbar = () => {
      return (
            <View className='w-1/5  h-[98%] bg-[#23272a] items-center self-end'>
                  <ScrollView>
                        <TouchableOpacity className='items-center justify-center w-12 h-12 rounded-full bg-[#2c2f33] mb-2' >
                              <MessageIcon width={25} height={25} fill='white' />
                        </TouchableOpacity>
                        <TouchableOpacity className='items-center justify-center w-12 h-12 rounded-full bg-[#2c2f33] mb-2'>
                              <Text className='text-white'>3rd</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                              className='items-center justify-center w-12 h-12 rounded-full bg-[#2c2f33] mb-2'>
                              <Image source={{ uri: 'https://i.imgur.com/AL1cQPH.jpeg' }} className='w-12 h-12 rounded-lg' />
                        </TouchableOpacity>
                        <TouchableOpacity className='items-center justify-center w-12 h-12 rounded-full bg-[#2c2f33] mb-2'>
                              <PlusIcon width={25} height={25} fill='lightgreen' />
                        </TouchableOpacity>
                  </ScrollView>
            </View>
      )
}

export default ServerNavbar