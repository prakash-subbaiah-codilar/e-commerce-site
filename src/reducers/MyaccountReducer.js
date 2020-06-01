let InitialState = {               
    customerDetail: {},    
}

function MyaccountReducer(state = InitialState, action) {

  switch (action.type) {
    
    case 'CUSTOMER_DETAIL':        
    let { customerDetailData } = action.payload;    
      return {
        ...state,              
        customerDetail: customerDetailData 
      }; 
        
    default:
      return state;
  }
}

export default MyaccountReducer;