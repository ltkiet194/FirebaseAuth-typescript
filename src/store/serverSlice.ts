// src/store/serverSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth, Channels, Servers, Users } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import { Timestamp } from 'firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import { set } from 'firebase/database';
import { LIMIT_MESSAGES } from '../constants/config';
interface ServerState {
      status: 'idle' | 'loading' | 'succeeded' | 'failed';
      Message: any[];
      InfoInServer: any;
      Members: Map<string, any>;
      ActiveChannel: any | null,
      ActiveServer: any | null,
      Servers: any[],
      isListening: boolean,
      error: string | null;
}

const initialState: ServerState = {
      status: 'idle',
      Members: new Map<string, any>(),
      Message: [],
      InfoInServer: null,
      ActiveChannel: null,
      ActiveServer: null,
      Servers: [],
      isListening: false,
      error: null,
}
export const fetchServers = createAsyncThunk<any[], void>(
      'servers/fetchServers',
      async (_, thunkAPI) => {
            try {
                  const documents: any[] = [];
                  const uid = Auth.currentUser?.uid;
                  const querySnapshot = await Users.doc(uid?.toString()).get();
                  const ownServer = querySnapshot.data()?.ownServer;
                  if (!ownServer) {
                        return [];
                  }
                  for (const serverId of ownServer) {
                        const serverDoc = await Servers.doc(serverId).get();
                        documents.push(serverDoc.data());
                  }
                  thunkAPI.dispatch(setActiveServer(documents[0]));
                  return documents;
            } catch (error) {
                  return thunkAPI.rejectWithValue('Failed to fetch servers');
            }
      }
);

export const fetchChannels = createAsyncThunk(
      'servers/fetchChannels',
      async ({ channel }: any, thunkAPI) => {
            try {
                  const documents: any[] = [];
                  const querySnapshot = await Channels.doc(channel.uid).get();
                  const channelData: any = querySnapshot.data();
                  if (channelData == undefined) {
                        await thunkAPI.dispatch(setMessages([]));
                        return [];
                  }
                  const bucketNow = await Channels.doc(channel.uid).collection('buckets')
                        .orderBy('timeStamp', 'desc').limit(LIMIT_MESSAGES).get();
                  bucketNow.forEach((doc) => {
                        documents.push(doc.data());
                  });
                  await thunkAPI.dispatch(setMessages(documents));
                  return documents;
            } catch (error) {
                  return thunkAPI.rejectWithValue('Failed to fetch servers');
            }
      }
);

export const fetchMembers = createAsyncThunk(
      'servers/fetchMembers',
      async ({ serverId }: any, thunkAPI) => {
            try {
                  const documents: any = new Map<string, any>();
                  const querySnapshot = await Servers.doc(serverId).collection('members').get();
                  querySnapshot.forEach((doc) => {
                        documents.set(doc.id, doc.data());
                  });

                  thunkAPI.dispatch(setMembers(documents));
                  return documents;
            } catch (error) {
                  return thunkAPI.rejectWithValue('Failed to fetch servers');
            }
      }
);
export const sendMessage = createAsyncThunk(
      'servers/SendMessage',
      async ({ message, channelId }: any, thunkAPI) => {
            try {
                  const uid = 'message' + uuid.v4().toString();
                  const response = await Channels.doc(channelId).collection('buckets').doc(uid).set({
                        userId: await Auth.currentUser?.uid,
                        uid: uid,
                        content: message,
                        reactions: [],
                        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                  });

                  return 'Message';
            } catch (error) {
                  return thunkAPI.rejectWithValue('Failed to fetch servers');
            }
      }
);
const serverSlice = createSlice({
      name: 'servers',
      initialState,
      reducers: {
            setActiveServer(state, action: PayloadAction<any>) {
                  state.ActiveServer = action.payload;
            },
            setServers(state, action: PayloadAction<any[]>) {
                  state.Servers = action.payload;
            },
            setStatus(state, action: PayloadAction<ServerState['status']>) {
                  state.status = action.payload;
            },
            setActiveChannel(state, action: PayloadAction<any>) {
                  state.ActiveChannel = action.payload;
            },
            setMessages(state, action: PayloadAction<any[]>) {
                  state.Message = action.payload;
            },
            setMembers(state, action: PayloadAction<Map<string, any>>) {
                  state.Members = action.payload;
            },
            setListening(state, action: PayloadAction<boolean>) {
                  state.isListening = action.payload;
            },
            setError(state, action: PayloadAction<string | null>) {
                  state.error = action.payload;
            }
      },
      extraReducers: (builder) => {
            builder
                  .addCase(fetchServers.pending, (state) => {
                        state.status = 'loading';
                  })
                  .addCase(fetchServers.fulfilled, (state, action: PayloadAction<any[]>) => {
                        state.status = 'succeeded';
                        state.Servers = action.payload;
                  })
                  .addCase(fetchServers.rejected, (state) => {
                        state.status = 'failed';
                  });
      }
});

export const { setActiveServer, setServers, setStatus, setActiveChannel, setMessages, setMembers,
      setListening, setError

} = serverSlice.actions;

export default serverSlice.reducer;