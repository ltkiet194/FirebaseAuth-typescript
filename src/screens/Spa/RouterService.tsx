import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Admin from './Admin';
import Transaction from './Transaction';
import Setting from './Setting';
import { login, useMyContextController } from '../../context/';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomerService from './CustomerService';
import { HomeHashtag, MoneyChange, Profile2User, Setting3, Setting5, TransactionMinus } from 'iconsax-react-native';

const Tab = createBottomTabNavigator();
const RouterService = ({ navigation }: any) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin == null) {
            navigation.navigate('Login')
        }
    }, [userLogin])
    return (

        <Tab.Navigator initialRouteName='Admin' screenOptions={{
            tabBarIconStyle: { display: 'flex' },
            tabBarActiveTintColor: 'tomato',
            headerShown: false
        }}

        >
            <Tab.Screen
                name="Admin"
                component={Admin}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <HomeHashtag color={color} size={size} />
                    ),
                    title: 'Home'
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={Transaction}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MoneyChange color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="CustomerService"
                component={CustomerService}
                options={{
                    title: 'Customer',
                    tabBarIcon: ({ color, size }) => (
                        <Profile2User color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Setting5 color={color} size={size} />
                    )
                }}
            />

        </Tab.Navigator>
    )
}

export default RouterService