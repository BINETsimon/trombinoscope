import trombiReducer from './trombiReducer';
import userReducer from './userReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    user: userReducer,
    trombi: trombiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;