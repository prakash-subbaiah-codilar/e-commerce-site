

let InitialState = {           
  productDataLength: '0',          
  productData: [],
  isFetching: true,     
  total_count: 0,
  currentPage: 1,  
}

function ProductReducer(state = InitialState, action) {

    switch (action.type) {
      case 'PRODUCT_LIST':        
      let { productDatas, total_counts, currentPages } = action.payload;
        return {
          ...state,              
          productDataLength: '1',
          productData: productDatas,
          total_count: total_counts,
          currentPage: currentPages,
          isFetching: false,        

        };   

      default:
        return state;
    }
  }

  export default ProductReducer;