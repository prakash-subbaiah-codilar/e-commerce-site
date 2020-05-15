import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { productData } from "../actions/ProductAction";

import getSymbolFromCurrency from 'currency-symbol-map';

import Pagination from './Pagination';

import queryString from 'query-string';

import './Product.css';

import Config from './../../Config';//Get the API_KEY_URL

function Product(props) {
    
  const dispatch = useDispatch();
  
  const selector = useSelector(state => state);
  
  const [gridView, setGridView] = useState(true);
    
  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage] = useState(6);

/*Fetch data from productData Function*/
  useEffect(() => {       
    //alert(Config[0].API_KEY_URL);
    const values = queryString.parse(props.location.search);      
    console.log(queryString.parse(props.location.search).page);
    //Call productData function to fetch data 
    if(values.page){
        dispatch(productData(values.page, props.match.params.id));
    }else{
        dispatch(productData(currentPage, props.match.params.id));
    }

  },[]);


// Get current posts and set as number of product view in per page
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = selector.product.productData.slice(indexOfFirstPost, indexOfLastPost);
  
// Change page by clickig page number
const paginate = (pageNumber) => {             
  
  let url = "/category/"+props.match.params.id+"?page="+pageNumber+"";                
    
  //Reload the page with new page number
  props.history.push(url);
    
  //Call productData function to fetch data
  dispatch(productData(pageNumber, props.match.params.id));            
  
};

//Go to Product Details Page
const push_product_details = (sku) => {       

    let url = "/ProductDetails/"+sku+"";                      

    props.history.push(url);      

  };

/*Grid Button, List Button and Pagination Buttons Layout*/
const grid_list_pagination = () => {
  return <div className="row col-12 col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 mx-auto">
        
      {/*Grid View and List View Toggle button*/}
      <div className="col-6 d-none d-lg-block">            
        <i className="fa fa-th fa-2x text-center p-1" aria-hidden="true" id="icon" onClick={() => {setGridView(true)}}></i>
        <i className="fa fa-list fa-2x text-center p-1" aria-hidden="true" id="icon" onClick={() => {setGridView(false)}}></i>
      </div>

      {/*Add the Pagination for change page*/}
      <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">            
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={selector.product.total_count}
          paginate={paginate}
          currentPage={selector.product.currentPage}                
        />
      </div>
    </div>
}

/*Grid View Layout*/
const gridViewStructure = (person) => {
  return  <div className="shadowContainer p-3 mx-auto">
            <h6>{person.name}</h6>                                            
            <div className="mx-auto" onClick={push_product_details.bind(this, person.sku)}><img className="mx-auto" src={""+Config[0].API_KEY_URL+"pub/media/catalog/product/"+person.image} alt="new" id="productImage" /> </div>
            <div>
                {getSymbolFromCurrency(person.price.regularPrice.amount.currency)}
                {person.price.regularPrice.amount.value}
            </div>   
            <div id="productHover">
              <div className="row pt-2">
                <div className="pl-2 pr-2">
                  <button className="btn btn-sm btn-secondary">Add Cart</button>
                </div>
                <div className="pl-2 pr-2">
                  <i className="fa fa-heart fa-1x text-center" aria-hidden="true" id="icon"></i>
                </div>
                <div className="pl-2 pr-2">
                  <i className="fa fa-bar-chart fa-1x text-center" aria-hidden="true" id="icon"></i>
                </div>
              </div>
            </div>
          </div>     
}

/*List View and Mobile View Layout*/
const listViewStructure = (person) => {
  return <div>
                    <h6 className="pt-2 pl-2">{person.name}</h6>   
                    <div className="pt-2 pl-2">
                      {getSymbolFromCurrency(person.price.regularPrice.amount.currency)}
                      {person.price.regularPrice.amount.value}
                      </div>
                      <div className="row pt-2 pl-2">
                      <div className="pl-2">
                        <button className="btn btn-sm btn-secondary ml-2">Add Cart</button>
                      </div>
                      <div className="pl-2">
                        <i className="fa fa-heart fa-1x text-center" aria-hidden="true" id="icon"></i>
                      </div>
                      <div className="pl-2">
                        <i className="fa fa-bar-chart fa-1x text-center" aria-hidden="true" id="icon"></i>
                      </div>
                    </div>  
                    <div className="pt-3 pl-2">
                      <a href="" className="link">Learn More</a>                                       
                    </div>
          </div>
}

{/*Display Only on Large screen and extra-large screen Layout*/}
const greaterThanMediumScreenLayout = () => {
  return <div className="d-none d-lg-block">
              {selector.product.productDataLength === '1' ? 
                  <div>                
                    {(selector.product.productData.length > 0 && selector.product.productData.length != null) ?
                    <div className="row mx-auto col-9">
                      {currentPosts.map((person, i) => ( 
                        <React.Fragment>
                        {gridView ?
                        <div key={person.id} className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mx-auto p-3 m-1 mb-5 bg-white rounded">
                            {gridViewStructure(person)}                 
                          </div>
                          :
                          <div key={person.id} className="row col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-2 pb-2 mx-auto">
                            <div className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mx-auto">
                              <div className="text-center" onClick={push_product_details.bind(this, person.sku)}><img className="mx-auto" src={""+Config[0].API_KEY_URL+"magento2/pub/media/catalog/product/"+person.image} alt="new" id="productImage" /> </div>
                            </div>
                            <div className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-8 col-xl-8 mx-auto">
                              {listViewStructure(person)}                          
                            </div>                       
                          </div>
                          }
                          </React.Fragment>
                        ))}
                    </div>
                    :
                    <div className="text-center">No Records Found</div>
                      }
                    </div>
                    :                
                    <div className="mx-auto text-center"><img style={{width:150, height:150}} src={require('./loading_spinner.gif')} alt="new" /></div>                
              }                   

            </div>
}

{/*Display Only on lesser than Medium screen Layout*/}
const lesserThanMediumScreenLayout = () => {
    return <div className="d-lg-none mx-auto">
              {selector.product.productDataLength === '1' ? 
                  <React.Fragment>                
                    {(selector.product.productData.length > 0 && selector.product.productData.length != null) ?
                    <div className="row col-12 mx-auto m-0 p-0 full-width-row">
                      {currentPosts.map((person, i) => (                     
                        
                          <div key={person.id} className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 pt-2 pb-2 mx-auto" style={{padding: '1px'}}>                        
                              <div onClick={push_product_details.bind(this, person.sku)}>
                                <img className="mx-auto" src={""+Config[0].API_KEY_URL+"pub/media/catalog/product/"+person.image} alt="new" style={{width: "100%", height: "%100"}} />
                              </div>
                              {listViewStructure(person)}                                                                          
                          </div>
                        
                        ))}
                    </div>
                    :
                    <div className="text-center">No Records Found</div>
                      }
                    </React.Fragment>
                    :                
                    <div className="mx-auto text-center"><img style={{width:150, height:150}} src={require('./loading_spinner.gif')} alt="new" /></div>                
              }
            </div>
  }
  return (
      <section id="product">
        <div className="mx-auto">          
          <h1 className="text-center text-dark">Product List</h1>      
          
          {/*Grid Button View, List Button View and Pagination Button View*/}
          {grid_list_pagination()}
          
          {/*Display Only on Large screen and extra-large screen */}
          {greaterThanMediumScreenLayout()}          
          
          {/*Display Only on lesser than Medium screen*/}
          {lesserThanMediumScreenLayout()}

        </div>
      </section>
    );
  }

export default Product;