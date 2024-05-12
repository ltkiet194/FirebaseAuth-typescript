import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import HamBurgerIcon from '../../components/svgIcons/HamburgerIcon'
import UsersIcon from '../../components/svgIcons/UsersIcon'
import SearchIcon from '../../components/svgIcons/SearchIcon'

const { width } = Dimensions.get('window')



const SecondSheet = () => {
      return (
            <View className={`absolute w-full h-full bg-[#2c2f33]`}
            >
                  <View className='items-center justify-center w-full h-12 bg-[#23272a]'>
                        <View className='w-[90%] rounded-full flex-row justify-between item-center ' >
                              <HamBurgerIcon width={20} height={20} fill='white' />
                              <View className='flex-row'>
                                    <SearchIcon width={20} height={20} fill='white' />
                                    <UsersIcon width={20} height={20} fill='white' className='ml-5' />
                              </View>
                        </View>
                  </View>
                  <Text>SecondSheet</Text>
            </View>
      )
}

export default SecondSheet