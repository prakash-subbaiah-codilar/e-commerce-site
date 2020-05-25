import React from 'react';
import Config from './../../Config';//Get the API_KEY_URL
import './Popupimage.css';

//Popup Image Layout for Product Details Page
const Popupimage = (props) => {

  return (
            <div className="modal" id="myModal" style={{backgroundColor: '#fff',border: "none",color:"#000"}} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="p-3">
                <div className="float-left text-left text-dark p-1">                    
                    <a className="p-2"><i className="fa fa-plus fa-3x text-dark pointer pl-2 pr-2" aria-hidden="true" id="icon" onClick={props.zoomin}></i></a>
                    <a className="p-2"><i className="fa fa-minus fa-3x text-dark pointer pl-2 pr-2" aria-hidden="true" id="icon" onClick={props.zoomout}></i></a>
                </div>
                <div className="float-right text-right text-dark p-1">
                    <a className="p-2"><i className="fa fa-times fa-2x text-secondary pointer" aria-hidden="true" id="icon" data-dismiss="modal"></i></a>                    
                </div><br /><br />
                </div>
                 <div id="slider2" className="carousel slide mb-5" data-ride="carousel" data-interval="false">
                    <div className="carousel-inner" role="listbox">
                                {props.person.media_gallery_entries.map((productImage, i) => (                                                                     
                                    <React.Fragment key={productImage.file}>                                        
                                                <div key={productImage.file} className={props.selectedImage === productImage.file ? "carousel-item active" : "carousel-item"}> 
                                                    <img className="modalImage d-block img-fluid" src={""+Config[0].API_KEY_URL+"pub/media/catalog/product/"+productImage.file} alt="First Slide" id={i} ref={props.imgRef} />
                                                </div>                                        
                                    </React.Fragment>                                    
                                ))}              
                    </div>
                    <a href="#slider2" className="carousel-control-prev text-dark" data-slide="prev">                        
                        <i className="fa fa-angle-left fa-4x text-dark" aria-hidden="true" id="icon"></i>
                    </a>

                    <a href="#slider2" className="carousel-control-next" data-slide="next">
                        <i className="fa fa-angle-right fa-4x text-dark" aria-hidden="true" id="icon"></i>                        
                    </a>
                 </div>

                </div>
  );
};

export default Popupimage;
