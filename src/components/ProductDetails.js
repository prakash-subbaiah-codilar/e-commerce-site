import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from "../actions/ProductAction";
import './ProductDetails.css';
import getSymbolFromCurrency from 'currency-symbol-map';

function ProductDetails(props) {  

  const dispatch = useDispatch();  
  const selector = useSelector(state => state);
  
  const [qty, setQty] = useState(1);

  useEffect(() => {       
    dispatch(productDetails(props.match.params.sku));    
  },[]);

  function removeTags(str) {
    if ((str===null) || (str===''))
    return false;
    else
    str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
 }


  return (     
    <section id="productDetails">
    <div className="mx-auto pt-3">                
          {/*<h1 className="mx-auto text-center">Welcome to Product Details Page.</h1>*/}
          {/*props.match.params.sku*/}         

          {selector.product.productDetalisLoaded ? 
              <div>                
                {(selector.product.productDetails.length > 0 && selector.product.productDetails.length != null) ?
                <div>
                  {selector.product.productDetails.map((person, i) => (                     
                    
                      <div key={person.id} className="mx-auto">
                          <div className="row mx-auto">
                          <div className="col-3">
                                <img className="mx-auto" src={"http://127.0.0.1/magento2/pub/media/catalog/product/"+person.image} alt="new" style={{width: "200px", height: "250px"}}/>
                          </div>                                                
                          <div className="col-6">
                                <p className="pt-2 pl-2 text-secondary" id="productDetailsTitle">{person.name}</p>
                                
                                <div className="row col-8" id="productDetailsPriceBottom">
                                    <p className="pt-2 pl-2 text-secondary col-6">
                                    <h1>
                                        {getSymbolFromCurrency(person.price.regularPrice.amount.currency)}
                                        {person.price.regularPrice.amount.value}                                  
                                    </h1>
                                    </p>   
                                    <p className="pt-2 pl-2 text-secondary col-6 text-right">
                                        <b>{person.stock_status}</b><br />
                                        SKU#: {person.sku}
                                    </p>
                                </div>

                                <p className="pt-5 pl-2 text-secondary"><b>Qty</b></p>

                                <div className="pl-2">                                    
                                    <input type="text" value={qty} onChange={e => setQty(e.target.value)} className="p-1 text-center" style={{width: '50px'}}/>
                                </div>

                                <div className="pt-3 pl-2">
                                    <button className="btn btn-primary btn-lg" type="button">Add to Cart</button>
                                </div>

                                <div className="pt-3 pl-2 text-secondary">                                    
                                    <div><i className="fa fa-heart fa-1x text-center" aria-hidden="true" id="icon"></i>  ADD TO WISHLIST</div>
                                    <div>                                        
                                        <i className="fa fa-bar-chart fa-1x text-center" aria-hidden="true" id="icon"></i>  ADD TO COMPARE
                                        &nbsp;&nbsp;&nbsp;&nbsp;                                        
                                        <i className="fa fa-envelope fa-1x text-center" aria-hidden="true" id="icon"></i>  EMAIL                                        
                                    </div>
                                </div>
                                                                                                                                  
                          </div>
                          <div className="col-3">                                
                          </div>               
                          </div>











                        <div className="container border">  
                            <ul className="nav nav-tabs">                                
                                <li className="active"><a data-toggle="tab" href="#details">Details</a></li>    
                                <li><a data-toggle="tab" href="#review">Review</a></li>    
                            </ul>

                            <div className="tab-content">
                                <div id="details" className="tab-pane fade in active">
                                <h3>Details</h3>
                                <p>{removeTags(person.description)}</p>
                                </div>
                                <div id="review" className="tab-pane fade">
                                <h3>Review</h3>
                                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>    
                            </div>
                        </div>










                          
                      </div>
                    
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
      </section>
  );
}

export default ProductDetails;
