import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
// import * as firebase from 'firebase';
// import 'firebase/firestore';

// firebase setup
const firebaseConfig = {
    apiKey: "AIzaSyB3oGtZEFJ4V1-t_0zyqehhnmrJ3xdlR6g",
    authDomain: "cart-ba82c.firebaseapp.com",
    projectId: "cart-ba82c",
    storageBucket: "cart-ba82c.appspot.com",
    messagingSenderId: "112430680099",
    appId: "1:112430680099:web:850cb632491ce815130996"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
