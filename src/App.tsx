import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Router from './routers/Router';
import FirstSheet from './screens/Home/FirstSheet';
import SecondSheet from './screens/Home/SecondSheet';
import ThirdSheet from './screens/Home/ThirdSheet';
import BottomTab from './screens/Home/BottomTab';
import { colors } from './constants/colors';
import { useSharedValue } from 'react-native-reanimated';

const App = () => {
  const sheetAnimVal = useSharedValue(0);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.sheetColor} />
      <View className='w-full h-full '>
        <FirstSheet />
        <ThirdSheet />
        <SecondSheet />
        <BottomTab />
      </View>
    </>
  );
};

export default App;