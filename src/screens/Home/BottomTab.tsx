import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import DiscordIcon from '../../components/svgIcons/DiscordIcon'
import RaiseHandIcon from '../../components/svgIcons/RaiseHandIcon'
import SearchIcon from '../../components/svgIcons/SearchIcon'
import DiscordRound from '../../components/svgIcons/DiscordRound'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import auth from '@react-native-firebase/auth'

interface Props {
      sheetAnimVal: any
}
const BottomTab = (props: Props) => {
      const { width } = Dimensions.get('window')
      const { sheetAnimVal } = props;
      const animatedStyle = useAnimatedStyle(() => {
            return {
                  transform: [{
                        translateY: interpolate(
                              sheetAnimVal.value,
                              [(-width * 82) / 100, 0, (width * 82) / 100],
                              [60, 60, 0])
                  }],
            };
      });
      return (
            <Animated.View className='absolute bottom-0 flex-row w-full h-12 bg-black' style={animatedStyle}>
                  <TouchableOpacity className='items-center justify-center flex-1'>
                        <DiscordIcon width={25} height={25} fill='white' />
                  </TouchableOpacity>
                  <TouchableOpacity className='items-center justify-center flex-1'>
                        <RaiseHandIcon width={25} height={25} fill='white' />
                  </TouchableOpacity>
                  <TouchableOpacity className='items-center justify-center flex-1'>
                        <SearchIcon width={25} height={25} fill='white' />
                  </TouchableOpacity>
                  <TouchableOpacity className='items-center justify-center flex-1'>
                        <Text className='font-sans text-xl font-extrabold text-white'>@</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={async () => await auth().signOut()}
                        className='items-center justify-center flex-1'>
                        <DiscordRound width={25} height={25} fill='white' />
                  </TouchableOpacity>
            </Animated.View>
      )
}
export default BottomTab