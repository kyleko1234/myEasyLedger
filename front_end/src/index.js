import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import { BrowserRouter } from 'react-router-dom';

// css
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';
//import './scss/react.scss';

// ========================================

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
