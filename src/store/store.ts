// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import modalReducer from './modalSlice';
import serverReducer from './serverSlice';
import serviceReducer from './serverSlice';

export const store = configureStore({
      reducer: {
            user: userReducer,
            modal: modalReducer,
            server: serverReducer,
            service: serviceReducer,
      },
      middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                  serializableCheck: false,
            }),
});