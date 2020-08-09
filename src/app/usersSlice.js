import { createSlice } from '@reduxjs/toolkit';
import { usersRef } from '../api/firebase';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
    currentUser: '',
  },
  reducers: {
    getUsersSuccess: (state, action) => {
      state.value = action.payload;
    },
    changeCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const {
  getUsersSuccess,
  addUserSuccess,
  changeCurrentUser,
} = usersSlice.actions;

export const getUsersAsync = () => (dispatch) => {
  usersRef.on('value', (snapshot) => {
    const arrayUsers = [];
    snapshot.forEach((user) => {
      const userData = {
        ...user.val(),
        uid: user.key,
      };
      arrayUsers.push(userData);
    });
    dispatch(getUsersSuccess(arrayUsers));
  });
};

export const updateUserAsync = (userData) => () => {
  const userKey = userData.uid ? userData.uid : usersRef.push().key;
  usersRef.child(userKey).update(userData);
};

export const selectUsers = (state) => state.users.value;

export default usersSlice.reducer;
