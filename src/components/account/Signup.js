import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { authSignUp } from "../../actions/AuthAction";

import './Signup.css';

//Signup Page
const Signup = () => {
  
  const dispatch = useDispatch();  
  const selector = useSelector(state => state);

  const [signUpStatus, setSignUpStatus] = useState(true);

  return (
            <div className="text-center text-secondary">               
                <h4>Signup Page</h4>                
                <br />              
                {signUpStatus}  
            </div>
  );
};

export default Signup;
