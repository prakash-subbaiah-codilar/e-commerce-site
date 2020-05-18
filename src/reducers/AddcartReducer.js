

let InitialState = {           
        cartId: (localStorage.getItem('localCartId') ? localStorage.getItem('localCartId') : ""),
        cartData: []

  }
  
  function AddcartReducer(state = InitialState, action) {
  
      switch (action.type) {
        case 'CREATE_CARTID':        
        let { cartIds } = action.payload;
          return {
            ...state,              
            cartId: cartIds
  
          }; 

        case 'CART_DATA':        
        let { cartDatas } = action.payload;
          return {
            ...state,              
            cartData: cartDatas  
          }; 

        default:
          return state;
      }
    }
  
    export default AddcartReducer;