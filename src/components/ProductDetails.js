import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { productDetails } from "../actions/ProductAction";

import getSymbolFromCurrency from 'currency-symbol-map';

import Config from './../../Config';//Get the API_KEY_URL

import './ProductDetails.css';

import './Popupimage.css';

import Popupimage from './Popupimage';

function ProductDetails(props) {  

  const dispatch = useDispatch();  
  const selector = useSelector(state => state);
    
  const [qty, setQty] = useState(1);
  const [nickname, setNickname] = useState("");
  const [summary, setSummary] = useState("");
  const [review, setReview] = useState("");
  const [selectedImage, setSelectedImage] = useState(""); 

  /*Fetch data from productDetals Function*/
  useEffect(() => {       
    //Call productDetails function to fetch data 
    dispatch(productDetails(props.match.params.sku));        
  },[]);

  /*Asign the selected image to view in first*/
  useEffect(() => {                   
    const data = selector.product.productDetails.map(item => {
            setSelectedImage(item.image);
            return item.image;
      });            
    console.log(data);
  },[selector.product.productDetails]);


/*Popup Image ZoomIn*/
function zoomin() {        
    let myImg = document.querySelector(".active .modalImage");
    let currWidth = myImg.clientWidth;        
    if(currWidth >= 900){
        alert("Maxium zoom-in level reached.")
    }else{
        myImg.style.width = (currWidth+20) + "px";
    }   
} 

/*Popup Image ZoomOut*/  
function zoomout() {             
    let myImg = document.querySelector(".active .modalImage");    
    let currWidth = myImg.clientWidth;            
    if(currWidth <= 200){
        alert("Maxium zoom-out level reached.")
    }else{
        myImg.style.width = (currWidth-20) + "px";    
    }    
} 
/*Click the slider arrow selected image will change*/
const fire = () => {    
    let getImg = document.querySelector(".themeImage .active");        
    setSelectedImage(getImg.id);    
}
/*Left Column Product Image View Layout*/
const left_column_productImageView = (person) => {
    return <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 pt-2 mx-auto text-center">

                {/*View product image large size*/}
                <div className="row col-12 text-center">                                                                                     
                <div id="slider1" className="carousel slide mb-5 text-center mx-auto" data-ride="carousel" data-interval="false">
                    <div className="carousel-inner themeImage" role="listbox">
                                {person.media_gallery_entries.map((productImage, i) => (                                                                     
                                    <React.Fragment>                                        
                                        {selectedImage === productImage.file ?                                                                                    
                                                <div id={productImage.file} key={productImage.file} className="carousel-item active" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false"> 
                                                    <img src={""+Config[0].API_KEY_URL+"pub/media/catalog/product/"+productImage.file} alt="First Slide" style={{width: "200px", height: "250px"}}/>
                                                </div>                                                                                    
                                                :
                                                <div id={productImage.file} key={productImage.file} className="carousel-item" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false">
                                                    <img src={""+Config[0].API_KEY_URL+"pub/media/catalog/product/"+productImage.file} alt="First Slide" style={{width: "200px", height: "250px"}}/>
                                                </div>                                                                                                                                
                                        }
                                    </React.Fragment>                                     
                                ))}              
                    </div>
                    <a id="slideArrow" href="#slider1" className="carousel-control-prev text-dark ml-0 mr-0" data-slide="prev" onClick={fire}>                        
                        <i class="fa fa-angle-left fa-4x text-dark" aria-hidden="true" id="icon"></i>
                    </a>

                    <a id="slideArrow" href="#slider1" className="carousel-control-next ml-0 mr-0" data-slide="next" onClick={fire}>
                        <i class="fa fa-angle-right fa-4x text-dark" aria-hidden="true" id="icon"></i>                        
                    </a>
                 </div> 
                    
                </div>
                
                {/*Image Poup in Full Screen slideshow */}
                <Popupimage person={person} selectedImage={selectedImage} zoomin={zoomin} zoomout={zoomout} />

                {/*View product image small size*/}
                <div className="row col-12 pic-container">                                                                    
                    {person.media_gallery_entries.map((productImage, i) => (                     
                        <div>
                            {selectedImage === productImage.file ?
                            <div key={productImage.file} className="inline-block border border-primary border-3" style={{width: '50px', height: '50px'}}>                                            
                                <img onClick={() => setSelectedImage(productImage.file)} className="mx-auto p-1" src={""+Config[0].API_KEY_URL+"pub/media/catalog/product/"+productImage.file} alt="new" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                            </div>
                            :
                            <div key={productImage.file} className="inline-block" style={{width: '50px', height: '50px'}}>                                            
                                <img onClick={() => setSelectedImage(productImage.file)} className="mx-auto p-1" src={""+Config[0].API_KEY_URL+"pub/media/catalog/product/"+productImage.file} alt="new" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                            </div>
                            }
                        </div>
                    ))}                                    
                </div>
            </div>   
}

/*Center Column Product Details View Layout*/
const center_column_productImageView = (person) => {
    
    return <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
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
                    <div>
                        <i className="fa fa-heart fa-1x text-center" aria-hidden="true" id="icon"></i>  ADD TO WISHLIST
                    </div>
                    <div>                                        
                        <i className="fa fa-bar-chart fa-1x text-center" aria-hidden="true" id="icon"></i>  ADD TO COMPARE
                        &nbsp;&nbsp;&nbsp;&nbsp;                                        
                        <i className="fa fa-envelope fa-1x text-center" aria-hidden="true" id="icon"></i>  EMAIL                                        
                    </div>
                </div>
                                                                                                                
            </div>
}

/*Details and Review Tab Layout*/  
const detailsReviewTab = (person) => {
    return <div className="container py-4">
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
                                    <label className="form-control-label">Nickname <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="form-group-input" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
                                </div>
                                <div className="form-group col-lg-12">
                                    <label className="form-control-label">Summary <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="form-group-input" name="summary" value={summary} onChange={e => setSummary(e.target.value)} />
                                </div>
                                <div className="form-group col-lg-12">
                                    <label className="form-control-label">Review <span className="text-danger">*</span></label>
                                    <textarea className="form-control" id="form-group-input" name="review" rows="3" value={review} onChange={e => setReview(e.target.value)} ></textarea>
                                </div>
                                <div className="form-group col-lg-12">
                                    <button className="btn btn-outline-secondary btn-sm" type="button">Submit Review</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}



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
                          {/*Left Column to Product Image View*/}   
                          {left_column_productImageView(person)}
                                                                                    
                          {/*Center Column to Product Basic Details View*/}              
                          {center_column_productImageView(person)}
                                                    
                          {/*Right Column*/}   
                          <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">                                
                          </div>               
                        </div>

                        {/*Details and Review Tabs*/}
                        {detailsReviewTab(person)}                        
                          
                      </div>
                    
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
      </section>
  );
}

export default ProductDetails;
