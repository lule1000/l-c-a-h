import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCfiJiGXX6uy4Mo1xPSpn-nAHtdipUAeFI",
  authDomain: "like-camping-at-home.firebaseapp.com",
  projectId: "like-camping-at-home",
  storageBucket: "like-camping-at-home.appspot.com",
  messagingSenderId: "955141884017",
  appId: "1:955141884017:web:8932e0fc09957b35db73d0"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
