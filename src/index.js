import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { Auth0Provider } from '@auth0/auth0-react';

const firebaseConfig = {
  apiKey: "AIzaSyCfiJiGXX6uy4Mo1xPSpn-nAHtdipUAeFI",
  authDomain: "like-camping-at-home.firebaseapp.com",
  projectId: "like-camping-at-home",
  storageBucket: "like-camping-at-home.appspot.com",
  messagingSenderId: "955141884017",
  appId: "1:955141884017:web:8932e0fc09957b35db73d0"
};

const app = initializeApp(firebaseConfig);

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin} >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
