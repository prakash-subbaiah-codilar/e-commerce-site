import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { authSignUp } from "../../actions/AuthAction";

import './Signup.css';

//Signup Page
const Signup = (props) => {
  
  const dispatch = useDispatch();  
  const selector = useSelector(state => state);

  const [signUpStatus, setSignUpStatus] = useState(true);
  
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [signUpError, setSignUpError] = useState('');
  
  useEffect(() => {             
    setSignUpError(selector.auth.signUpErrorMsg);
  },[selector.auth.signUpErrorMsg]);

  useEffect(() => {         
   if(selector.auth.customerToken){
       props.history.push("/account/myaccount");
   }
 },[selector.auth.customerToken]);



  const handleSignUp = (e) => {     
    //alert(newsletter);
    e.preventDefault();
    
      if(password === confirmPassword){
          dispatch(authSignUp(firstName, lastName, email, password, newsletter));    
      }else{
          alert("Password and confirm password is mismatching");
      }    
  };

  const signupContent = () => {
    return <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-secondary pt-2">
            {/*Thank you for registering with Main Website Store.*/}
              <p id="subTitle">Personal Information</p>
              <hr className="text-secondary m-0 p-0 pb-3"></hr>              

              <form onSubmit={handleSignUp}>
              
                  <div className="form-group">
                      <label for="name">First Name&nbsp;<span className="text-danger">*</span></label>
                      <input type="text" id="name" className="form-control form-control-sm" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                      <label for="name">Last Name&nbsp;<span className="text-danger">*</span></label>
                      <input type="text" id="name" className="form-control form-control-sm" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                  </div>
                  <div className="form-check pb-4">
                      <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" value={newsletter} onChange={() => setNewsletter(!newsletter)} />
                          <small>Sign up for newsletter</small>
                      </label>
                  </div>

                  <p id="subTitle">Sign-in Information</p>
                  
                  <hr className="text-secondary m-0 p-0 pb-3"></hr>

                  <div className="form-group">
                        <label for="name">Email&nbsp;<span className="text-danger">*</span></label>
                        <input type="text" id="name" className="form-control form-control-sm" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                  <div className="form-group">
                      <label for="password">Password&nbsp;<span className="text-danger">*</span></label>
                      <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                      <label for="password">Confirm Password&nbsp;<span className="text-danger">*</span></label>
                      <input type="password" id="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                  </div>

                  <small className="pt-3 pb-3 text-danger">* Required Fields</small>                                          
              <br /><br />
              <button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="submit">Create an Account</button>
              </form>

          </div>
}
  return (           
             <section id="signup">
             <div className="col-12 text-secondary">               
                 <p className="p-2" id="title">Create New Customer Account</p>
                 {signUpError ?                 
                <div class="alert alert-danger">
                    <strong><i className="fa fa-close" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> {signUpError}
                </div>
                :
                null
                }
                 <div className="row mx-auto pt-2">
                   {signupContent()}                                        
                 </div>
             </div>
             </section>
  );
};

export default Signup;
