let InitialState = {               
    customerDetail: {},    
    createCustomer: {},
}

function MyaccountReducer(state = InitialState, action) {

  switch (action.type) {
    
    case 'CUSTOMER_DETAIL':        
    let { customerDetailData } = action.payload;    
      return {
        ...state,              
        customerDetail: customerDetailData 
      }; 

    case 'CREATE_CUSTOMER':        
    let { createCustomerData } = action.payload;    
      return {
        ...state,              
        createCustomer: createCustomerData 
      }; 
        
    default:
      return state;
  }
}

export default MyaccountReducer;