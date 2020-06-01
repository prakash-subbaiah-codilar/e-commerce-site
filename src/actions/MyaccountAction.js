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
