// src/firebaseConfig.js

import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Hàm khởi tạo Firebase với các emulator
export const initializeFirebase = () => {
      if (__DEV__) {
            console.log('Using Firebase services');
      }
};
export const db = firestore();
export const Auth = auth();
