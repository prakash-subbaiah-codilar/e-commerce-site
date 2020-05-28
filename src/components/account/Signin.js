import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import './Signin.css';

import { authSignIn } from "../../actions/AuthAction";

//Signin Page
const Signin = (props) => {
  
  const dispatch = useDispatch();  
  const selector = useSelector(state => state);

  const [signInStatus, setSignInStatus] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signInError, setSignInError] = useState('');
  
  
  useEffect(() => {         
     // alert(selector.auth.customerToken);
    if(selector.auth.customerToken){
        props.history.push("/");
    }
  },[selector.auth.customerToken]);

    useEffect(() => {             
        setSignInError(selector.auth.signInErrorMsg);
    },[selector.auth.signInErrorMsg]);


  const handleSignIn = (e) => {   
    e.preventDefault();  
    
    dispatch(authSignIn(email, password));

  };

  const leftSideSignin = () => {
      return <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-secondary pt-2">
                <p id="subTitle">Registered Customers</p>
                <hr className="text-secondary m-0 p-0"></hr>
                <p><small>If you have an account, sign in with your email address.</small></p>

                <form onSubmit={handleSignIn}>
                
                    <div className="form-group">
                        <label for="email">Email&nbsp;<span className="text-danger">*</span></label>
                        <input type="email" id="email" className="form-control form-control-sm" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    
                    <div className="form-group">
                        <label for="password">Password&nbsp;<span className="text-danger">*</span></label>
                        <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="submit">Sign In</button>
                    <small className="text-primary pl-3 ">Forgot Your Password?</small>
                </form>
                <br />
                <small className="pt-3 text-danger">* Required Fields</small>

            </div>
  }
  const rightSideSignup = () => {
    return <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pt-2">
                <p id="subTitle">New Customers</p>
                <hr className="text-secondary m-0 p-0"></hr>
                <p><small>Creating an account has many benefits: check out faster, keep more than one address, track orders and more.</small></p>
                <button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="button" onClick={() => props.history.push("create")}>Create an Account</button>
          </div>
  }
  return (
            <section id="signin">
            <div className="col-12 text-secondary">               
                <p className="p-2" id="title">Customer Login</p>
                {signInError ?                 
                <div class="alert alert-danger">
                    <strong><i className="fa fa-close" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> {signInError}
                </div>
                :
                null
                }
                <div className="row mx-auto pt-2">
                    {leftSideSignin()}
                    {rightSideSignup()}                    
                </div>
            </div>
            </section>
  );
};

export default Signin;
