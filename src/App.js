import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Navigation from './components/Navigation';
import Product from "./components/Product";
import ProductDetails from "./components/ProductDetails";
import CartAddEdit from "./components/CartAddEdit";

function App() {  
  return (     
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/category/:id" component={Product} />
          <Route exact path="/productdetails/:sku" component={ProductDetails} />
          <Route exact path="/checkout/cart" component={CartAddEdit} />          
        </Switch>
      </Router>
  );
}

export default App;
