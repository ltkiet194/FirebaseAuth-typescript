// src/firebaseConfig.js

import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import storage from '@react-native-firebase/storage';
// Hàm khởi tạo Firebase với các emulator
export const initializeFirebase = () => {
      if (__DEV__) {
            console.log('Using Firebase services');
      }
};

export const Users = firestore().collection('users');
export const Servers = firestore().collection('servers');

export const storageRef = storage().ref();
export const db = firestore();
export const Auth = auth();
