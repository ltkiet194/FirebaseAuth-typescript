import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Button } from 'react-native-paper'
import { logout, useMyContextController } from '../../context'

const Setting = ({ navigation }: any) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Login')
      return;
    }
  }, [userLogin])

  const handleSignOut = () => {
    logout(dispatch);
  }
  return (
    <View className='justify-center flex-1'>


      <Text className='mb-2 -mt-2 font-bold text-center text-black'>{userLogin?.name}</Text>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignOut} className='bottom-0 '>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Đăng Xuất</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'tomato',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
    paddingHorizontal: 10,
    backgroundColor: "unset"
  },

  buttonContainer: {
    marginTop: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'tomato',
  },
})
export default Setting