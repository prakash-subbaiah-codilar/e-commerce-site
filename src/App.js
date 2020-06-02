import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Navigation from './components/Navigation';

import Signup from "./components/account/Signup";
import Signin from "./components/account/Signin";

import AccountinfoComp from "./components/account/MyaccountComponents/AccountinfoComp";
import AddressbookComp from "./components/account/MyaccountComponents/AddressbookComp";
import DownloadableComp from "./components/account/MyaccountComponents/DownloadableComp";
import MyaccountComp from "./components/account/MyaccountComponents/MyaccountComp";
import MyordersComp from "./components/account/MyaccountComponents/MyordersComp";
import NewsletterComp from "./components/account/MyaccountComponents/NewsletterComp";
import ProductreviewComp from "./components/account/MyaccountComponents/ProductreviewComp";
import WishlistComp from "./components/account/MyaccountComponents/WishlistComp";


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

          <Route exact path="/account/accountinfo" component={AccountinfoComp} />
          <Route exact path="/account/addressbook" component={AddressbookComp} />
          <Route exact path="/account/downloadable" component={DownloadableComp} />
          <Route exact path="/account/myaccount_dashboard" component={MyaccountComp} />
          <Route exact path="/account/myorders" component={MyordersComp} />
          <Route exact path="/account/newsletter" component={NewsletterComp} />
          <Route exact path="/account/productreview" component={ProductreviewComp} />
          <Route exact path="/account/wishlist" component={WishlistComp} />
                    
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
