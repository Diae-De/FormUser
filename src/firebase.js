import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 


const firebaseConfig = {
  apiKey: "AIzaSyCR_DMzwpALUCiOjj8niNi6vLwvp7bQKNI",
  authDomain: "clientauth-dev.firebaseapp.com",
  databaseURL: "https://clientauth-dev-default-rtdb.firebaseio.com",
  projectId: "clientauth-dev",
  storageBucket: "clientauth-dev.appspot.com",
  messagingSenderId: "851074406500",
  appId: "1:851074406500:web:4bb0ca7fd54559b7e76771"
  };
  
  const fb = firebase.initializeApp(firebaseConfig);

 
  export const db = fb.firestore()

  export default fb;