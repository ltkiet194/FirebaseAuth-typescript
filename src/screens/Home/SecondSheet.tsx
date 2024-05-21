import { View, Text, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Gesture, PanGestureHandler, ScrollView } from 'react-native-gesture-handler'

import HamBurgerIcon from '../../components/svgIcons/HamburgerIcon'
import UsersIcon from '../../components/svgIcons/UsersIcon'
import SearchIcon from '../../components/svgIcons/SearchIcon'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { END_WIDTH, START_WIDTH, WIDTH } from '../../constants/config'
import Message from '../../components/Custom/Message'
import ModalCreateServer from '../../components/Custom/ModalCreateServer'
import Input from '../../components/Custom/Input'
import { Scroll } from 'iconsax-react-native'
const { width } = Dimensions.get('window')
const INITIAL_TRANSLATE_X = 0.87 * width;

interface Props {
      sheetAnimVal: any;
      activeSheet: any;
}

const SecondSheet = (props: Props) => {
      const { sheetAnimVal, activeSheet } = props;
      useEffect(() => {
            sheetAnimVal.value = INITIAL_TRANSLATE_X;
      }, []);
      const animatedStyle = useAnimatedStyle(() => {
            return {
                  transform: [{ translateX: sheetAnimVal.value }],
            };
      });
      const handleGesture = useAnimatedGestureHandler({
            onStart: (_, ctx) => {
                  ctx.x = sheetAnimVal.value;
            },
            onActive: (event, ctx: any) => {
                  sheetAnimVal.value = event.translationX + ctx.x;
            },
            onEnd: (event, ctx) => {
                  if (
                        (activeSheet.value === 1 && event.translationX > 0) ||
                        (activeSheet.value === 3 && event.translationX < 0)
                  ) {
                        sheetAnimVal.value = ctx.x;
                  } else if (event.absoluteX > WIDTH / 2 && activeSheet.value === 2) {
                        sheetAnimVal.value = withTiming(START_WIDTH);
                        activeSheet.value = 1;
                  } else if (event.translationX < -WIDTH / 2 && activeSheet.value === 2) {
                        sheetAnimVal.value = withTiming(END_WIDTH);
                        activeSheet.value = 3;
                  } else if (activeSheet !== 2) {
                        sheetAnimVal.value = withTiming(0);
                        activeSheet.value = 2;
                  }
            },

      });
      return (
            <PanGestureHandler onGestureEvent={handleGesture}>
                  <Animated.View className={`absolute w-full h-full bg-[#2c2f33]`} style={animatedStyle}>
                        <View className='items-center justify-center w-full h-12 bg-[#23272a]'>
                              <View className='w-[90%] rounded-full flex-row justify-between item-center ' >
                                    <Text className='text-lg font-semibold text-white'># general</Text>
                                    <View className='flex-row'>
                                          <SearchIcon width={20} height={20} fill='white' />
                                          <UsersIcon width={20} height={20} fill='white' className='ml-5' />
                                    </View>
                              </View>
                        </View>
                        <ScrollView className='w-full h-[90%]'>
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                              <Message text='Hello World' />
                        </ScrollView>
                        <View className='items-center justify-center w-full h-12 bg-[#23272a]'>
                              <View className='absolute w-full bottom-1'>
                                    <Input />
                              </View>
                        </View>
                  </Animated.View>
            </PanGestureHandler >
      )
}

export default SecondSheet