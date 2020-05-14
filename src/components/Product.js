import React, { useState, useEffect, Fragment } from 'react';
import './Product.css';
import { useDispatch, useSelector } from 'react-redux'
import { productData } from "../actions/ProductAction";
import getSymbolFromCurrency from 'currency-symbol-map';

import Pagination from './Pagination';

import queryString from 'query-string';

function Product(props) {
    
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  
  const [gridView, setGridView] = useState(true);

  const [listView, setListView] = useState(false);
    
  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage] = useState(6);

  useEffect(() => {       

    const values = queryString.parse(props.location.search);   

    dispatch(productData(values.page, props.match.params.id));

  },[]);


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = selector.product.productData.slice(indexOfFirstPost, indexOfLastPost);
  
  // Change page
     const paginate = (pageNumber) => {
       
       let url = "/Category/"+props.match.params.id+"?page="+pageNumber+"";                

       props.history.push(url);

       dispatch(productData(pageNumber, props.match.params.id));            

     };

    return (
      <section id="product">
        <div className="mx-auto">          
          <h1 className="text-center text-dark">Product List</h1>      
          <div className="row col-12 col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 mx-auto">
            <div className="col-6 d-none d-lg-block">            
              <i className="fa fa-th fa-2x text-center p-1" aria-hidden="true" id="icon" onClick={() => {setGridView(true), setListView(false)}}></i>
              <i className="fa fa-list fa-2x text-center p-1" aria-hidden="true" id="icon" onClick={() => {setGridView(false), setListView(true)}}></i>
            </div>
            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">            
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={selector.product.total_count}
                paginate={paginate}
                currentPage={selector.product.currentPage}                
              />
            </div>
          </div>

{/*Display Maximum Medium Screen */}
<div className="d-none d-lg-block">
          {selector.product.productDataLength == '1' ? 
              <div>                
                {(selector.product.productData.length > 0 && selector.product.productData.length != null) ?
                <div className="row mx-auto col-9">
                  {currentPosts.map((person, i) => ( 
                    <React.Fragment>
                    {gridView ?
                    <div key={person.id} className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mx-auto p-3 m-1 mb-5 bg-white rounded">
                      <div className="shadowContainer p-3 mx-auto">
                    <h6>{person.name}</h6>                                            
                      <div className="mx-auto"><img className="mx-auto" src={"http://127.0.0.1/magento2/pub/media/catalog/product/"+person.image} alt="new" id="productImage" /> </div>
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
                      </div>
                      :
                      <div key={person.id} className="row col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pt-2 pb-2 mx-auto">
                        <div className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mx-auto">
                          <div className="text-center"><img className="mx-auto" src={"http://127.0.0.1/magento2/pub/media/catalog/product/"+person.image} alt="new" id="productImage" /> </div>
                        </div>
                        <div className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-8 col-xl-8 mx-auto">
                          <h6 className="pt-2">{person.name}</h6>   
                          <div>
                          {getSymbolFromCurrency(person.price.regularPrice.amount.currency)}
                          {person.price.regularPrice.amount.value}
                          </div>
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
                        <div className="pt-3">
                          <a href="#" className="stretched-link">Learn More</a>                                       
                        </div>
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
                <div className="mx-auto text-center"><img style={{width:150, height:150}} src={require('./loading_spinner.gif')} /></div>                
          }                   

</div>




{/*Display Minimum Medium Screen */}

<div className="d-lg-none mx-auto">

{selector.product.productDataLength == '1' ? 
              <React.Fragment>                
                {(selector.product.productData.length > 0 && selector.product.productData.length != null) ?
                <div className="row col-12 mx-auto m-0 p-0 full-width-row">
                  {currentPosts.map((person, i) => (                     
                    
                      <div key={person.id} className="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 pt-2 pb-2 mx-auto" style={{padding: '1px'}}>
                        
                          <img className="mx-auto" src={"http://127.0.0.1/magento2/pub/media/catalog/product/"+person.image} alt="new" style={{width: "100%", height: "%100"}} />                                               
                        
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
                          <a href="#" className="stretched-link">Learn More</a>                                       
                        </div>
                                                
                      </div>
                    
                    ))}
                </div>
                :
                <div className="text-center">No Records Found</div>
                  }
                </React.Fragment>
                :                
                <div className="mx-auto text-center"><img style={{width:150, height:150}} src={require('./loading_spinner.gif')} /></div>                
          }


</div>


        </div>
      </section>
    );
  }

export default Product;