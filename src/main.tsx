import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import App from './App';
import './styles.css';

const firebaseConfig = {
  apiKey: "AIzaSyDkygofXCCF9iQDEa0eKP-bNDWpg0N2ujI",
  authDomain: "aitorrs-tma-b378b.firebaseapp.com",
  projectId: "aitorrs-tma-b378b",
  storageBucket: "aitorrs-tma-b378b.appspot.com",
  messagingSenderId: "1058398846243",
  appId: "1:1058398846243:web:72c62847fe7ca7ffc12096",
  measurementId: "G-H7WP5ERSFH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />  
  </React.StrictMode>
)
