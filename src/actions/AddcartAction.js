import Config from './../../Config';//Get the API_KEY_URL

/*Create Empty Cart for cart id*/
export const createEmptyCart = () => dispatch => {           
  
        fetch(''+Config[0].API_KEY_URL+'graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                        mutation {
                            createEmptyCart
                        }
                        `,
                variables: null
            })
        }).then(r => r.json()).then((result) => {
            localStorage.setItem('localCartId', result.data.createEmptyCart);
            console.log(result.data.createEmptyCart);
        let datas = {
                      cartIds: result.data.createEmptyCart,                                            
                    }
                    
        return dispatch({
            type: 'CREATE_CARTID',
            payload: datas
        });
      }).catch((error) => {        
        return dispatch({
            type: 'CREATE_CARTID',
            payload: ""
        });
    });

};

/*Add the poduct in cart*/
export const addSimpleProductToCart = (cartId, sku, qty) => dispatch => {           
  
    fetch(''+Config[0].API_KEY_URL+'graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            mutation {
              addSimpleProductsToCart(
                input: {
                  cart_id: "`+cartId+`"
                  cart_items: [
                    {
                      data: {
                        quantity: `+qty+`                         
                        sku: "`+sku+`"
                      }
                    }
                  ]
                }
              ) {
                cart {
                  items {
                    id
                    product {
                      name
                      sku
                    }
                    quantity
                  }
                }
              }
          }
            `
        })
    }).then(r => r.json()).then((result) => {
        //console.log(result);                
        alert("Cart Added");        
        dispatch(getCartDetails(cartId));
        /*let datas = {
            addCartDatas: result,                                            
          }
          
    return dispatch({
        type: 'ADD_CART',
        payload: datas
    });*/
  }).catch((error) => {     
    console.log(error);
    return dispatch({
        type: 'ADD_CART',
        payload: ""
    });
});
};

/*Fetch the list of product in cart*/
export const getCartDetails = (cartId) => dispatch => {           
  
  fetch(''+Config[0].API_KEY_URL+'graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `
          query {
            cart(cart_id: "`+cartId+`") {
              email
              billing_address {
                city
                country {
                  code
                  label
                }
                firstname
                lastname
                postcode
                region {
                  code
                  label
                }
                street
                telephone
              }
              shipping_addresses {
                firstname
                lastname
                street
                city
                region {
                  code
                  label
                }
                country {
                  code
                  label
                }
                telephone
                available_shipping_methods {
                  amount {
                    currency
                    value
                  }
                  available
                  carrier_code
                  carrier_title
                  error_message
                  method_code
                  method_title
                  price_excl_tax {
                    value
                    currency
                  }
                  price_incl_tax {
                    value
                    currency
                  }
                }
                selected_shipping_method {
                  amount {
                    value
                    currency
                  }
                  carrier_code
                  carrier_title
                  method_code
                  method_title
                }
              }
              items {
                id
                product {
                  name
                  sku
                  small_image {
                    url
                  }   
                  price {
                    regularPrice {
                      amount {
                        value
                        currency
                      }
                    }
                  }
                }
                quantity
              }              
              available_payment_methods {
                code
                title
              }
              selected_payment_method {
                code
                title
              }
              prices {
                subtotal_excluding_tax {
                  value
                  currency
                }
                applied_taxes {
                  label
                  amount {
                    value
                  }
                }
                grand_total {
                  value
                  currency
                }
              }
            }
          }                 

                  `,
          variables: null
      })
  }).then(r => r.json()).then((result) => {
    console.log("Welcome 1");        
      console.log(result.data);        
      console.log("Welcome 2");        
      let datas = {
          cartDatas_get: result.data,   
          cart_get: result.data.cart,
          items_get: result.data.cart.items,
          prices_get: result.data.cart.prices                                         
        }
    
  return dispatch({
      type: 'CART_DETAILS',
      payload: datas
  });
}).catch((error) => {        
  let datas = {
    cartDatas: [],                                            
  }
  return dispatch({
      type: 'CART_DETAILS',
      payload: datas
  });
});

};


/*Price Details in cart*/
export const getCartPriceDetails = (cartId) => dispatch => {           

  fetch(''+Config[0].API_KEY_URL+'graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
        query {
          cart(cart_id: "`+cartId+`"){
            items {
              id
              quantity
              product{
                name
                sku        
              }
              
            }
            prices {
              
              subtotal_excluding_tax {
                value
              }
              applied_taxes {
                label
                amount {
                  value
                }
              }
            }
          }
        }                    
                `,
        variables: null
    })
}).then(r => r.json()).then((result) => {
    console.log(result.data);        
    let datas = {
        cartData: "",                                            
      }
  
return dispatch({
    type: 'CART_DETAILS',
    payload: datas
});
}).catch((error) => {        
return dispatch({
    type: 'CART_DETAILS',
    payload: ""
});
});

};

