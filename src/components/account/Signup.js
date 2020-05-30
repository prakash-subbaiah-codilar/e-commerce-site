import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { authSignUp } from "../../actions/AuthAction";

import { removeCartId } from "../../actions/AddcartAction";

import './Signup.css';

//Calculate the password strength by Alphabet, Digit and Symbol
const passwordStrengthCheck = (password) => {
    //Initial value for Strength of the password
    let paswScore = 0;

    //Password is Alphabet
    let pasAlp = /^(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    //Password is Digit
    let pasDig = /^(?=.*[0-9]).{6,20}$/;

    //Password is Symbol
    let pasSymb = /^(?=.*[!@#$%^&*]).{6,20}$/;

    //Password is Alphabet & Digit
    let pasAlpDig = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    //Password is Alphabet & Symbol
    let pasAlpSymb = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    
    //Password is Symbol & Digit
    let pasDigSymb = /^(?=.*[!@#$%^&*])(?=.*[0-9]).{6,20}$/;

    //Password should be Alphabet or Symbol or Digit
    if(password.match(pasAlp) || password.match(pasDig) || password.match(pasSymb)){
        paswScore = 0
    }
    //Password should be (Alphabet & Digit) or (Alphabet & Symbol) or (Digit & Symbol)
    if(password.match(pasAlpDig) || password.match(pasAlpSymb) || password.match(pasDigSymb) ){
        paswScore = 1;
    }

    //Password should be (Alphabet & Digit) or (Alphabet & Symbol) or (Digit & Symbol)
    if((password.match(pasAlpDig) && password.match(pasAlpSymb)) || (password.match(pasAlpDig) && password.match(pasDigSymb)) || (password.match(pasDigSymb) && password.match(pasAlpSymb)) ){
        paswScore = 2;
    }    

    //Password should be (Alphabet & Digit & Symbol) and should be more than or equal to 8 charaters.
    if(password.match(pasAlp) && password.match(pasDig) && password.match(pasSymb)){
        if(password.length >= 8){
            paswScore = 3;
        }else{
            paswScore = 2;
        }
        
    }        

      return paswScore;
}
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

  //Used to set the password strength
  useEffect(() => {                      
    
    let strength = {
        0: "Week",
        1: "Medium",
        2: "Strong",
        3: "Very Strong",
        4: "Very Strong"
      }
      
    let text = passwordStrengthCheck(password);
    setPasswordStrengthText(strength[text]);
    setPasswordStrengthMeter(text);    
    
  },[password]);

//Used to set the customer token to local state
  useEffect(() => {         
   if(selector.auth.customerToken){
       props.history.push("/account/myaccount");
   }
 },[selector.auth.customerToken]);


//Submit the signup user details
const handleSignUp = (e) => {     
    //alert(newsletter);
    e.preventDefault();
    
      if(password === confirmPassword){
          dispatch(authSignUp(firstName, lastName, email, password, newsletter));              
          //Remove cart id after signup to set customer token as cart id
          dispatch(removeCartId());
      }else{
          alert("Password and confirm password is mismatching");
      }    
  };

  
//Password strength Progress Bar
  const progressbar = () => {        
    if(password.length > 0){
    switch (passwordStrengthMeter) {                
    case 0:
        return <p id="week" className="text-dark p-1">Password Strength: {passwordStrengthText}</p>;        
    case 1:
        return <p id="medium" className="text-dark p-1">Password Strength: {passwordStrengthText}</p>;
    case 2:
        return <p id="strong" className="text-dark p-1">Password Strength: {passwordStrengthText}</p>;
    case 3:
        return <p id="verystrong" className="text-light p-1">Password Strength: {passwordStrengthText}</p>;
    case 4:
        return <p id="verystrong" className="text-light p-1">Password Strength: {passwordStrengthText}</p>;
    default:
        return <p id="normal" className="text-dark p-1">Password Strength: No Password</p>;        
  }
}else{
    return <p id="normal" className="text-dark p-1">Password Strength: No Password</p>;        
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
                      
                      <div className="" style={{backgroundColor: "#DCDCDC"}}>
                            {progressbar()}
                      </div>                      		              
                  </div>
                  <div className="form-group">
                  {password.length > 0 ?
                      <React.Fragment>
                          {password.length >= 8 ?
                          <React.Fragment>
                                {passwordStrengthMeter > 2 ?
                                null
                                :
                                <small className="text-danger">Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.</small>
                                }
                          </React.Fragment>                          
                          :
                          <small className="text-danger">Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.</small>
                          }
                      </React.Fragment>
                      : null
                      }
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
