

let InitialState = {           
        cartId: (localStorage.getItem('localCartId') ? localStorage.getItem('localCartId') : ""),
        cartData: [],
        addCartData: [],
        cartData: [],   
        cart: [],
        items: [],
        prices: [],
        productDetailsCartData: [],
        productDetailsCart: [],
        productDetailsItems: [],
        productDetailsPrices: []
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
          
          case 'PRODUCT_DETAILS_INCART':
            let { productDetailsCartData_get, productDetailsCart_get, productDetailsItems_get, productDetailsPrices_get } = action.payload;
            return {
              ...state,                          
              productDetailsCartData: productDetailsCartData_get,   
              productDetailsCart: productDetailsCart_get,
              productDetailsItems: productDetailsItems_get,
              productDetailsPrices: productDetailsPrices_get                                           
            }; 

        default:
          return state;
      }
    }
  
    export default AddcartReducer;