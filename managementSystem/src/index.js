import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App';
import './index.css';
import { UserProvider } from './context/userContext.js';

const root = createRoot(document.getElementById('root'));

root.render(
  <UserProvider>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </UserProvider>
);
