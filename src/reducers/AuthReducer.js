

let InitialState = {           
    signIn: '',
    signUp: '',
    signOut: '',
    token: '',
  }
  
  function AuthReducer(state = InitialState, action) {
  
      switch (action.type) {
        case 'AUTH_SIGNIN':        
        let { signInData } = action.payload;
        return {
            ...state,              
            signIn: signInData,
        };   
        case 'AUTH_SIGNUP':        
        let { signUpData } = action.payload;          
        return {
            ...state,          
            signUp: signUpData,            
        };

        case 'AUTH_SIGNOUT':        
        let { signOutData } = action.payload;          
        return {
            ...state,          
            signOut: signOutData,            
        };
  
        default:
          return state;
      }
    }
  
    export default AuthReducer;