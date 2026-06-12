import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice/authSlice';
import bookingReducer from '../slice/bookingSlice/bookingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
