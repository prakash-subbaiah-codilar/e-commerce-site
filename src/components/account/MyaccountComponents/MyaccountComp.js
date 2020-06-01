import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { customerDetail } from "../../../actions/MyaccountAction";

//Display the My account content in My account page Page
const MyaccountComp = (props) => {
    const dispatch = useDispatch();  
    const selector = useSelector(state => state);

    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {                                                 
        dispatch(customerDetail(selector.auth.customerToken));                
        setCustomerData(selector.myaccount.customerDetail);
      }, [selector.myaccount.customerDetail]);

  return (
              <div>
                            <p id="title">My Account</p>

                            <p className="pt-3" id="subTitle">Account Information</p>
                            <hr className="text-secondary m-0 p-2"></hr>
                            <div className="row">
                                <div className="col-6">
                                    <b>Contact Information</b>
                                    {customerData ?
                                    <React.Fragment>
                                        <br />
                                        <span>{customerData.firstname} {customerData.lastname}</span>
                                        <br />
                                        <span>{customerData.email}</span>
                                        <br />
                                        <span className="text-primary" onClick={props.handleMainContent.bind(this, "accountinfo")}>Edit</span> | <span className="text-primary" onClick={props.handleMainContent.bind(this, "accountinfo")}>Change Password</span>
                                    </React.Fragment>
                                    :
                                    <small>loading...</small>
                                    }
                                </div>
                                <div className="col-6">
                                    <b>Newsletters</b>
                                    <br />
                                    <span>You are subscribed to "General Subscription".</span>
                                    <br />
                                    <span className="text-primary" onClick={props.handleMainContent.bind(this, "newsletter")}>Edit</span>
                                </div>
                            </div>

                            <p className="pt-3" id="subTitle">Address Book <span className="text-primary" onClick={props.handleMainContent.bind(this, "addressbook")}>Manage Addresses</span></p>
                            <hr className="text-secondary m-0 p-2"></hr>
                            
                            <div className="row">
                                <div className="col-6">
                                    <b>Default Billing Address</b>
                                    <br />
                                    <span>You have not set a default billing address.</span>
                                    <br />
                                    <span className="text-primary" onClick={props.handleMainContent.bind(this, "addressbook")}>Edit Address</span>
                                </div>
                                <div className="col-6">
                                    <b>Default Shipping Address</b>
                                    <br />
                                    <span>You have not set a default shipping address.</span>
                                    <br />
                                    <span className="text-primary" onClick={props.handleMainContent.bind(this, "addressbook")}>Edit Address</span>
                                </div>
                            </div>

                </div>
  );
};

export default MyaccountComp;
