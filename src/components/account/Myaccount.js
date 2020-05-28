import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

//Static My Account Page
const Myaccount = (props) => {
    
    const dispatch = useDispatch();  
    const selector = useSelector(state => state);

    useEffect(() => {         
        if(!selector.auth.customerToken){
            props.history.push("/");
        }
      },[selector.auth.customerToken]);

  return (
            <div className="text-center text-secondary">               
                <h4>Welcome to Account Page</h4>
                <br />
                <h6>Welcome new user!</h6>                
                <br />

            </div>
  );
};

export default Myaccount;
