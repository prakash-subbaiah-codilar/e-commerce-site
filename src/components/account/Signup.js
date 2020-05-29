import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { authSignUp } from "../../actions/AuthAction";

import zxcvbn from 'zxcvbn';

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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [signUpError, setSignUpError] = useState('');

  const [passwordStrengthMeter, setPasswordStrengthMeter] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState(0);
  
  useEffect(() => {             
    setSignUpError(selector.auth.signUpErrorMsg);
  },[selector.auth.signUpErrorMsg]);

  useEffect(() => {                  
    let strength = {
        0: "Week",
        1: "Medium",
        2: "Strong",
        3: "Very Strong",
        4: "Very Strong"
      }
      let text = zxcvbn(""+password+"").score;
    
    setPasswordStrengthText(strength[text]);
    setPasswordStrengthMeter(zxcvbn(""+password+"").score);    
    
  },[password]);

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

  const handlePassword = (e) => {
    //alert(e.target.value);    
    let strength = {
        0: "Worst ☹",
        1: "Bad ☹",
        2: "Weak ☹",
        3: "Good ☺",
        4: "Strong ☻"
      }
    
      setPassword(e.target.value);
    // Update the text indicator
    /*if(val !== "") {
      text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>" + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span"; 
    }
    else {
      text.innerHTML = "";
    }*/

  };

  const meterValue = () => {
    let metVal = zxcvbn(password).score;
    alert(metVal);
    return metVal;
  }
  const progressbar = () => {        
    if(password.length > 0){
    switch (passwordStrengthMeter) {                
    case 0:
        return <div className="progress" style={{height: "40px"}}><div className="progress-bar bg-danger text-center text-dark" style={{width:"20%", height: "40px"}}>Password Strength: {passwordStrengthText}</div></div>;        
    case 1:
        return <div className="progress" style={{height: "40px"}}><div className="progress-bar bg-warning text-center text-dark" style={{width:"40%", height: "40px"}}>Password Strength: {passwordStrengthText}</div></div>;
    case 2:
        return <div className="progress" style={{height: "40px"}}><div className="progress-bar bg-info text-center text-dark" style={{width:"60%", height: "40px"}}>Password Strength: {passwordStrengthText}</div></div>;
    case 3:
        return <div className="progress" style={{height: "40px"}}><div className="progress-bar bg-success text-center text-dark" style={{width:"80%", height: "40px"}}>Password Strength: {passwordStrengthText}</div></div>;
    case 4:
        return <div className="progress" style={{height: "40px"}}><div className="progress-bar bg-success text-center text-dark" style={{width:"100%", height: "40px"}}>Password Strength: {passwordStrengthText}</div></div>;
    default:
        return <p id="normal" className="text-dark">Password Strength: No Password</p>;        
  }
}else{
    return <p id="normal" className="text-dark">Password Strength: No Password</p>;        
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
                      <input type="password" id="password" className="form-control" value={password} onChange={handlePassword.bind(this)} /*onChange={(e) => setPassword(e.target.value)}*/ required/>
                      
                      <div className="" style={{backgroundColor: "#DCDCDC"}}>
                            {progressbar()}
                      </div>
		              
                  </div>
                  <div className="form-group">
                      <label for="password">Confirm Password&nbsp;<span className="text-danger">*</span></label>
                      <input type="password" id="confirmpassword" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
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
