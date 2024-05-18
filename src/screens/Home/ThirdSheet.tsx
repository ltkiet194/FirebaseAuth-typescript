import { View, Text, Dimensions, StyleSheet, } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import Animated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler';
import { START_WIDTH } from '../../constants/config';
interface Props {
      sheetAnimVal: any;
      activeSheet: any
}


const ThirdSheet = (props: Props) => {
      const { sheetAnimVal, activeSheet } = props;
      const { width } = Dimensions.get('window')

      const animatedStyle = useAnimatedStyle(() => {
            return {
                  transform: [
                        {
                              translateX: interpolate(
                                    sheetAnimVal.value,
                                    [(-width * 82) / 100, 0, (width * 82) / 100],
                                    [0, 0, (width * 80) / 100],
                                    Extrapolate.CLAMP,
                              ),
                        },
                  ],
            };
      });
      const handleGesture = useAnimatedGestureHandler({
            onStart: (_, ctx) => {
                  ctx.x = sheetAnimVal.value
            },
            onActive: (event, ctx: any) => {
                  if (event.translationX > 0) {
                        sheetAnimVal.value = event.translationX + ctx.x
                  }
            },
            onEnd: (event, ctx: any) => {
                  if (event.translationX > START_WIDTH / 2) {
                        sheetAnimVal.value = withTiming(1);
                        activeSheet.value = 2;
                  } else {
                        sheetAnimVal.value = withTiming(ctx.x);
                        activeSheet.value = 3;
                  }
            },
      });

      return (
            <PanGestureHandler onGestureEvent={handleGesture}>
                  <Animated.View className='absolute items-center justify-center w-full h-full'
                        style={animatedStyle}>
                        <View className='w-4/5 self-end h-[98%] bg-[#2c2f33]' >
                              <Text>ThirdSheet</Text>
                        </View>
                  </Animated.View>
            </PanGestureHandler>

      )
}

export default ThirdSheet
