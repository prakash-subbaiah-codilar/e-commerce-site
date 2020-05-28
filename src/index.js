import React from 'react';

import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'

import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import authReducer from "./reducers/AuthReducer";

import menusReducer from "./reducers/MenusReducer";

import productReducer from "./reducers/ProductReducer";

import addcartReducer from "./reducers/AddcartReducer";

//Combine the Multiple Reducers
const rootReducer = combineReducers({    
    auth: authReducer,
    product: productReducer,  
    addcart: addcartReducer,
    menus: menusReducer    
});

//Create Store to connect Root Reducre and Middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>      
    <App />
  </Provider>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
