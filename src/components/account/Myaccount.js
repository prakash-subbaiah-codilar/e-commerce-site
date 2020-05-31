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
          if(data == "addressbook"){
            setContent("addressbook");            
          }          
          if(data == "accountinfo"){
            setContent("accountinfo");            
          }          
          if(data == "productreview"){
            setContent("productreview");            
          }          
          if(data == "newsletter"){
            setContent("newsletter");            
          }

      }
  return (
      <section>
            <div className="">               
                <div className="row col-12 pt-3 p-2 m-2">
                    <div className="col-12 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mx-auto p-2" style={{backgroundColor: "#DCDCDC"}}>
                        <div className="mx-auto p-3">
                        {content === "myaccount" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "myaccount")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>My Account</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "myaccount")}>My Account</div>
                        }
                        
                        {content === "myorders" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "myorders")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>My Orders</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "myorders")}>My Orders</div>
                        }

                        {content === "downloadable" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "downloadable")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>My Downloadable Products</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "downloadable")}>My Downloadable Products</div>
                        }
                        
                        {content === "wishlist" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "wishlist")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>My Wish List</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "wishlist")}>My Wish List</div>
                        }
                        
                        
                        <hr className="text-dark m-0 mt-2 mb-2 p-2"></hr>

                        {content === "addressbook" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "addressbook")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>Address Book</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "addressbook")}>Address Book</div>
                        }
                        {content === "accountinfo" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "accountinfo")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>Account Information</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "accountinfo")}>Account Information</div>
                        }
                        <hr className="text-dark m-0 mt-2 mb-2 p-2"></hr>

                        {content === "productreview" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "productreview")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>My Product Reviews</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "productreview")}>My Product Reviews</div>
                        }

                        {content === "newsletter" ?
                        <div className="p-1" onClick={handleMainContent.bind(this, "newsletter")} style={{borderLeft: "3px solid red", marginLeft: "0px"}}>Newsletter Subscriptions</div>
                        :
                        <div className="p-1" onClick={handleMainContent.bind(this, "newsletter")}>Newsletter Subscriptions</div>
                        }
                        </div>
                    </div>

                    <div className="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto">
                        {content === "myaccount" ?
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
                        {content === "myorders"?
                        <div>
                            <p id="title">My Orders</p>
                            <div class="alert alert-warning">
                                <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have placed no orders.
                            </div>
                        </div>
                        :
                        null
                        }
 
                        {content === "downloadable"?
                        <div>
                            <p id="title">My Downloadable Products</p>
                            <div class="alert alert-warning">
                                <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have not purchased any downloadable products yet.
                            </div>
                        </div>
                        :
                        null
                        }
                        {content === "wishlist"?
                        <div>
                            <p id="title">My Wish List</p>
                            <div class="alert alert-warning">
                                <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have no items in your wish list.
                            </div>
                        </div>
                        :
                        null
                        }


                        {content === "addressbook" ?
                         <div>
                         <p id="title">Add New Address</p>

                         <div className="row">
                         <div className="col-6">
                         <p className="pt-3" id="subTitle">Contact Information</p>
                         <hr className="text-secondary m-0 p-2"></hr>
                                <div className="form-group">
                                    <label for="name">First Name&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group">
                                    <label for="name">Last Name&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group">
                                    <label for="name">Company</label>
                                    <input type="text" id="name" className="form-control form-control-sm"/>
                                </div>
                                <div className="form-group">
                                    <label for="name">Phone Number&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                         </div>
                         
                         <div className="col-6">
                         <p className="pt-3" id="subTitle">Address</p>
                         <hr className="text-secondary m-0 p-2"></hr>
                                <div className="form-group">
                                    <label for="name">Street Address&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm"/>
                                    <input type="text" id="name" className="form-control form-control-sm mt-3 mb-3"/>
                                    <input type="text" id="name" className="form-control form-control-sm mt-3 mb-3"/>
                                </div>
                                <div className="form-group">
                                    <label for="name">City&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group">
                                    <label for="gender">State/Province&nbsp;<span className="text-danger">*</span></label>
                                    <select id="gender" className="form-control">
                                    <option>Please select a region, state or province</option>                                    
                                    </select>
                                </div> 
                                <div className="form-group">
                                    <label for="name">Zip/Postal Code&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group">
                                    <label for="gender">Country&nbsp;<span className="text-danger">*</span></label>
                                    <select id="gender" className="form-control">
                                    <option>United States</option>                                    
                                    </select>
                                </div>
                         
                         </div>

                         </div>
                         <button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="submit">Save Address</button>

                        </div>
                        :
                        null
                        }

                        {content === "accountinfo"?
                        <div className="">
                            <p id="title">Edit Account Information</p>
                            
                            <p className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pt-3" id="subTitle">Account Information</p>                            
                            <hr className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-secondary m-0 p-0 pb-3"></hr>              
                            <form>                            
                                <div className="form-group col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <label for="name">First Name&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <label for="name">Last Name&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-check pb-4 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" />
                                        <small>Change Email</small>
                                    </label>
                                </div>
                                <div className="form-check pb-4 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" />
                                        <small>Change Password</small>
                                    </label>
                                </div>
                                <small>If you created this account using Amazon Pay, you might not know your site password. <span className="text-primary">Request a password to change your account password.</span></small>
                                <button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="submit">Save</button>
                            </form>
                        </div>
                        :
                        null
                        }

                        {content === "productreview"?
                        <div>
                            <p id="title">My Product Reviews</p>                            
                            <div class="alert alert-warning">
                                <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have submitted no reviews.
                            </div>
                        </div>
                        :
                        null
                        }

                        {content === "newsletter"?
                        <div>
                            <p id="title">Newsletter Subscription</p>                            
                            <p className="pt-3" id="subTitle">Subscription option</p>
                            <hr className="text-secondary m-0 p-2"></hr>
                            <form>
                            <div className="form-check pb-4">
                                <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" />
                                    <small>General Subscription</small>
                                </label>
                            </div>
                            <button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="submit">Save</button>
                            </form>
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
