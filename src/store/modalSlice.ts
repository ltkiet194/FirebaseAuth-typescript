// src/store/modalSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth, Channels, Servers, storageRef, Users } from '../firebase/firebase';
import { Server } from '../models/Server';
import uuid from 'react-native-uuid';
import { firebase } from '@react-native-firebase/auth';
import { server } from '../../metro.config';
import { fetchServers, setActiveServer } from './serverSlice';
import { getUser } from './userSlice';
import { addChannelToState, fetchMainApp, setChannels, setServers } from './mainAppSlice';
interface ModalState {
      isLoading: boolean;
      modalVisible: boolean;
      modalAddChannel: boolean;
      modalAccount: boolean;
      modalGenerateKey: boolean;
      modalFindServer: boolean;
      pickedImage: string | null;
      server: any | Server;
}


const initialState: ModalState = {
      isLoading: false,
      modalVisible: false,
      modalAddChannel: false,
      modalAccount: false,
      modalGenerateKey: false,
      modalFindServer: false,
      pickedImage: null,
      server: null,
};
export const uploadImage = async (imagePath: string) => {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const ref = storageRef.child(new Date().toISOString());
      await ref.put(blob);

      const url = await ref.getDownloadURL();
      return url;
};
export const addServer = createAsyncThunk(
      'modal/addServer',
      async (server: Server, thunkAPI) => {
            try {
                  if (server.image) {
                        const uid = Auth.currentUser?.uid;
                        const url = await uploadImage(server.image);
                        server.image = url;
                        const uui = uuid.v4();
                        const userServer = await Users.doc(uid?.toString())
                              .update({
                                    ownServer: firebase.firestore.FieldValue.arrayUnion(uui.toString()),
                              });
                        const newserver = {
                              ...server,
                              id: uui.toString(),
                        };
                        const Members = await Servers.doc(uui.toString())
                              .collection('members').doc(Auth.currentUser?.uid).set({
                                    userId: Auth.currentUser?.uid,
                                    role: 'Admin',
                              });
                        const response = await Servers.doc(uui.toString()).set(newserver);
                        await thunkAPI.dispatch(getUser());
                        await thunkAPI.dispatch(fetchServers());
                        await thunkAPI.dispatch(fetchMainApp());
                        thunkAPI.dispatch(setModalVisible(false));
                        return response;
                  }
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);
export const joinUserToServer = createAsyncThunk(
      'modal/joinUserToServer',
      async (invitedKey: string, thunkAPI) => {
            try {
                  const user = Users.doc(Auth.currentUser?.uid).update({
                        joinedServer: firebase.firestore.FieldValue.arrayUnion(invitedKey),
                  });
                  const serverSnapshot: any = await Servers
                        .doc(invitedKey)
                        .collection('members')
                        .doc(Auth.currentUser?.uid).set({
                              userId: Auth.currentUser?.uid,
                              role: 'Member',
                        });
                  console.log('serverSnapshot', serverSnapshot.data());
                  await thunkAPI.dispatch(getUser());
                  await thunkAPI.dispatch(fetchMainApp());
                  return {};
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);
export const addChannel = createAsyncThunk(
      'modal/addChannel',
      async ({ Server, channelName }: any, thunkAPI) => {
            try {
                  thunkAPI.dispatch(setIsLoading(true));
                  const uid = uuid.v4().toString();
                  const bucketId = uuid.v4().toString();
                  const channel = {
                        name: channelName,
                        uid: uid,
                        bucketId: bucketId,
                        welcomes: {
                              message: `Welcome to ${channelName} where you can chat with other members of the server.`,
                        },
                  };
                  const userServer = await Servers.doc(Server.id)
                        .update({
                              channels: firebase.firestore.FieldValue.arrayUnion(channel),
                        });
                  const result = await Channels.doc(uid).set(channel);
                  const channelInCollection = {
                        userId: await Auth.currentUser?.uid,
                        uid: uid,
                        content: 'Welcome to the channel',
                        dateCreated: new Date(),
                        reactions: [],
                        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                  }
                  const AddFirstBucket = await Channels.doc(uid).collection('buckets').doc(bucketId).set(channelInCollection);
                  const serverSnapshot = await Servers.doc(Server.id).get();
                  const serverData = serverSnapshot.data();
                  const ChannelMap = new Map<string, any>();
                  for (const channel of serverData?.channels) {
                        const channelData = await Channels.doc(channel.uid).get();
                        ChannelMap.set(channel.uid, channelData.data());
                  }
                  const newServer = {
                        ...serverData,
                        channels: ChannelMap,
                  };
                  await thunkAPI.dispatch(setChannels(ChannelMap));
                  // thunkAPI.dispatch(fetchMainApp());
                  thunkAPI.dispatch(setIsLoading(false));
                  thunkAPI.dispatch(setModalVisibleAddChannel(false));
                  return Server;
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);
export const updateProfile = createAsyncThunk(
      'modal/updateProfile',
      async (param: any, thunkAPI) => {
            try {
                  const uid = Auth.currentUser?.uid;
                  if (param.image) {
                        const url = await uploadImage(param.image);
                        param.image = url;
                  }
                  const user = await Users.doc(uid).update(param);
                  thunkAPI.dispatch(setModalAccount(false));
                  thunkAPI.dispatch(getUser());
                  await thunkAPI.dispatch(fetchMainApp());
                  return {};
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);


const modalSlice = createSlice({
      name: 'modal',
      initialState,
      reducers: {
            setModalVisible(state, action: PayloadAction<boolean>) {
                  state.modalVisible = action.payload;
            },
            setModalAccount(state, action: PayloadAction<boolean>) {
                  state.modalAccount = action.payload;
            },
            setModalVisibleAddChannel(state, action: PayloadAction<boolean>) {
                  state.modalAddChannel = action.payload;
            },
            setModalVisibleFindServer(state, action: PayloadAction<boolean>) {
                  state.modalFindServer = action.payload;
            },
            setPickedImage(state, action: PayloadAction<any | null>) {
                  state.pickedImage = action.payload;
            },
            setModalGenerateKey(state, action: PayloadAction<boolean>) {
                  state.modalGenerateKey = action.payload;
            },
            setIsLoading(state, action: PayloadAction<boolean>) {
                  state.isLoading = action.payload;
            }
      },
      extraReducers: (builder) => {
            builder
                  .addCase(addServer.fulfilled, (state, action) => {
                        state.server = action.payload;
                  })
                  .addCase(addServer.rejected, (state, action) => {
                        state.server = {} as Server;
                  });
      }
});

export const { setModalVisible, setPickedImage, setModalVisibleAddChannel,
      setModalVisibleFindServer, setModalGenerateKey,
      setIsLoading, setModalAccount } = modalSlice.actions;

export default modalSlice.reducer;