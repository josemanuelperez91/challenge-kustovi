import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../app/usersSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
