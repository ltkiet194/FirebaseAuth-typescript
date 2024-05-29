import { View, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { colors } from '../../constants/colors'
import FirstSheet from '../Home/FirstSheet'
import ThirdSheet from '../Home/ThirdSheet'
import SecondSheet from '../Home/SecondSheet'
import BottomTab from '../Home/BottomTab'
import ModalAddChannel from '../../components/Custom/Modal/ModalAddChannel'
import ModalCreateServer from '../../components/Custom/Modal/ModalCreateServer'
import { useSharedValue } from 'react-native-reanimated'
import ModalAccount from '../../components/Custom/Modal/ModalAccount'
import ModalFindServer from '../../components/Custom/Modal/ModalFindServer'
import ModalInviteFriend from '../../components/Custom/Modal/ModalInviteFriend'

const MainPage = () => {
      const sheetAnimVal = useSharedValue(0);
      const activeSheet = useSharedValue(1);
      return (
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.sheetColor }}>
                  <View className='w-full h-full '>
                        <FirstSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
                        <ThirdSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
                        <SecondSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
                        <BottomTab sheetAnimVal={sheetAnimVal} />
                        <ModalCreateServer />
                        <ModalAddChannel />
                        <ModalAccount />
                        <ModalInviteFriend />
                        <ModalFindServer />
                  </View>
            </GestureHandlerRootView>
      )
}

export default MainPage