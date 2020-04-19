import React from 'react';
import ReactDOM from 'react-dom';

import CartContextProvider from '../src/components/store/providers/storeContextProvider'
import UserContextProvider from '../src/components/store/providers/UserContextProvider'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
  <CartContextProvider>
    <UserContextProvider>
    <React.StrictMode>
    <App />
    </React.StrictMode>
    </UserContextProvider>
  </CartContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
//{/* <React.StrictMode> */}

  //{/* </React.StrictMode> */}
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
