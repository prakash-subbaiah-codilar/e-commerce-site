import React from 'react';

import MyaccountSidemenu from './MyaccountSidemenu';

import './Myaccount.css';

//Display the WishlistComp content in My account page Page
const WishlistComp = (props) => {
  
//show the selected page content      
const handleMainContent = (data) => {  
  let url = "/account/"+data+"";  
  props.history.push(url);
}


  return (
    <section>    
        <div className="row col-12 pt-3 p-2">
        <div className="col-12 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mx-auto">
          <MyaccountSidemenu handleMainContent={handleMainContent} content={"wishlist"} />
        </div>        
        <div className="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto">
        <p id="title">My Wish List</p>
        <div class="alert alert-warning">
            <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have no items in your wish list.
            </div>
    </div>
    </div>    

</section>
  );
};

export default WishlistComp;