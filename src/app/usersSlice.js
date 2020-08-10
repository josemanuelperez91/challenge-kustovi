import { createSlice } from '@reduxjs/toolkit';
import { usersDBRef, usersStorageRef } from '../api/firebase';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
    currentUser: '',
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers.
  reducers: {
    getUsersSuccess: (state, action) => {
      state.value = action.payload;
    },
    changeCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetCurrentUser: (state) => {
      state.currentUser = '';
    },
  },
});
export const {
  getUsersSuccess,
  addUserSuccess,
  changeCurrentUser,
  resetCurrentUser,
} = usersSlice.actions;

/**
 * Thunk to retreive all users from the firebase realtime database.
 * Transform the object retrieved into an array to store it.
 */
export const getUsersAsync = () => (dispatch) => {
  usersDBRef.on('value', (snapshot) => {
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
/**
 * Thunk to update user data in the firestore realtime database.
 *
 * Get the current user key from the store or creates a new one.
 *
 * Updates the avatar image using firebase storage if changed or
 * if it is for a new user.
 *
 */
export const updateUserAsync = (userData) => async (dispatch, getState) => {
  const state = getState();
  const userKey = state.users.currentUser
    ? state.users.currentUser
    : usersDBRef.push().key;

  if (userData.avatar.startsWith('data:')) {
    const imageUploadSnapshot = await usersStorageRef
      .child(userKey)
      .putString(userData.avatar, 'data_url');
    const uploadedImageURL = await imageUploadSnapshot.ref.getDownloadURL();
    userData.avatar = uploadedImageURL;
  }

  usersDBRef.child(userKey).update(userData);
};

export const selectUsers = (state) => state.users.value;

/**
 * Gets the current selected user data from the store
 */
export const selectCurrentUser = (state) => {
  return state.users.value.filter(
    (user) => user.uid === state.users.currentUser
  )[0];
};

export default usersSlice.reducer;
