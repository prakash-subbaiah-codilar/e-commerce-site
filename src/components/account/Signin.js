import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import './Signin.css';

import { authSignIn } from "../../actions/AuthAction";

//Signin Page
const Signin = () => {
  
  const dispatch = useDispatch();  
  const selector = useSelector(state => state);

  const [signInStatus, setSignInStatus] = useState(true);

  return (
            <div className="text-center text-secondary">               
                <h4>Signin Page</h4>                
                <br />              
                {signInStatus}  
            </div>
  );
};

export default Signin;
