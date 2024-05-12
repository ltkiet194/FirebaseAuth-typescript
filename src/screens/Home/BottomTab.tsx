import { View, Text } from 'react-native'
import React from 'react'
import DiscordIcon from '../../components/svgIcons/DiscordIcon'
import RaiseHandIcon from '../../components/svgIcons/RaiseHandIcon'
import SearchIcon from '../../components/svgIcons/SearchIcon'
import DiscordRound from '../../components/svgIcons/DiscordRound'

const BottomTab = () => {
      return (
            <View className='absolute bottom-0 flex-row w-full h-12 bg-black'>
                  <View className='items-center justify-center flex-1'>
                        <DiscordIcon width={25} height={25} fill='white' />
                  </View>
                  <View className='items-center justify-center flex-1'>
                        <RaiseHandIcon width={25} height={25} fill='white' />
                  </View>
                  <View className='items-center justify-center flex-1'>
                        <SearchIcon width={25} height={25} fill='white' />
                  </View>
                  <View className='items-center justify-center flex-1'>
                        <Text className='font-sans text-xl font-extrabold text-white'>@</Text>
                  </View>
                  <View className='items-center justify-center flex-1'>
                        <DiscordRound width={25} height={25} fill='white' />
                  </View>
            </View>
      )
}

export default BottomTab