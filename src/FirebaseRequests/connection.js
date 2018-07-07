import firebase from 'firebase';
import constants from '../constants.js';

const firebaseApp = () => {
  firebase.initializeApp(constants.firebaseConfig);
};

export default firebaseApp;
