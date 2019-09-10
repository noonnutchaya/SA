import * as firebase from 'firebase';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyByOV8KXT6xgckUpH83K14raJqlU1qs2UM",
    authDomain: "customerdb-16371.firebaseapp.com",
    databaseURL: "https://customerdb-16371.firebaseio.com",
    projectId: "customerdb-16371",
    storageBucket: "customerdb-16371.appspot.com",
    messagingSenderId: "180136504509",
    appId: "1:180136504509:web:437ac073a80d9dc3"
  };

firebase.initializeApp(firebaseConfig) ;

const storage = firebase.storage();

export {
  storage, firebase as default
}