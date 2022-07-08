import { AllProducts } from './context/ProductContext';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './style/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AllProducts>
        <App />
      </AllProducts>
    </BrowserRouter>
  </React.StrictMode>
);