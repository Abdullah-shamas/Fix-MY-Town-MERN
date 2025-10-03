import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext'; // 👈 import add kiya

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>   {/* 👈 Wrap karna zaroori hai */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
