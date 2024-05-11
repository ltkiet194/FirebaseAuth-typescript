import { View, Text, Alert } from 'react-native'
import React, { createContext, useContext, useMemo, useReducer } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const MyContext: any = createContext(null);
MyContext.displayName = 'MyContextContext';

function reducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userLogin: action.value };
    case 'LOGOUT':
      return { ...state, userLogin: null };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function MyContextControllerProvider({ children }) {
  const initialState = { userLogin: null,jobs:[] };
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch]);
  console.log("Context value:", value); // This should log an array with two items
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

function useMyContextController() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContextController must be used within a MyContextControllerProvider.');
  }
  return context;
}

const USERS = firestore().collection('USERS');

const createAccount = (email,password,fullname) =>{
        USERS.doc(email)
        .onSnapshot(u=> {
        if(!u.exists){
            auth().createUserWithEmailAndPassword(email,password)
            .then(()=> USERS.doc(email).set({
                password,
                email,
                fullname
            }).then(()=>{Alert.alert("Create account success with email: "+email); } ))
            .catch(error => {
                console.error("Failed to add user:", error);
            });
        }
    })
}

const login = (dispatch, email, password) => {
  console.log(email, password);
  auth().signInWithEmailAndPassword(email, password)
    .then(() => USERS.doc(email).onSnapshot(snapshot => {
      const user = snapshot.data();
      console.log("Successfully logged in with user: ", user);
      dispatch({ type: "USER_LOGIN", value: user });
    }))
    .catch(error => Alert.alert("Incorrect username or password"));
};

const logout = (dispatch: any) => {
    auth().signOut()
    .then(() => dispatch({ type: "LOGOUT" }))
};


export {
  MyContextControllerProvider,
  useMyContextController,
  login,
  logout,
  createAccount
};
