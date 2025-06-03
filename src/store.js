import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/employeeSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});