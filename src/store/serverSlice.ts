// src/store/serverSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth, Servers } from '../firebase/firebase';
import { Server } from '../models/Server';

interface ServerState {
      status: 'idle' | 'loading' | 'succeeded' | 'failed';
      ActiveServer: Server | null,
      Servers: Server[],
}

const initialState: ServerState = {
      status: 'idle',
      ActiveServer: null,
      Servers: [],
}
export const fetchServers = createAsyncThunk<Server[], void>(
      'servers/fetchServers',
      async (_, thunkAPI) => {
            try {
                  const snapshot = await Servers
                        .where('owner', '==', Auth.currentUser?.uid).get();
                  if (!snapshot.empty) {
                        thunkAPI.dispatch(serverSlice.actions.setActiveServer(snapshot.docs[0].data() as Server));
                  }
                  return snapshot.docs.map(doc => doc.data()) as Server[];
            } catch (error) {
                  return thunkAPI.rejectWithValue('Failed to fetch servers');
            }
      }
);
const serverSlice = createSlice({
      name: 'servers',
      initialState,
      reducers: {
            setActiveServer(state, action: PayloadAction<Server>) {
                  state.ActiveServer = action.payload;
                  console.log('Active Server:', action.payload);
            },
            setServers(state, action: PayloadAction<Server[]>) {
                  state.Servers = action.payload;
            },
            setStatus(state, action: PayloadAction<ServerState['status']>) {
                  state.status = action.payload;
            }
      },
      extraReducers: (builder) => {
            builder
                  .addCase(fetchServers.pending, (state) => {
                        state.status = 'loading';
                  })
                  .addCase(fetchServers.fulfilled, (state, action: PayloadAction<Server[]>) => {
                        state.status = 'succeeded';
                        state.Servers = action.payload;
                  })
                  .addCase(fetchServers.rejected, (state) => {
                        state.status = 'failed';
                  });
      }
});

export const { setActiveServer, setServers, setStatus } = serverSlice.actions;

export default serverSlice.reducer;