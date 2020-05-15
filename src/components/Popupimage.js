import React from 'react';
import Config from './../../Config';//Get the API_KEY_URL
import './PopupModal.css';

/*Popup Image Layout*/
const Popupimage = (props) => {

  return (
            <div className="modal" id="myModal" style={{backgroundColor: '#fff',border: "none",color:"#000"}} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div className="p-3">
                <div className="float-left text-left text-dark p-2">                    
                    <a className="p-3 pointer"><i className="fa fa-plus fa-3x text-dark p-3" aria-hidden="true" id="icon" onClick={props.zoomin}></i></a>
                    <a className="p-3 pointer"><i className="fa fa-minus fa-3x text-dark p-3" aria-hidden="true" id="icon" onClick={props.zoomout}></i></a>
                </div>
                <div className="float-right text-right text-dark p-2"><button className="close float-right text-right text-dark" data-dismiss="modal"><h1>&times;</h1></button></div><br /><br />
                </div>
                 <div id="slider2" className="carousel slide mb-5" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                                {props.person.media_gallery_entries.map((productImage, i) => (                                                                     
                                    <React.Fragment>                                        
                                        {props.selectedImage === productImage.file ?                                                                                    
                                                <div key={productImage.file} className="carousel-item active">                                                     
                                                    <img className="modalImage d-block img-fluid" src={""+Config[0].API_KEY_URL+"pub/media/catalog/product/"+productImage.file} alt="First Slide" id={i} ref={props.imgRef} /*ref={(e) => props.imgRef1(e)}*/ />
                                                </div>                                                                                    
                                                :
                                                <div key={productImage.file} className="carousel-item">                                                    
                                                    <img className="modalImage d-block img-fluid" src={""+Config[0].API_KEY_URL+"pub/media/catalog/product/"+productImage.file} alt="First Slide" id={i}  ref={props.imgRef} />
                                                </div>                                                                                                                                
                                        }
                                    </React.Fragment>                                    
                                ))}              
                    </div>
                    <a href="#slider2" className="carousel-control-prev text-dark" data-slide="prev">                        
                        <i class="fa fa-angle-left fa-4x text-dark" aria-hidden="true" id="icon"></i>
                    </a>

                    <a href="#slider2" className="carousel-control-next" data-slide="next">
                        <i class="fa fa-angle-right fa-4x text-dark" aria-hidden="true" id="icon"></i>                        
                    </a>
                 </div>

                </div>
  );
};

export default Popupimage;