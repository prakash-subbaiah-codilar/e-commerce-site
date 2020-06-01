import React from 'react';

//Display the Myorders content in My account page Page
const MyordersComp = () => {
  

  return (
    <div>
        <p id="title">My Orders</p>
        <div class="alert alert-warning">
            <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have placed no orders.
        </div>
    </div>
  );
};

export default MyordersComp;