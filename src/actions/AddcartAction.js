  import Config from './../../Config';//Get the API_KEY_URL

/*Create a Empty Cart*/
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


/*Fetch Cart Details*/
export const getCartDetails = (cartId) => dispatch => {           
  
    fetch(''+Config[0].API_KEY_URL+'graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query{  
                cart(cart_id: `+cartId+`) {          
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


  



/*{
    cart(cart_id: "CYmiiQRjPVc2gJUc5r7IsBmwegVIFO43") {
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
      applied_coupons {
        code
      }
      prices {
        grand_total {
          value
          currency
        }
      }
    }
  }*/