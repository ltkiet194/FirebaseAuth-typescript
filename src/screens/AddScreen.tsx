import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SectionComponent from '../components/SectionComponent'
import { Element4, Notification } from 'iconsax-react-native'
import RowComponent from '../components/RowComponent'
import Container from '../components/Container'

const AddScreen = ({ navigation }: any) => {
      return (
            <Container>
                  <SectionComponent>
                        <RowComponent styled='flex-row justify-between text-white item-center p-2'>
                              <TouchableOpacity className='items-center justify-center w-1/6 m-1 bg-white rounded-sm' onPress={() => navigation.navigate('HomeScreen')}>
                                    <Element4 size={20} color={'white'} />
                              </TouchableOpacity>
                              <Notification size={20} color={'white'} />
                        </RowComponent>
                  </SectionComponent>
            </Container>
      )
}

export default AddScreen