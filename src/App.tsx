import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { MyContextControllerProvider } from '../src/context/index'
import Login from '../src/screens/Spa/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Router from '../src/screens/Spa/Router';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const Stack = createNativeStackNavigator();


const App = () => {
  useEffect(() => {
    //initial()
  }, [])
  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router></Router>
      </NavigationContainer>
    </MyContextControllerProvider>

  )
}

export default App