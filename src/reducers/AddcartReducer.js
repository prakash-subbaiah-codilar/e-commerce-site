/*let cartIdGlobal;
if(localStorage.getItem('customerToken')){
  cartIdGlobal = localStorage.getItem('customerToken');
}else if(localStorage.getItem('localCartId')){
  cartIdGlobal = localStorage.getItem('localCartId');
} else {
  cartIdGlobal = ""
}*/

let InitialState = {           
        cartId: (localStorage.getItem('localCartId') ? localStorage.getItem('localCartId') : ""),
        addCartData: [],
        cartData: [],   
        cart: [],
        items: [],
        prices: [],
        countries: []
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
          
          case 'COUNTRIES_DETAILS':
            let { countries_get } = action.payload;
            return {
              ...state,                          
              countries: countries_get
            };             
            
        default:
          return state;
      }
    }
  
    export default AddcartReducer;