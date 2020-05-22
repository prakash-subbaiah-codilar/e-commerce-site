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
//            console.log(result.data.createEmptyCart);
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
                discount {
                  label
                  amount{
                    value
                    currency
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
  //    console.log(result.data);            
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
}).catch((error) => {     
  console.log(error);
  return dispatch({
      type: 'ADD_CART',
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
    //console.log(result.data);        
    alert("Quantity Updated");
    dispatch(getCartDetails(cartId));    
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
  alert("Shopping Cart Updated")
  dispatch(getCartDetails(cartId));   
}).catch((error) => {        

return dispatch({
    type: 'CART_DETAILS',
    payload: ""
});
});

};


/*Apply discount code to cart*/
export const ApplyDiscount = (cartId, discountCode) => dispatch => {           
       
  fetch(''+Config[0].API_KEY_URL+'graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
        mutation {
          applyCouponToCart(
            input: {
              cart_id: "`+cartId+`",
              coupon_code: "`+discountCode+`"
            }
          ) {
            cart {
              items {
                product {
                  name
                }
                quantity
              }
              applied_coupon {
                code
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
  //console.log(result.data);
  alert("Applied Code");
  dispatch(getCartDetails(cartId));   
}).catch((error) => {        

return dispatch({
    type: 'CART_DETAILS',
    payload: ""
});
});

};

/*Delete discount Code from cart*/
/*mutation {
  removeCouponFromCart(input: { cart_id: "{ CART_ID }" }) {
    cart {
      applied_coupons {
        code
      }
    }
  }
}*/



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
    //console.log(result.data);        
    dispatch(getCartDetails(cartId));
}).catch((error) => {        
return dispatch({
    type: 'CART_DETAILS',
    payload: ""
});
});

};






/*Fetch the list of Countries*/
export const getCountries = () => dispatch => {           
  
  fetch(''+Config[0].API_KEY_URL+'graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `
          query {
            countries {
                id
                two_letter_abbreviation
                three_letter_abbreviation
                full_name_locale
                full_name_english
                available_regions {
                    id
                    code
                    name
                }
            }
          }
                  `,
          variables: null
      })
  }).then(r => r.json()).then((result) => {      
      let datas = {
          countries_get: result.data.countries
      }    
  return dispatch({
      type: 'COUNTRIES_DETAILS',
      payload: datas
  });
}).catch((error) => {        
  let datas = {
    countries_get: [],                                            
  }
  return dispatch({
      type: 'COUNTRIES_DETAILS',
      payload: datas
  });
});

};



