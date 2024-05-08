import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from '../screens/Contacts';
import Profile from '../screens/Profile';
import colors from '../utility/colors';
import Favorites from '../screens/Favorites';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import User from '../screens/User';
import Options from '../screens/Options';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const ContactsScreens = () => {
    return (
        <Stack.Navigator
            initialRouteName="Contacts"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: colors.blue },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name="Contacts" component={Contacts} options={{ title: 'Contacts', }} />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={({ route }) => {
                    const { contact }: any = route.params;
                    const { name } = contact;
                    return {
                        title: name.split(' ')[0],
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: colors.blue,
                        }
                    };
                }
                }
            />
        </Stack.Navigator>
    );
}

const FavoritesScreens = () => {
    return (
        <Stack.Navigator
            initialRouteName="Favorites"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
                headerTitleAlign: 'center',
            }}
        >

            <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites', }} />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={({ route }) => {
                    const { contact }: any = route.params;
                    const { name } = contact;
                    return {
                        title: name.split(' ')[0],
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: colors.blue,
                        }
                    };
                }
                }
            />
        </Stack.Navigator>
    );
}


const UsersScreens = ({ navigation }: any) => {
    return (
        <Stack.Navigator
            initialRouteName="Users"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'red' },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name="Users"
                component={User}
                options={{
                    headerTitle: "Me",
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: colors.blue,
                    },
                    headerRight: () => {
                        return (
                            <Ionicons
                                name="list"
                                size={25}
                                color="black"
                                onPress={() => navigation.navigate('Options')}
                            />
                        );
                    },
                }} />
            <Stack.Screen name="Options" component={Options} options={{ title: "Options" }} />

        </Stack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='homePage'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }: any) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === 'Contacts Screen') {
                        iconName = 'book';

                    } else if (rn === 'Favorites Screen') {
                        iconName = 'heart';

                    } else if (rn === 'Users Screen') {
                        iconName = 'person';
                    }

                    return <Ionicons name={iconName || ''} size={25} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Contacts Screen"
                component={ContactsScreens}
            />
            <Tab.Screen
                name="Favorites Screen"
                component={FavoritesScreens}
            />
            <Tab.Screen
                name="Users Screen"
                component={UsersScreens}

            />
        </Tab.Navigator>
    );
}


export default TabNavigator;