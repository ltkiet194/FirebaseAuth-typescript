import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Router from './routers/Router';
import FirstSheet from './screens/Home/FirstSheet';
import SecondSheet from './screens/Home/SecondSheet';
import ThirdSheet from './screens/Home/ThirdSheet';
import BottomTab from './screens/Home/BottomTab';

const App = () => {
  return (
    <>
      {/* <SafeAreaView className='flex-1 bg-white'>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </SafeAreaView> */
      }

      <View className='w-full h-full '>
        <FirstSheet />
        <SecondSheet />
        <ThirdSheet />
        <BottomTab />
      </View>

    </>
  );
};

export default App;