import { View, Text } from 'react-native'
import React from 'react'
import MessageIcon from '../svgIcons/MessageIcon'
import PlusIcon from '../svgIcons/PlusIcon'
function container() {
      return 'items-center justify-center w-10 h-10 rounded-full bg-[#2c2f33]'
}

const ServerNavbar = () => {
      return (
            <View className='w-1/5  h-full bg-[#23272a] items-center'>
                  <View className='items-center justify-center w-10 h-10 rounded-full bg-[#2c2f33] mb-2' >
                        <MessageIcon width={25} height={25} fill='white' />
                  </View>
                  <View className='items-center justify-center w-10 h-10 rounded-full bg-[#2c2f33] mb-2'>
                        <Text className='text-white'>1st</Text>
                  </View>
                  <View className='items-center justify-center w-10 h-10 rounded-full bg-[#2c2f33] mb-2'>
                        <Text className='text-white'>2nd</Text>
                  </View>
                  <View className='items-center justify-center w-10 h-10 rounded-full bg-[#2c2f33] mb-2'>
                        <Text className='text-white'>3rd</Text>
                  </View>
                  <View className='items-center justify-center w-10 h-10 rounded-full bg-[#2c2f33] mb-2'>
                        <PlusIcon width={25} height={25} fill='lightgreen' />
                  </View>

            </View>
      )
}

export default ServerNavbar