import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById("root"));
const styleArgument ={fontSize: '100px' , color:'red'};
root.render(
  <React.StrictMode><App /></React.StrictMode>,
  document.getElementById("root")

);

reportWebVitals();
