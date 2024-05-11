import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Router from './routers/Router';

const App = () => {
  return (
    <>
      <SafeAreaView className='flex-1 bg-white'>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;