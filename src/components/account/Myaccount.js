import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import AccountinfoComp from './MyaccountComponents/AccountinfoComp';
import AddressbookComp from './MyaccountComponents/AddressbookComp';
import DownloadableComp from './MyaccountComponents/DownloadableComp';
import MyaccountComp from './MyaccountComponents/MyaccountComp';
import MyordersComp from './MyaccountComponents/MyordersComp';
import NewsletterComp from './MyaccountComponents/NewsletterComp';
import ProductreviewComp from './MyaccountComponents/ProductreviewComp';
import WishlistComp from './MyaccountComponents/WishlistComp';

import { customerDetail } from "../../actions/MyaccountAction";

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

//show the selected page content      
const handleMainContent = (data) => {
    setContent(data);         
}

//My account sidemenu layout
const myAccountSideMenu = () => {
    return <div className="col-12 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mx-auto p-2" style={{backgroundColor: "#DCDCDC"}}>
                <div className="mx-auto p-3">                

                <div className={(content === "myaccount") ? "p-1 selectSideButton" : "p-1"} onClick={handleMainContent.bind(this, "myaccount")}>My Account</div>                                                
                
                <div className={(content === "myorders") ? "p-1 selectSideButton" : "p-1"} onClick={handleMainContent.bind(this, "myorders")}>My Orders</div>                        

                <div className={(content === "downloadable") ? "p-1 selectSideButton" : "p-1"} onClick={handleMainContent.bind(this, "downloadable")}>My Downloadable Products</div>
                
                <div className={(content === "wishlist") ? "p-1 selectSideButton" : "p-1"} onClick={handleMainContent.bind(this, "wishlist")}>My Wish List</div>                       
                                        
                <hr className="text-dark m-0 mt-2 mb-2 p-2"></hr>

                <div className={(content === "addressbook") ? "p-1 selectSideButton" : "p-1"} onClick={handleMainContent.bind(this, "addressbook")}>Address Book</div>
                
                <div className={(content === "accountinfo") ? "p-1 selectSideButton" : "p-1"} onClick={handleMainContent.bind(this, "accountinfo")}>Account Information</div>
                
                <hr className="text-dark m-0 mt-2 mb-2 p-2"></hr>

                <div className={(content === "productreview") ? "p-1 selectSideButton" : "p-1"} onClick={handleMainContent.bind(this, "productreview")}>My Product Reviews</div>                        

                <div className={(content === "newsletter") ? "p-1 selectSideButton" : "p-1"} onClick={handleMainContent.bind(this, "newsletter")}>Newsletter Subscriptions</div>                        

                </div>
            </div>
};

//My account main content layout
const myAccountMainContent = () => {
    return <div className="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto">

                {content === "myaccount" ? <MyaccountComp /> : null}                

                {content === "myorders"? <MyordersComp /> : null}

                {content === "downloadable"? <DownloadableComp /> : null}

                {content === "wishlist"? <WishlistComp /> : null}

                {content === "addressbook" ? <AddressbookComp /> : null}

                {content === "accountinfo"? <AccountinfoComp /> : null}

                {content === "productreview"? <ProductreviewComp /> : null}

                {content === "newsletter"? <NewsletterComp /> : null}
            </div>
};

return (
      <section>
            <div className="">               
                <div className="row col-12 pt-3 p-2 m-2">
                    {/*My account sidemenu content*/}
                    {myAccountSideMenu()}
                    {/*My account main content*/}
                    {myAccountMainContent()}                    
                </div>    

            </div>
    </section>
  );
};

export default Myaccount;
