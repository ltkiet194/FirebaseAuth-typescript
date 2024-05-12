import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
const { width } = Dimensions.get('window')


const ThirdSheet = () => {
      return (
            <View className='absolute items-center justify-center w-full h-full'
            // style={{ transform: [{ translateX: - width * 0.83 }] }}
            >
                  <View className='w-4/5 self-end h-[98%] bg-[#2c2f33]' >
                        <Text>ThirdSheet</Text>
                  </View>
            </View>
      )
}

export default ThirdSheet
