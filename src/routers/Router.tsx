import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth'
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { SafeAreaView, View } from 'react-native';
import { colors } from '../constants/colors';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getUser, updateOnline } from '../store/userSlice';
import { fetchServers, setActiveServer, setServers } from '../store/serverSlice';
import MainPage from '../screens/Main/MainPage';
import ProfilePage from '../screens/Main/ProfilePage';
import { fetchMainApp } from '../store/mainAppSlice';
import { ActivityIndicator } from 'react-native-paper';
import { setIsLoading } from '../store/modalSlice';



const Router = () => {
      const Stack = createNativeStackNavigator();
      const [isLogin, setIsLogin] = useState(false);
      const dispatch = useDispatch<any>();
      useEffect(() => {
            auth().onAuthStateChanged((user) => {
                  if (user) {
                        const setUpBeforeLogin = async () => {
                              await dispatch(setIsLoading(true));
                              await dispatch(updateOnline());
                              await dispatch(getUser());
                              await dispatch(fetchMainApp());
                              await dispatch(setIsLoading(false));
                              setIsLogin(true);
                        };
                        setUpBeforeLogin();
                  } else {
                        const setUpBeforeLogout = async () => {
                              setIsLogin(false);
                        };
                        setUpBeforeLogout();
                  }
            });
      }, []);



      const MainRouter = (
            <NavigationContainer>
                  <Stack.Navigator>
                        <Stack.Screen options={{ headerShown: false }} name="MainPage" component={MainPage} />
                        <Stack.Screen
                              options={{
                                    headerStyle: { backgroundColor: colors.sheetColor },
                                    headerTitleStyle: { color: 'white' },
                                    headerTintColor: 'white',
                              }}
                              name="ProfilePage" component={ProfilePage} />
                  </Stack.Navigator>
            </NavigationContainer>
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