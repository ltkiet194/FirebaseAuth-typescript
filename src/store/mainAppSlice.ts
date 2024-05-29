import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainApp, Server } from '../models/Main';
import { Auth, Channels, Servers, Users } from '../firebase/firebase';
import { setActiveServer } from './serverSlice';
import { addChannel } from './modalSlice';

interface MainAppState {
      isLoading: boolean;
      isFetchChannels: boolean;
      error: string | null;
      currentServer: string;
      servers: Map<string, any> | null;
      channels: Map<string, any> | null;
      members: Map<string, any> | null;
      userInfos: Map<string, any> | null;
      listening: boolean;
}

const initialState: MainAppState = {
      isLoading: false,
      isFetchChannels: false,
      error: null,
      currentServer: '',
      servers: null,
      channels: null,
      members: null,
      userInfos: null,
      listening: false,
};

export const fetchMainApp = createAsyncThunk(
      'mainApp/fetchMainApp',
      async (_, thunkAPI) => {
            thunkAPI.dispatch(setLoading(true));
            try {
                  const documents = new Map();
                  const uid = Auth.currentUser?.uid;
                  const querySnapshot = await Users.doc(uid?.toString()).get();
                  const ownServer = querySnapshot.data()?.ownServer;
                  if (!ownServer) {
                        thunkAPI.dispatch(setLoading(false));
                        return [];
                  }
                  const userInfos = new Map();

                  for (const serverId of ownServer) {
                        const serverDoc = await Servers.doc(serverId).get();
                        const serverData = serverDoc.data();
                        documents.set(serverId, serverData);

                        const membersSnapshot = await Servers.doc(serverId).collection('members').get();
                        const members = new Map();
                        membersSnapshot.forEach((doc) => {
                              members.set(doc.id, doc.data());
                        });
                        for (const member of members.values()) {
                              if (!userInfos.has(member.userId)) {
                                    const userDoc = await Users.doc(member.userId).get();
                                    userInfos.set(member.userId, userDoc.data());
                              }
                              else {
                                    console.log('user already exists');
                              }
                        }
                        const existingServerData = documents.get(serverId);
                        documents.set(serverId, { ...existingServerData, members });
                  }
                  thunkAPI.dispatch(setUserInfos(userInfos));
                  thunkAPI.dispatch(setServers(documents));
                  thunkAPI.dispatch(setLoading(false));
                  return documents;

            } catch (error) {
                  thunkAPI.dispatch(setLoading(false));
                  throw new Error('Failed to fetch main app');
            }
      }
);

export const fetchChannels = createAsyncThunk(
      'mainApp/fetchChannels',
      async (serverId: any, thunkAPI) => {
            try {
                  thunkAPI.dispatch(setIsFetchChannels(true));
                  const documents: Map<string, any> = new Map();
                  const serverDoc = await Servers.doc(serverId).get();
                  const serverData = serverDoc.data();
                  for (const channel of serverData?.channels) {
                        const channelDoc = await Channels.doc(channel.uid).get();
                        documents.set(channel.uid, channelDoc.data());
                  }
                  await thunkAPI.dispatch(setChannels(documents));
                  thunkAPI.dispatch(setIsFetchChannels(false));
                  return documents;
            } catch (error) {
                  return thunkAPI.rejectWithValue('Failed to fetch servers');
            }
      }
);

const mainAppSlice = createSlice({
      name: 'mainApp',
      initialState,
      reducers: {
            setLoading: (state, action: PayloadAction<boolean>) => {
                  state.isLoading = action.payload;
            },
            setIsFetchChannels: (state, action: PayloadAction<boolean>) => {
                  state.isFetchChannels = action.payload;
            },
            setError: (state, action: PayloadAction<string | null>) => {
                  state.error = action.payload;
            },
            setCurrentServer: (state, action: PayloadAction<string>) => {
                  state.currentServer = action.payload;
            },
            setServers: (state, action: PayloadAction<Map<string, any>>) => {
                  state.servers = action.payload;
            },
            setChannels: (state, action: PayloadAction<Map<string, any>>) => {
                  state.channels = action.payload;
            },
            setMembers: (state, action: PayloadAction<Map<string, any>>) => {
                  state.members = action.payload;
            },
            addChannelToState: (state, action: PayloadAction<any>) => {
                  state.channels?.set(action.payload.uid, action.payload);
            },
            setUserInfos: (state, action: PayloadAction<Map<string, any>>) => {
                  state.userInfos = action.payload;
            }
      },
});



export const { setLoading, setUserInfos,
      setError, setCurrentServer, setServers, setChannels, setMembers, addChannelToState, setIsFetchChannels } = mainAppSlice.actions;

export default mainAppSlice.reducer;