import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './components/Navigation';
import Product from "./components/Product";
import ProductDetails from "./components/ProductDetails";

function App() {  
  return (     
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/Category/:id" component={Product} />
          <Route exact path="/productdetails" component={ProductDetails} />
        </Switch>
      </Router>
  );
}

export default App;
