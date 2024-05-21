import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth'
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FirstSheet from '../screens/Home/FirstSheet';
import ThirdSheet from '../screens/Home/ThirdSheet';
import { SafeAreaView, StatusBar, View } from 'react-native';
import SecondSheet from '../screens/Home/SecondSheet';
import BottomTab from '../screens/Home/BottomTab';
import { colors } from '../constants/colors';
import { NavigationContainer } from '@react-navigation/native';
import ModalCreateServer from '../components/Custom/ModalCreateServer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/userSlice';
import { Auth } from '../firebase/firebase';


const Router = () => {

      const Stack = createNativeStackNavigator();
      const [isLogin, setIsLogin] = useState(false);
      const sheetAnimVal = useSharedValue(0);
      const activeSheet = useSharedValue(1);
      const dispatch = useDispatch<any>();
      useEffect(() => {
            dispatch(getUser(Auth.currentUser?.uid));
            auth().onAuthStateChanged((user) => {
                  if (user) {
                        setIsLogin(true);
                  } else {
                        setIsLogin(false);
                  }
            });
      }, []);

      const MainRouter = (
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.sheetColor }}>
                  <View className='w-full h-full '>
                        <FirstSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
                        <ThirdSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
                        <SecondSheet sheetAnimVal={sheetAnimVal} activeSheet={activeSheet} />
                        <BottomTab sheetAnimVal={sheetAnimVal} />
                        <ModalCreateServer />
                  </View>
            </GestureHandlerRootView>
      );
      const AuthRouter = (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.sheetColor }}>
                  <NavigationContainer>
                        <Stack.Navigator
                              screenOptions={{
                                    headerShown: false,
                              }}>
                              <Stack.Screen name="LoginScreen" component={LoginScreen} />
                              <Stack.Screen name="SignupScreen" component={SignupScreen} />
                        </Stack.Navigator>
                  </NavigationContainer>
            </SafeAreaView>
      );
      return isLogin ? MainRouter : AuthRouter;
};

export default Router;