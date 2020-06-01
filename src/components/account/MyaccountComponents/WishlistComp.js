import React from 'react';

//Display the WishlistComp content in My account page Page
const WishlistComp = () => {
  

  return (
    <div>
        <p id="title">My Wish List</p>
        <div class="alert alert-warning">
            <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have no items in your wish list.
        </div>
    </div>
  );
};

export default WishlistComp;