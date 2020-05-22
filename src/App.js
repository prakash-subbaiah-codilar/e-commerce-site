import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Navigation from './components/Navigation';
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
