import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Navigation from './components/Navigation';

import Signup from "./components/account/Signup";
import Signin from "./components/account/Signin";
import Myaccount from "./components/account/Myaccount";

import Product from "./components/Product";
import ProductDetails from "./components/ProductDetails";
import CartAddEdit from "./components/CartAddEdit";
import ProductQtyUpdate from "./components/ProductQtyUpdate";

function App() {  
  return (     
      <Router>
        {/*Navigation Page*/}
        <Navigation />
        <Switch>
        
          {/*Static Home Page*/}
          <Route exact path="/" component={Home} />

          {/*Signup Page for create new user*/}
          <Route exact path="/account/create" component={Signup} />

          {/*Signin Page for login exiting user*/}
          <Route exact path="/account/login" component={Signin} />
          
          {/*MyAccount Page for user*/}
          <Route exact path="/account/myaccount" component={Myaccount} />
          
          {/*Product List Page*/}
          <Route exact path="/category/:id" component={Product} />
          
          {/*Product Detail Page*/}
          <Route exact path="/productdetails/:sku" component={ProductDetails} />
          
          {/*Shopping Cart Page*/}
          <Route exact path="/checkout/cart" component={CartAddEdit} />          

          {/*Edit Quantity By Product Detail Page*/}
          <Route exact path="/checkout/cart/configure/id/:cart_item_Id/product_id/:product_sku" component={ProductQtyUpdate} />
        
        </Switch>
      </Router>
  );
}

export default App;
