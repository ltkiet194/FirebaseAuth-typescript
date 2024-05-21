import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth'
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { colors } from '../constants/colors';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Spa/HomeScreen';
import Transaction from '../screens/Spa/Transaction';
import Customer from '../screens/Spa/Customer';
import Setting from '../screens/Spa/Setting';
import { Home2, Money2, Profile2User, Setting3, TransactionMinus } from 'iconsax-react-native';
import { set } from 'firebase/database';
import { getUser } from '../store/userSlice';
import { Auth } from '../firebase/firebase';
const Tab = createBottomTabNavigator();

const Router = () => {
      const Stack = createNativeStackNavigator();
      const [isLogin, setIsLogin] = useState(false);
      const dispatch = useDispatch<any>();
      const [role, setRole] = useState<string | null>(null);
      const userinfo = useSelector((state: any) => state.user.infoUser);
      console.log('userinfo', userinfo);

      useEffect(() => {
            dispatch(getUser(auth().currentUser?.uid));
            const unsubscribe = auth().onAuthStateChanged((user) => {
                  if (user) {
                        setIsLogin(true);
                  } else {
                        setIsLogin(false);
                  }
            });
            if (userinfo) {
                  setRole(userinfo?.role);
            }
            return () => unsubscribe();

      }, []);
      if (!userinfo)
            Auth.signOut();
      const MainRouter = (
            <NavigationContainer>
                  <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen
                              name="Home"
                              component={HomeScreen}
                              options={{
                                    tabBarLabel: 'Home',
                                    tabBarIcon(props) {
                                          return <Home2 width={20} height={20} color='black' />;
                                    },
                              }}
                        />
                        {userinfo.role === 'admin' && (
                              <>
                                    <Tab.Screen
                                          name="Transaction"
                                          component={Transaction}
                                          options={{
                                                tabBarLabel: 'Transaction',
                                                tabBarIcon(props) {
                                                      return <Money2 width={20} height={20} color='black' />;
                                                },
                                          }}
                                    />
                                    <Tab.Screen
                                          name="Customer"
                                          component={Customer}
                                          options={{
                                                tabBarLabel: 'Customer',
                                                tabBarIcon(props) {
                                                      return <Profile2User width={20} height={20} color='black' />;
                                                },
                                          }}
                                    />
                              </>
                        )}
                        <Tab.Screen
                              name="Setting"
                              component={Setting}
                              options={{
                                    tabBarLabel: 'Setting',
                                    tabBarIcon(props) {
                                          return <Setting3 width={20} height={20} color='black' />;
                                    },
                              }}
                        />
                  </Tab.Navigator>
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