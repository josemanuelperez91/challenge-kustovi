import firebase from '../config/firebaseConfig';

export const usersRef = firebase.database().ref('users');
