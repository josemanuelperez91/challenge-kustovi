import firebase from '../config/firebaseConfig';

export const usersDBRef = firebase.database().ref('users');
export const usersStorageRef = firebase.storage().ref('users');
