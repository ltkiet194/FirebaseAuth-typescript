// src/store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction, compose } from '@reduxjs/toolkit';
import { Auth, Users } from '../firebase/firebase';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import serverSlice from './serverSlice';
interface UserState {
      email: string;
      password: string;
      status: 'idle' | 'loading' | 'succeeded' | 'failed';
      infoUser: any;
      error: any;
}
const getUserInfo = async (email: any) => {
      const snapshot = await firestore()
            .collection('users').doc(email).get();
      console.log('snapshot.docs[0].data()', snapshot.data());
      return snapshot.data();
}
const initialState: UserState = {
      email: '',
      password: '',
      status: 'idle',
      error: null,
      infoUser: Auth.currentUser ? getUserInfo(Auth.currentUser?.email) : getUserInfo(auth().currentUser?.email),
};
export const signupUser = createAsyncThunk(
      'user/signup',
      async ({ name, email, password }: any, thunkAPI) => {
            try {
                  const userCredential = await Auth.createUserWithEmailAndPassword(email, password);
                  const userAuth = userCredential.user;
                  await userAuth.updateProfile({
                        displayName: name
                  });
                  const user = await Users.add({ name, email, uid: userAuth.uid });
                  console.log('User account created & signed in!', user);

                  const snapshot = await firestore().collection('users').doc(email).get();

                  thunkAPI.dispatch(userSlice.actions.setInfoUser(snapshot.data()));
                  return userAuth;
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);

export const getUser = createAsyncThunk(
      'user/getUser',
      async (uid: any, thunkAPI) => {
            try {
                  const snapshot = await firestore()
                        .collection('users')
                        .where('uid', '==', uid)
                        .get().then((querySnapshot) => {
                              console.log(querySnapshot.docs[0].data());
                              thunkAPI.dispatch(userSlice.actions.setInfoUser(querySnapshot.docs[0].data()));
                              console.log('User INFO', querySnapshot.docs[0].data());
                        });
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);
export const loginUser = createAsyncThunk(
      'user/login',
      async ({ email, password }: any, thunkAPI) => {
            try {
                  const userCredential = await Auth.signInWithEmailAndPassword(email, password);
                  const snapshot = await firestore().collection('users').doc(email).get();

                  thunkAPI.dispatch(userSlice.actions.setInfoUser(snapshot.data()));
                  return userCredential.user;
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);
export const logoutUser = createAsyncThunk(
      'user/logout',
      async (_, thunkAPI) => {
            try {
                  await Auth.signOut();
                  //how to reset all state
                  thunkAPI.dispatch(userSlice.actions.resetState());
                  console.log('Logout Success');
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);

export const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
            setEmail: (state, action: PayloadAction<string>) => {
                  state.email = action.payload;
            },
            setPassword: (state, action: PayloadAction<string>) => {
                  state.password = action.payload;
            },
            setInfoUser: (state, action: PayloadAction<any>) => {
                  state.infoUser = action.payload;
            },
            resetState: () => initialState,
      },
      extraReducers: (builder) => {
            builder
                  .addCase(loginUser.pending, (state) => {
                        state.status = 'loading';
                  })
                  .addCase(loginUser.fulfilled, (state, action) => {
                        state.status = 'succeeded';
                  })
                  .addCase(loginUser.rejected, (state, action) => {
                        state.status = 'failed';
                        state.error = action.error.message;
                  }).addCase(logoutUser.pending, (state) => {
                        state.status = 'loading';
                  })
                  .addCase(logoutUser.fulfilled, (state) => {
                        state.status = 'idle';
                        state.email = '';
                        state.password = '';
                  })
                  .addCase(logoutUser.rejected, (state, action) => {
                        state.status = 'failed';
                        state.error = action.error.message;
                  })
                  .addCase(signupUser.pending, (state) => {
                        state.status = 'loading';
                  })
                  .addCase(signupUser.fulfilled, (state, action) => {
                        state.status = 'succeeded';
                  })
                  .addCase(signupUser.rejected, (state, action) => {
                        state.status = 'failed';
                        state.error = action.error.message;
                  })
            // .addCase(getUser.pending, (state) => {
            //       state.status = 'loading';
            // })
            // .addCase(getUser.fulfilled, (state, action) => {
            //       state.status = 'succeeded';
            // })
            // .addCase(getUser.rejected, (state, action) => {
            //       state.status = 'failed';
            //       state.error = action.error.message;
            // });
      },
});

export const { setEmail, setPassword, setInfoUser } = userSlice.actions;

export default userSlice.reducer;