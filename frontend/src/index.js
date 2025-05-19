import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import './index.css';
import './styles/background.css';
import { AlertProvider } from './context/AlertContext';
import GlobalAlert from './components/GlobalAlert/GlobalAlert';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider>
      <App />
      <GlobalAlert />
    </AlertProvider>
  </React.StrictMode>
);