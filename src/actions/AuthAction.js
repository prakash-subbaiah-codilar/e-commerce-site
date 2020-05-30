import Config from './../../Config';//Get the API_KEY_URL

/*SignIn Process*/
export const authSignIn = (email, pwd) => dispatch => {           

  fetch(''+Config[0].API_KEY_URL+'graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `
          mutation {
            generateCustomerToken(
              email: "`+email+`",
              password: "`+pwd+`",
            ) {
              token
            }
          }          
          `,
          variables: null
      })
  }).then(r => r.json()).then((result) => {
    
    //console.log(result.errors[0].message);
    if(result.errors){
     
      let datas = {
        signInError: result.errors[0].message,    
      }
      return dispatch({
          type: 'AUTH_SIGNIN_ERROR',
          payload: datas
      });
    
    }else{            
      
      //localStorage.setItem('localCartId', result.data.generateCustomerToken.token);            
      localStorage.setItem('customerToken', result.data.generateCustomerToken.token);            
      let datas = {
        signInToken: result.data.generateCustomerToken.token,    
      }
      return dispatch({
          type: 'AUTH_SIGNIN',
          payload: datas,
      });  

    }
  
}).catch((error) => {
  
  let datas = {
    signInError: error,    
  }
  return dispatch({
      type: 'AUTH_SIGNIN_ERROR',
      payload: datas
  });
});

};




/*SignUp Process*/
export const authSignUp = (fName, lName, email, pwd, subscribed) => dispatch => {           
  
  fetch(''+Config[0].API_KEY_URL+'graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `
          mutation {
            createCustomer(
              input: {
                firstname: "`+fName+`",
                lastname: "`+lName+`",
                email: "`+email+`",
                password: "`+pwd+`",
                is_subscribed: `+subscribed+`
              }
            ) {
              customer {
                firstname
                lastname
                email
                is_subscribed
              }
            }
          }         
          `,
          variables: null
      })
  }).then(r => r.json()).then((result) => {
  console.log(result.data);            
  console.log(result);            
  if(result.errors){
     
    let datas = {
      signUpError: result.errors[0].message,    
    }
    return dispatch({
        type: 'AUTH_SIGNUP_ERROR',
        payload: datas
    });
  
  }else{
    dispatch(authSignIn(email, pwd));
    /*localStorage.setItem('customerToken', result.data.generateCustomerToken.token);            
    let datas = {
      signInToken: result.data.generateCustomerToken.token,    
    }
    return dispatch({
        type: 'AUTH_SIGNIN',
        payload: datas,
    });  */

  }
  /*let datas = {
    signInData: "",    
  }
  return dispatch({
      type: 'AUTH_SIGNUP',
      payload: datas,
  });  */
}).catch((error) => {
  let datas = {
    signUpError: error,    
  }
  return dispatch({
      type: 'AUTH_SIGNUP_ERROR',
      payload: datas
  });
});

};

/*SignUp Process*/
export const authSignOut = () => dispatch => {     
  
  localStorage.clear();
  let datas = {
    signOutData: '',    
  }
  return dispatch({
      type: 'AUTH_SIGNOUT',
      payload: datas,
  });

  };