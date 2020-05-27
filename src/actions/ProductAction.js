import Config from './../../Config';//Get the API_KEY_URL

/*Fetch the List of Products*/
export const productData = (pageNumber, cat_id) => dispatch => {           
  
        fetch(''+Config[0].API_KEY_URL+'graphql', {
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
                    } pageSize: 9
                    currentPage: `+pageNumber+`) {
                      items {
                        name
                        id                                                
                        sku
                        meta_description
                        small_image{
                          url
                        }
                        image {
                          label
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
                        special_price                              
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
          //console.log(result);
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

/*Fetch the Product Deatils*/
export const productDetails = (sku_key) => dispatch => {           
  
  fetch(''+Config[0].API_KEY_URL+'graphql', {
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
            }) {
              items {
                name
                id
                meta_description
                image {
                  label
                  url
                }   
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
                image {
                  label
                  url
                }
                small_image {
                  label
                  url
                }      
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