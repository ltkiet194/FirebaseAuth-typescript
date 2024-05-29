// src/store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction, compose } from '@reduxjs/toolkit';
import { Auth, Users } from '../firebase/firebase';
import uuid from 'react-native-uuid';
import setServerActive, { setMessages } from './serverSlice';
import { setChannels, setCurrentServer, setServers, setUserInfos } from './mainAppSlice';

interface UserState {
      email: string;
      password: string;
      status: 'idle' | 'loading' | 'succeeded' | 'failed';
      infoUser: any;
      error: any;
}

const initialState: UserState = {
      email: '',
      password: '',
      status: 'idle',
      error: null,
      infoUser: null,
};
function randomTag() {
      var randomNumber = Math.floor(Math.random() * 10000) + 1;
      var randomTag = "#" + randomNumber;
      return randomTag;
}
export const signupUser = createAsyncThunk(
      'user/signup',
      async ({ name, email, password }: any, thunkAPI) => {
            try {
                  const userInfo = {
                        name,
                        email,
                        tag: randomTag(),
                        image: 'https://firebasestorage.googleapis.com/v0/b/fir-auth-eb32c.appspot.com/o/discord.png?alt=media&token=0e542396-fc55-4fa7-80d8-75d109228c67',
                  };
                  const userDoc = await Users.doc(email).get();
                  if (!userDoc.exists) {
                        const userCreated = await Auth.createUserWithEmailAndPassword(userInfo.email, password)
                        await Users.doc(userCreated.user.uid).set(userInfo);
                  }
                  thunkAPI.dispatch(getUser());
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);
export const updateOnline = createAsyncThunk(
      'user/updateOnline',
      async (_, thunkAPI) => {
            try {
                  const uid = Auth.currentUser?.uid.toString();
                  await Users.doc(uid).update({ online: true });
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);
export const updateOffline = createAsyncThunk(
      'user/updateOffline',
      async (_, thunkAPI) => {
            try {
                  const uid = Auth.currentUser?.uid.toString();
                  await Users.doc(uid).update({ online: false });
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);

export const getUser = createAsyncThunk(
      'user/getUser',
      async (_, thunkAPI) => {
            try {
                  const email = Auth.currentUser?.uid.toString();
                  const snapshot = await Users.doc(email).get();
                  thunkAPI.dispatch(userSlice.actions.setInfoUser(snapshot.data()));
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
                  return userCredential.user ? true : false;
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);
export const logoutUser = createAsyncThunk(
      'user/logout',
      async (_, thunkAPI) => {
            try {
                  await thunkAPI.dispatch(updateOffline());
                  await thunkAPI.dispatch(setCurrentServer(''));
                  await thunkAPI.dispatch(setServers(new Map()));
                  await thunkAPI.dispatch(setUserInfos(new Map()));
                  await thunkAPI.dispatch(setChannels(new Map()));
                  await thunkAPI.dispatch(setMessages([]));
                  await Auth.signOut();
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
                  .addCase(getUser.pending, (state) => {
                        state.status = 'loading';
                  })
                  .addCase(getUser.fulfilled, (state, action) => {
                        state.status = 'succeeded';
                  })
                  .addCase(getUser.rejected, (state, action) => {
                        state.status = 'failed';
                        state.error = action.error.message;
                  });
      },
});

export const { setEmail, setPassword } = userSlice.actions;

export default userSlice.reducer;