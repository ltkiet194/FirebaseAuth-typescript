// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import modalReducer from './modalSlice';
import serverReducer from './serverSlice';
import mainAppReducer from './mainAppSlice';
export const store = configureStore({
      reducer: {
            user: userReducer,
            modal: modalReducer,
            server: serverReducer,
            MainApp: mainAppReducer,
      },
      middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                  serializableCheck: false,
            }),
});