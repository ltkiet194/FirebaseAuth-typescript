// src/store/modalSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Servers, storageRef } from '../firebase/firebase';
import { Server } from '../models/Server';

interface ModalState {
      modalVisible: boolean;
      pickedImage: string | null;
      server: any | Server;
}


const initialState: ModalState = {
      modalVisible: false,
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
                        return uploadImage(server.image)
                              .then(url => {
                                    server.image = url;
                                    console.log('Image URL:', url);
                                    return Servers.add(server);
                              })
                              .then(response => {
                                    console.log('Server added to Firestore:', response);
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
const modalSlice = createSlice({
      name: 'modal',
      initialState,
      reducers: {
            setModalVisible(state, action: PayloadAction<boolean>) {
                  state.modalVisible = action.payload;
            },
            setPickedImage(state, action: PayloadAction<any | null>) {
                  state.pickedImage = action.payload;
            },
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

export const { setModalVisible, setPickedImage } = modalSlice.actions;

export default modalSlice.reducer;