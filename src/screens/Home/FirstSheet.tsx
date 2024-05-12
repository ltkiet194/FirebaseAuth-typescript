import { View, Text } from 'react-native'
import React from 'react'
import ServerNavbar from '../../components/FirstSheet/ServerNavbar'
import ServerDetails from '../../components/FirstSheet/ServerDetails'

const FirstSheet = () => {
      return (
            <View className='flex-row w-full h-[98%] bg-[#23272a]'>
                  <ServerNavbar />
                  <ServerDetails />
            </View>
      )
}

export default FirstSheet