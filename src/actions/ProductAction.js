//import axios from 'axios';
export const productData = (pageNumber, cat_id) => dispatch => {           
  
        fetch('http://127.0.0.1/magento2/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                query {
                    products(filter: {
                      category_id: {
                        eq: "`+cat_id+`"
                      }
                    } pageSize: 6
                    currentPage: `+pageNumber+`) {
                      items {
                        name
                        id
                        description 
                        image      
                        sku
                        price {
                          regularPrice {
                            amount {
                              value
                              currency
                            }
                          }
                        }
                        special_price      
                        image
                        small_image                        
                        media_gallery_entries {
                          file
                        }   
                        categories {
                          id
                        }
                       
                      }
                      total_count
                    }
                  }
                `,
                variables: null
            })
        }).then(r => r.json()).then((result) => {
        //console.log(result.data);        
        //console.log(result.data.products);
        let datas = {
                      productDatas: result.data.products.items,
                      total_counts: result.data.products.total_count,
                      currentPages: pageNumber,
                    }
        return dispatch({
            type: 'PRODUCT_LIST',
            payload: datas
        });
      }).catch((error) => {
        console.error(error);

        return dispatch({
            type: 'PRODUCT_LIST',
            payload: ""
        });
    });

};







export const productDetails = (sku_key) => dispatch => {           
  
  fetch('http://127.0.0.1/magento2/graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `
          query {
            products(filter: {
              sku: {
                eq: "`+sku_key+`"
              }
            } pageSize: 6
              currentPage:2 ) {
              items {
                name
                id
                description 
                image   
                stock_status
                sku
               price {
                  regularPrice {
                    amount {
                      value
                      currency
                    }
                  }
                }
                special_price      
                image
                small_image      
                media_gallery_entries {
                  file
                }   
                categories {
                  id
                }
               
              }
              total_count
            }
          }
          `,
          variables: null
      })
  }).then(r => r.json()).then((result) => {
  console.log(result.data);          
  console.log(result.data.products.items);
  
  let datas = {
    productDetailsData: result.data.products.items,    
  }
  return dispatch({
      type: 'PRODUCT_DETAILS',
      payload: datas,
  });  
}).catch((error) => {
  console.error(error);
  return dispatch({
      type: 'PRODUCT_DETAILS',
      payload: ""
  });
});

};