/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: React.FC<Props> = ({navigation: {navigate}}) => {
    const user:any = auth().currentUser?auth().currentUser:{};
    console.log("user", user)
    const signout = () =>{
        auth().signOut().then(()=>{
            navigate("Login")
        }).catch(err=>console.log(err.message));
    }
    return (
        // <SafeAreaView>
            <View className ='flex items-center justify-center flex-1 p-7'>
                <Text className='mb-5 text-xl text-black'>
                    Hello, {user?.displayName}
                </Text>
                <Text style={{fontSize:20, color:"#000", marginBottom:20}}>
                    {user?.email}
                </Text>
                <TouchableOpacity onPress={()=>signout()} 
                className='w-full p-5 my-2 bg-orange-500 shadow-xl rounded-xl'
                style={{padding:20, marginVertical: 10,borderRadius:10, backgroundColor: "#f6880e",shadowOffset:{width:0, height:10},shadowOpacity: 0.3, shadowRadius: 10, width:"100%"}}>
                    <Text style={{color:"#fff", textAlign:"center", fontSize:20}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        // </SafeAreaView>
    );
};

export default Home;