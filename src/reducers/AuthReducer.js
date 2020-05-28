

let InitialState = {           
    customerToken: (localStorage.getItem('customerToken') ? localStorage.getItem('customerToken') : ''),
    signInErrorMsg: '',
    signUpErrorMsg: '',
    signIn: '',
    signUp: '',
    signOut: '',
    token: '',
  }
  
  function AuthReducer(state = InitialState, action) {
  
      switch (action.type) {
        case 'AUTH_SIGNIN':        
        let { signInToken } = action.payload;        
        return {
            ...state,              
            customerToken: signInToken,
            signInErrorMsg: ''
        };   

        case 'AUTH_SIGNIN_ERROR':        
        let { signInError } = action.payload;
        return {
            ...state,              
            signInErrorMsg: signInError,
        };   

        case 'AUTH_SIGNUP':        
        let { signUpData } = action.payload;          
        return {
            ...state,          
            signUp: signUpData,            
            signUpErrorMsg: ''
        };

        case 'AUTH_SIGNUP_ERROR':        
        let { signUpError } = action.payload;
        return {
            ...state,              
            signUpErrorMsg: signUpError,
        };   

        case 'AUTH_SIGNOUT':        
        let { signOutData } = action.payload;                  
        return {
            ...state,          
            signOut: signOutData,
            customerToken: (localStorage.getItem('customerToken') ? localStorage.getItem('customerToken') : ''),
        };
  
        default:
          return state;
      }
    }
  
    export default AuthReducer;