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
                                        <span className="text-primary">Edit</span> | <span className="text-primary">Change Password</span>
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
                                    <span className="text-primary">Edit</span>
                                </div>
                            </div>

                            <p className="pt-3" id="subTitle">Address Book <span className="text-primary">Manage Addresses</span></p>
                            <hr className="text-secondary m-0 p-2"></hr>
                            
                            <div className="row">
                                <div className="col-6">
                                    <b>Default Billing Address</b>
                                    <span>You have not set a default billing address.</span>
                                    <br />
                                    <span className="text-primary">Edit Address</span>
                                </div>
                                <div className="col-6">
                                    <b>Default Shipping Address</b>
                                    You have not set a default shipping address.
                                    <br />
                                    <span className="text-primary">Edit Address</span>
                                </div>
                            </div>

                </div>
  );
};

export default MyaccountComp;
