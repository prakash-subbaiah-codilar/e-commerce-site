import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import './Myaccount.css';

//Static My Account Page
const Myaccount = (props) => {
    
    const dispatch = useDispatch();  
    const selector = useSelector(state => state);

    const [content, setContent] = useState("myaccount");

    useEffect(() => {         
        if(!selector.auth.customerToken){
            props.history.push("/");
        }
      },[selector.auth.customerToken]);

      const handleMainContent = (data) => {
          if(data == "myaccount"){
              setContent("myaccount");
          }
          if(data == "myorders"){            
            setContent("myorders");            
          }
          if(data == "downloadable"){
            setContent("downloadable");            
          }
          if(data == "downloadable"){
            setContent("downloadable");            
          }
          if(data == "wishlist"){
            setContent("wishlist");            
          }

      }
  return (
      <section>
            <div className="">               
                <div className="row col-12 pt-3 p-2 m-2">
                    <div className="col-12 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mx-auto p-2" style={{backgroundColor: "#DCDCDC"}}>
                        <div className="mx-auto p-3">
                        {content == "myaccount" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "myaccount")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>My Account</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "myaccount")}>My Account</div>
                        }
                        
                        {content == "myorders" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "myorders")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>My Orders</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "myorders")}>My Orders</div>
                        }

                        {content == "downloadable" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "downloadable")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>My Downloadable Products</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "downloadable")}>My Downloadable Products</div>
                        }
                        
                        {content == "wishlist" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "wishlist")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>My Wish List</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "wishlist")}>My Wish List</div>
                        }
                        
                        <hr className="text-dark m-0 p-2"></hr>
                        <div className="p-1">Address Book</div>
                        
                        <div className="p-1">Account Information</div>
                        <hr className="text-dark m-0 p-2"></hr>
                        <div className="p-1">My Product Reviews</div>
                        
                        <div className="p-1">Newsletter Subscriptions</div>
                        </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto">
                        {content == "myaccount" ?
                        <div>
                            <p id="title">My Account</p>

                            <p className="pt-3" id="subTitle">Account Information</p>
                            <hr className="text-secondary m-0 p-2"></hr>
                            <div className="row">
                                <div className="col-6">
                                    <b>Contact Information</b>
                                </div>
                                <div className="col-6">
                                    <b>Newsletters</b>
                                </div>
                            </div>

                            <p className="pt-3" id="subTitle">Address Book</p>
                            <hr className="text-secondary m-0 p-2"></hr>
                            
                            <div className="row">
                                <div className="col-6">
                                    <b>Default Billing Address</b>
                                </div>
                                <div className="col-6">
                                    <b>Default Shipping Address</b>
                                </div>
                            </div>

                        </div>
                        :
                        null
                        }
                        {content == "myorders"?
                        <div>
                            <p id="title">My Orders</p>
                            <div class="alert alert-warning">
                                <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have placed no orders.
                            </div>
                        </div>
                        :
                        null
                        }
 
                        {content == "downloadable"?
                        <div>
                            <p id="title">My Downloadable Products</p>
                            <div class="alert alert-warning">
                                <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have not purchased any downloadable products yet.
                            </div>
                        </div>
                        :
                        null
                        }
                        {content == "wishlist"?
                        <div>
                            <p id="title">My Wish List</p>
                            <div class="alert alert-warning">
                                <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have no items in your wish list.
                            </div>
                        </div>
                        :
                        null
                        }

                    </div>
                </div>    

            </div>
    </section>
  );
};

export default Myaccount;