/*Update Cart Items*/
export const updateCartItems = (cartId, cart_item_id, qty) => dispatch => {           
  
  fetch(''+Config[0].API_KEY_URL+'graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
        mutation {
          updateCartItems(
            input: {
              cart_id: "`+cartId+`",
              cart_items: [
                {
                  cart_item_id: `+cart_item_id+`
                  quantity: `+qty+`
                }
              ]
            }
          ){
            cart {
              items {
                id
                product {
                  name
                }
                quantity
              }
              prices {
                grand_total{
                  value
                  currency
                }
              }
            }
          }
        }         
                `,
        variables: null
    })
}).then(r => r.json()).then((result) => {
    console.log(result.data);        
    dispatch(getCartDetails(cartId));
    /*let datas = {
        cartData: "",                                            
      }
  
return dispatch({
    type: 'CART_DETAILS',
    payload: datas
});*/
}).catch((error) => {        
return dispatch({
    type: 'CART_DETAILS',
    payload: ""
});
});

};



/*Update Multiple Cart Items*/
export const updateMultipleCartItems = (cartId, data) => dispatch => {           
  
  let dataString = JSON.stringify(data);
  dataString = dataString.replace(/\"/g, "");
      
  fetch(''+Config[0].API_KEY_URL+'graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
        mutation {
          updateCartItems(
            input: {
              cart_id: "`+cartId+`",
              cart_items: `+[dataString]+`
            }
          ){
            cart {
              items {
                id
                product {
                  name
                }
                quantity
              }
              prices {
                grand_total{
                  value
                  currency
                }
              }
            }
          }
        }         
                `,
        variables: null
    })
}).then(r => r.json()).then((result) => {
  alert("Cart Updated")
    dispatch(getCartDetails(cartId));

    /*let datas = {
        cartData: "",                                            
      }
  
return dispatch({
    type: 'CART_DETAILS',
    payload: datas
});*/
}).catch((error) => {        

return dispatch({
    type: 'CART_DETAILS',
    payload: ""
});
});

};


/*Remove Item from cart*/
export const removeItemFromCart = (cartId, cart_item_id) => dispatch => {           

  fetch(''+Config[0].API_KEY_URL+'graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
        mutation {
          removeItemFromCart(
            input: {
              cart_id: "`+cartId+`",
              cart_item_id: `+cart_item_id+`
            }
          )
         {
          cart {
            items {
              id
              product {
                name
              }
              quantity
            }
            prices {
              grand_total{
                value
                currency
              }
            }
          }
         }
        }                    
                `,
        variables: null
    })
}).then(r => r.json()).then((result) => {
    console.log(result.data);        
    dispatch(getCartDetails(cartId));
/*    let datas = {
        cartData: "",                                            
      }
  
return dispatch({
    type: 'CART_DETAILS',
    payload: datas
});*/
}).catch((error) => {        
return dispatch({
    type: 'CART_DETAILS',
    payload: ""
});
});

};

