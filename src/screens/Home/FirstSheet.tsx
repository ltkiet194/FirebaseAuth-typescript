import { View, Text } from 'react-native'
import React from 'react'
import ServerNavbar from '../../components/FirstSheet/ServerNavbar'
import ServerDetails from '../../components/FirstSheet/ServerDetails'

const FirstSheet = () => {
      return (
            <View className='flex-row w-full h-full bg-[#2c2f33]'>
                  <ServerNavbar />
                  <ServerDetails />
            </View>
      )
}

export default FirstSheet