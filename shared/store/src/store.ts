import { configureStore } from '@reduxjs/toolkit';
import { globalSlice } from './slices/globalSlice';
import { notificationSlice } from './slices/notificationSlice';

export const createStore = () => {
  return configureStore({
    reducer: {
      global: globalSlice.reducer,
      notification: notificationSlice.reducer,
    },
  });
};

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
