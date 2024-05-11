import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import auth from '@react-native-firebase/auth'
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';


const Router = () => {
      const Stack = createNativeStackNavigator();
      const [isLogin, setIsLogin] = useState(false);
      useEffect(() => {
            auth().onAuthStateChanged((user) => {
                  if (user) {
                        if (user.displayName == null) {
                              user.reload();
                        }
                        setIsLogin(true);
                  } else {
                        setIsLogin(false);

                  }
            });
      }, []);

      const MainRouter = (
            <Stack.Navigator
                  screenOptions={{
                        headerShown: false,
                  }}>
                  <Stack.Screen name="HomeScreen" component={HomeScreen} />
                  <Stack.Screen name="AddScreen" component={AddScreen} />
            </Stack.Navigator>
      );
      const AuthRouter = (
            <Stack.Navigator
                  screenOptions={{
                        headerShown: false,
                  }}>
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen name="SignupScreen" component={SignupScreen} />
            </Stack.Navigator>
      );
      return isLogin ? MainRouter : AuthRouter;
};

export default Router;