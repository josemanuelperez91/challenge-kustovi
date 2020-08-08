import firebase from '../config/firebaseConfig';

const database = firebase.database();

function writeUserData(userId, name, email, imageUrl) {
  firebase
    .database()
    .ref('users/' + userId)
    .set({
      name: name,
      surname: email,
      access: access,
      profile_picture: imageUrl,
    });
}
