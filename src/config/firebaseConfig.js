import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAls-NSiOsZAAj7fvU_8jeTJ8Mb3bzUAoA',
  authDomain: 'challenge-seguridadsl.firebaseapp.com',
  databaseURL: 'https://challenge-seguridadsl.firebaseio.com',
  projectId: 'challenge-seguridadsl',
  storageBucket: 'challenge-seguridadsl.appspot.com',
  messagingSenderId: '952351552498',
  appId: '1:952351552498:web:42e44bfbe726eb204b716b',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
