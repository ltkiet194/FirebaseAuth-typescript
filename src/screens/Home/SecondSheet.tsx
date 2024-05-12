import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')
const SecondSheet = () => {
      return (
            <View className={`absolute w-full h-full self-end bg-[#2c2f33] translate-x-[${width * 0.85}]`}>
                  <Text>SecondSheet</Text>
            </View>
      )
}

export default SecondSheet