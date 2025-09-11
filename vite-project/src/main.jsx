import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='188434364142-q8c57h5sbiornjp66enifvikfd9ia5eh.apps.googleusercontent.com'>
      <Toaster position="top-right" reverseOrder={false} />
    <App />
    </GoogleOAuthProvider>
    
  </React.StrictMode>
);
