import { Add, Additem, PenAdd, ProfileAdd, Setting2, Tag } from 'iconsax-react-native';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Channel({ name, selected }: any) {
      return (
            <View className='flex-row items-center justify-between pl-2 pr-1 mt-1 rounded-md h-7'
                  style={{ backgroundColor: selected ? '#393d42' : 'transparent' }}>
                  <View className='flex-row items-center justify-center'>
                        <Tag size={18} color="white" />
                        <Text className='ml-1 text-xs font-bold text-white uppercase'>{name}</Text>
                  </View>
                  <View className='flex-row justify-between w-10'>
                        <ProfileAdd size={18} color="white" />
                        <Setting2 size={18} color="white" />
                  </View>
            </View>
      );
}

