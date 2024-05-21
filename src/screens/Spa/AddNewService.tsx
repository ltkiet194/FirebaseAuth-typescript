import { View, Text, Image, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigatior from './RouterService'
import { HelperText, TextInput } from 'react-native-paper';
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import ImagePicker from 'react-native-image-crop-picker';
import { createNewService } from '../../context/index'
import { Camera } from 'iconsax-react-native';

const AddNewService = () => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice]: any = useState('');
  const [pathImage, setPathImage] = useState('');
  const hasErrorserviceName = () => serviceName.length < 1;
  const hasErrorPrice = () => {
    return price.length < 1 || isNaN(price);
  };

  const getErrorMessage = () => {
    if (price.length < 1) {
      return "Vui lòng nhập giá";
    } else if (isNaN(price)) {
      return "Vui lòng nhập đúng định dạng số";
    }
    return "";
  };
  const upLoadImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 400,
      mediaType: 'photo'
    })
      .then(image => setPathImage(image.path))
      .catch(e => console.log(e.message))
  }

  const storageRef = storage().ref('services/')
  const AddService = () => {
    if (!serviceName || !price || !pathImage) {
      Alert.alert("Vui lòng nhập đầy đủ!");
      return;
    }
    if (hasErrorPrice()) {
      Alert.alert("Vui lòng nhập đúng định dạng giá tiền!");
      return;
    }

    try {
      const fileName = `${Date.now()}_${price}.jpg`;
      const imageRef = storageRef.child(fileName);

      const uploadTask = imageRef.putFile(pathImage);

      uploadTask.on('state_changed',
        () => {
        },
        (error) => {
          console.error(error);
          Alert.alert("Error uploading image: " + error.message);
        },
        async () => {
          try {
            const downloadUrl = await imageRef.getDownloadURL();
            const newService = {
              servicename: serviceName,
              price: parseFloat(price),
              imageUrl: downloadUrl,
              finalUpdate: firestore.FieldValue.serverTimestamp()
            };
            await createNewService(newService);
            setServiceName('');
            setPrice('');
            setPathImage('');
          } catch (error: any) {
            console.error(error);
            Alert.alert("Error getting download URL: " + error.message);
          }
        }
      );

    } catch (error: any) {
      console.error(error);
      Alert.alert("Error adding service: " + error.message);
    }
  };
  return (
    <View style={{ paddingHorizontal: 15 }} className='flex-1 '>
      <View style={{ marginTop: 20 }} >

        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 5 }}>
          Services name</Text>
        <TextInput
          mode='outlined'
          value={serviceName}
          onChangeText={text => setServiceName(text)}>
        </TextInput>
        <HelperText style={{ textAlign: 'center' }} type='error' visible={hasErrorserviceName()}>
          Required Name of Services</HelperText>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginBottom: 10 }}>Price</Text>
        <TextInput
          mode='outlined'
          value={price}
          onChangeText={text => setPrice(text)}>
        </TextInput>
        <HelperText style={{ textAlign: 'center' }} type='error' visible={hasErrorPrice()}>{getErrorMessage()}</HelperText>
      </View>
      <View className='items-center justify-center'>
        <TouchableOpacity onPress={upLoadImage}
          className='flex-row justify-center p-5 mx-6 bg-orange-300 border-black rounded-full h-28 w-28 item-center'>
          {pathImage ? (
            <Image source={{ uri: pathImage }} className='-mt-5 rounded-full h-28 w-28' />
          ) : (
            <>
              <Camera size={24} className='mt-6 text-orange-600' />
              <Text className='mt-6 text-orange-600'>Upload</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={AddService} className='items-center justify-center w-full mt-2'>
        <Text style={{ textAlign: 'center', color: 'white', backgroundColor: 'tomato', padding: 10, borderRadius: 10 }}>
          Add Services</Text>
      </TouchableOpacity>


    </View>

  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 10,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  plusIcon: {
    top: 0,
    right: 0,
    borderRadius: 50, // to make it round
    padding: 4, // adjust padding as needed
  },
  imagePicker: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 999,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default AddNewService