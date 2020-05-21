

let InitialState = {           
        cartId: (localStorage.getItem('localCartId') ? localStorage.getItem('localCartId') : ""),
        cartData: [],
        addCartData: [],
        cartData: [],   
        cart: [],
        items: [],
        prices: []                                           
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
        let { cartDatas_get, cart_get, items_get, prices_get } = action.payload;
          return {
            ...state,                          
            cartData: cartDatas_get,   
            cart: cart_get,
            items: items_get,
            prices: prices_get                                           
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