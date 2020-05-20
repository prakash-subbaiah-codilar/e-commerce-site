

let InitialState = {           
        cartId: (localStorage.getItem('localCartId') ? localStorage.getItem('localCartId') : ""),
        cartData: [],
        addCartData: [],

  }
  
  function AddcartReducer(state = InitialState, action) {
  
      switch (action.type) {
        case 'CREATE_CARTID':        
        let { cartIds } = action.payload;
          return {
            ...state,              
            cartId: cartIds
  
          }; 

        case 'CART_DETAILS':        
        let { cartDatas } = action.payload;
          return {
            ...state,              
            cartData: cartDatas  
          }; 

          case 'ADD_CART':        
          let { addCartDatas } = action.payload;
          return {
            ...state,              
            addCartData: addCartDatas  
          }; 
          
        default:
          return state;
      }
    }
  
    export default AddcartReducer;