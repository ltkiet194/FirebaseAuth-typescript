import React from 'react'
import ServerNavbar from '../../components/FirstSheet/ServerNavbar'
import ServerDetails from '../../components/FirstSheet/ServerDetails'
import Animated, { useAnimatedGestureHandler, withTiming } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import { START_WIDTH } from '../../constants/config'
import { Headphone, Microphone, Setting } from 'iconsax-react-native'
import Avatar from '../../components/Custom/Avatar'
interface Props {
      sheetAnimVal: any
      activeSheet: any
}
const FirstSheet = (props: Props) => {
      const { width } = Dimensions.get('window')
      const { sheetAnimVal, activeSheet } = props;
      const handleGesture = useAnimatedGestureHandler({
            onStart: (_, ctx) => {
                  ctx.x = sheetAnimVal.value;
            },
            onActive: (event, ctx: any) => {
                  if (event.translationX < 0) {
                        sheetAnimVal.value = event.translationX + ctx.x;
                  }
            },
            onEnd: (event, ctx: any) => {
                  if (event.translationX < START_WIDTH / 2) {
                        sheetAnimVal.value = withTiming(1);
                        activeSheet.value = 2;
                  } else {
                        sheetAnimVal.value = withTiming(ctx.x);
                        activeSheet.value = 1;
                  }
            },
      });

      return (
            <PanGestureHandler onGestureEvent={handleGesture}>
                  <Animated.View className='flex-row w-full h-[98%] bg-[#23272a]'>
                        <ServerNavbar />
                        <ServerDetails />
                  </Animated.View>
            </PanGestureHandler>

      )
}

export default FirstSheet