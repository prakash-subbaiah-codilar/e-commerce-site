import Config from './../../Config';//Get the API_KEY_URL

/*Customer Detail*/
export const customerDetail = (customerToken) => dispatch => {           

let authorizationToken = "Bearer "+customerToken+"";

  fetch(''+Config[0].API_KEY_URL+'graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': authorizationToken
      },
      body: JSON.stringify({
          query: `
          query {
            customer {
              firstname
              lastname
              suffix
              email
              addresses {
                firstname
                lastname
                street
                city
                region {
                  region_code
                  region
                }
                postcode      
                telephone
              }
            }
          }          
          `,
          variables: null
      })
  }).then(r => r.json()).then((result) => {
    
    //console.log(result.errors[0].message);
    if(result.errors){
     
      alert(result.errors[0].message);
    
    }else{            
        
      //console.log(result.data.customer.firstname);
      //console.log(result.data.customer);
      let datas = {
        customerDetailData: result.data.customer,    
      }
      return dispatch({
          type: 'CUSTOMER_DETAIL',
          payload: datas,
      });  
    }
  
}).catch((error) => {
  
  let datas = {
    customerDetailData: [],    
  }
  return dispatch({
      type: 'CUSTOMER_DETAIL',
      payload: datas
  });
});

};




  /*Customer Detail*/
export const createAddressBook = (customerToken, firstname,
    lastname,
    company,
    telephone,
    streetAddress,                
    city,
    state,
    zipCode,
    country) => dispatch => {           

    let authorizationToken = "Bearer "+customerToken+"";
    
      fetch(''+Config[0].API_KEY_URL+'graphql', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': authorizationToken
          },
          body: JSON.stringify({
              query: `
              mutation {
                createCustomerAddress(input: {
                  region: {
                    region: "Arizona"
                    region_code: "AZ"
                  }
                  country_id: US
                  street: ["`+streetAddress+`"]
                  telephone: "`+telephone+`"
                  postcode: "`+zipCode+`"
                  city: "`+city+`"
                  firstname: "`+firstname+`"
                  lastname: "`+lastname+`"
                  default_shipping: true
                  default_billing: true
                }) {
                  id
                  region {
                    region
                    region_code
                  }
                  country_id
                  street
                  telephone
                  postcode
                  city
                  default_shipping
                  default_billing
                }
              }            
              `,
              variables: null
          })
      }).then(r => r.json()).then((result) => {
        
        //console.log(result.errors[0].message);
        if(result.errors){
         
          alert(result.errors[0].message);
        
        }else{            
            alert("Address Created");
          //console.log(result.data.customer.firstname);
          //console.log(result.data.customer);
          let datas = {
            createCustomerData: result,    
          }
          return dispatch({
              type: 'CREATE_CUSTOMER',
              payload: datas,
          });  
        }
      
    }).catch((error) => {
      
      let datas = {
        createCustomerData: [],    
      }
      return dispatch({
          type: 'CREATE_CUSTOMER',
          payload: datas
      });
    });
    
    };
    

    

/*Change Customer Password*/
export const changeCustomerPassword = (customerToken, currentPassword, newPassword) => dispatch => {           

    let authorizationToken = "Bearer "+customerToken+"";
    
      fetch(''+Config[0].API_KEY_URL+'graphql', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': authorizationToken
          },
          body: JSON.stringify({
              query: `
              mutation {
                changeCustomerPassword(
                  currentPassword: "`+currentPassword+`"
                  newPassword: "`+newPassword+`"
                ) {
                  id
                  email
                }
              }
              `,
              variables: null
          })
      }).then(r => r.json()).then((result) => {
        
        //console.log(result.errors[0].message);
        if(result.errors){
         
          alert(result.errors[0].message);
        
        }else{            
            alert("Address Created");
          //console.log(result.data.customer.firstname);
          //console.log(result.data.customer);
          let datas = {
            createCustomerData: result,    
          }
          return dispatch({
              type: 'CREATE_CUSTOMER',
              payload: datas,
          });  
        }
      
    }).catch((error) => {
      
      let datas = {
        createCustomerData: [],    
      }
      return dispatch({
          type: 'CREATE_CUSTOMER',
          payload: datas
      });
    });
    
    };