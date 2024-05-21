// src/store/serverSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth, Servers, Services } from '../firebase/firebase';
import { Server } from '../models/Server';
import { setModalVisible, uploadImage } from './modalSlice';

interface ServiceState {
      status: 'idle' | 'loading' | 'succeeded' | 'failed';
      ActiveServer: Server | null,
      Service: Service[],
}

const initialState: ServiceState = {
      status: 'idle',
      ActiveServer: null,
      Service: [],
}
export const fetchService = createAsyncThunk<Service[], void>(
      'service/fetchService',
      async (_, thunkAPI) => {
            try {
                  let snapshot: any = [];
                  const querySnapshot = await Services.get().then((querySnapshot) => {
                        for (let i = 0; i < querySnapshot.docs.length; i++) {
                              console.log("Server", querySnapshot.docs[i].data());
                              snapshot.push(querySnapshot.docs[i].data());
                        }
                  });
                  //thunkAPI.dispatch(serviceSlice.actions.setServices(snapshot as Server[]));
                  return snapshot as Service[];
            } catch (error) {
                  return thunkAPI.rejectWithValue('Failed to fetch servers');
            }
      }
);
export const addServer = createAsyncThunk(
      'service/addService',
      async (server: Server, thunkAPI) => {
            try {
                  if (server.image) {
                        return uploadImage(server.image)
                              .then(url => {
                                    server.image = url;
                                    console.log('Image URL:', url);
                                    return Services.add(server);
                              })
                              .then(response => {
                                    console.log('Service added to Firestore:', response);
                                    thunkAPI.dispatch(setModalVisible(false))
                                    return response;
                              })
                              .catch(error => {
                                    console.error('Error adding server:', error);
                                    return thunkAPI.rejectWithValue(error.message);
                              });
                  }
            } catch (error: any) {
                  return thunkAPI.rejectWithValue(error.message);
            }
      }
);
const serviceSlice = createSlice({
      name: 'servers',
      initialState,
      reducers: {
            setActiveServer(state, action: PayloadAction<Server>) {
                  state.ActiveServer = action.payload;
                  console.log('Active Server:', action.payload);
            },
            setServices(state, action: PayloadAction<Service[]>) {
                  state.Service = action.payload;
            },
            setStatus(state, action: PayloadAction<ServiceState['status']>) {
                  state.status = action.payload;
            },
            resetState: () => initialState,
      },
      extraReducers: (builder) => {
            builder
                  .addCase(fetchService.pending, (state) => {
                        state.status = 'loading';
                  })
                  .addCase(fetchService.fulfilled, (state, action: PayloadAction<Service[]>) => {
                        state.status = 'succeeded';
                        state.Service = action.payload;
                  })
                  .addCase(fetchService.rejected, (state) => {
                        state.status = 'failed';
                  });

      }
});

export const { setActiveServer, setServices, setStatus, resetState } = serviceSlice.actions;

export default serviceSlice.reducer;