import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from "../actions/ProductAction";


function ProductDetails() {  

  const dispatch = useDispatch();  
  const selector = useSelector(state => state);
  useEffect(() => {       
    dispatch(productDetails());
  },[]);

  return (     
      <div>
          <h1 className="mx-auto text-center">Welcome to Product Details Page.</h1>
      </div>
  );
}

export default ProductDetails;
