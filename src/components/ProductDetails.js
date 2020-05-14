import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from "../actions/ProductAction";
import './ProductDetails.css';
import getSymbolFromCurrency from 'currency-symbol-map';

import { Html5Entities } from 'html-entities';
const htmlEntities = new Html5Entities();

function ProductDetails(props) {  

  const dispatch = useDispatch();  
  const selector = useSelector(state => state);
  
  const [qty, setQty] = useState(1);
  const [nickname, setNickname] = useState("");
  const [summary, setSummary] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {       
    dispatch(productDetails(props.match.params.sku));    
  },[]);


  return (     
    <section id="productDetails">
    <div className="mx-auto pt-3">                

          {selector.product.productDetalisLoaded ? 
              <div>                
                {(selector.product.productDetails.length > 0 && selector.product.productDetails.length != null) ?
                <div>
                  {selector.product.productDetails.map((person, i) => (                     
                    
                      <div key={person.id} className="mx-auto">
                          <div className="row mx-auto pt-3">
                          <div className="col-3 pt-2 mx-auto text-center">
                                <img className="mx-auto" src={"http://127.0.0.1/magento2/pub/media/catalog/product/"+person.image} alt="new" style={{width: "200px", height: "250px"}}/>
                                <div className="row col-12">                                    
                                {/*selector.product.productDetails.media_gallery_entries.file*/}
                                    {person.media_gallery_entries.map((productImage, i) => (                     
                                        <div key={productImage.file} className="p-1">                                            
                                            <img className="mx-auto" src={"http://127.0.0.1/magento2/pub/media/catalog/product/"+productImage.file} alt="new" style={{width: "75px", height: "100px"}}/>
                                        </div>
                                    ))}                                    
                                </div>
                          </div>                                                
                          <div className="col-6">
                                <p className="pt-2 pl-2 text-secondary" id="productDetailsTitle">{person.name}</p>
                                <a href="" className="pt-2 pl-2" >Be the first to review this product</a>
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

                                <div className="pt-5 pl-2 text-secondary">                                    
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


                        <section className="container py-4">
                            <div className="row">
                                <div className="col-md-6">                                
                                    <ul id="tabs" className="nav nav-tabs">                                        
                                        <li className="nav-item border border-bottom-0" style={{borderColor: "D3D3D3"}}><a data-target="#details" data-toggle="tab" className="nav-link small text-uppercase active">Details</a></li>
                                        <li className="nav-item border border-bottom-0" style={{borderColor: "D3D3D3"}}><a data-target="#review" data-toggle="tab" className="nav-link small text-uppercase">Reviews</a></li>
                                    </ul>                                    
                                    <div id="tabsContent" className="tab-content">                                        
                                        <div id="details" className="tab-pane fade active show">
                                            <div className="list-group">                                                                                                
                                                <p className="list-group-item d-inline-block" dangerouslySetInnerHTML={{ __html: person.description }} />
                                            </div>
                                        </div>
                                        <div id="review" className="tab-pane fade">
                                            <div className="list-group">                                              

                                                <div className="list-group-item d-inline-block">
                                                    <p className="pt-2 pl-2 text-secondary" id="productDetailsTitle">{person.name}</p>
                                                    <form role="form">
                                                        <div className="form-group col-lg-12">
                                                            <label className="form-control-label" for="form-group-input">Nickname <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="form-group-input" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
                                                        </div>
                                                        <div className="form-group col-lg-12">
                                                            <label className="form-control-label" for="form-group-input">Summary <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" id="form-group-input" name="summary" value={summary} onChange={e => setSummary(e.target.value)} />
                                                        </div>
                                                        <div className="form-group col-lg-12">
                                                            <label className="form-control-label" for="form-group-input">Review <span className="text-danger">*</span></label>
                                                            <textarea className="form-control" id="form-group-input" name="review" rows="3" value={review} onChange={e => setReview(e.target.value)} ></textarea>
                                                        </div>
                                                        <div className="form-group col-lg-12">
                                                            <button class="btn btn-outline-secondary btn-sm" type="button">Submit Review</button>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                          
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
