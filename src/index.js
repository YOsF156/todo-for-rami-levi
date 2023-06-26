
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import App from './App';

// ...
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <>
    <FontAwesomeIcon icon={faShoppingCart} style={{ display: 'none' }} />
    <App />
  </>
  // {/* </React.StrictMode>, */}
);
