import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
// import editorReducer from '../components/Editor/editorSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
