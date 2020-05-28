import Config from './../../Config';//Get the API_KEY_URL

/*SignIn Process*/
export const authSignIn = () => dispatch => {           
  
  fetch(''+Config[0].API_KEY_URL+'graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `
          
          `,
          variables: null
      })
  }).then(r => r.json()).then((result) => {
  console.log(result.data);            
  
  let datas = {
    signInData: "",    
  }
  return dispatch({
      type: 'AUTH_SIGNIN',
      payload: datas,
  });  
}).catch((error) => {
  console.error(error);
  return dispatch({
      type: 'AUTH_SIGNIN',
      payload: ""
  });
});

};


/*SignUp Process*/
export const authSignUp = () => dispatch => {           
  
    fetch(''+Config[0].API_KEY_URL+'graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            
            `,
            variables: null
        })
    }).then(r => r.json()).then((result) => {
    console.log(result.data);            
    
    let datas = {
      signInData: "",    
    }
    return dispatch({
        type: 'AUTH_SIGNUP',
        payload: datas,
    });  
  }).catch((error) => {
    console.error(error);
    return dispatch({
        type: 'AUTH_SIGNUP',
        payload: ""
    });
  });
  
  };


  /*SignUp Process*/
export const authSignOut = () => dispatch => {           
  
    fetch(''+Config[0].API_KEY_URL+'graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            
            `,
            variables: null
        })
    }).then(r => r.json()).then((result) => {
    console.log(result.data);            
    
    let datas = {
      signOutData: "",    
    }
    return dispatch({
        type: 'AUTH_SIGNOUT',
        payload: datas,
    });  
  }).catch((error) => {
    console.error(error);
    return dispatch({
        type: 'AUTH_SIGNOUT',
        payload: ""
    });
  });
  
  };