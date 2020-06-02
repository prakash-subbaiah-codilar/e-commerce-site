import React from 'react';

import MyaccountSidemenu from './MyaccountSidemenu';

import './Myaccount.css';

//Display the Myorders content in My account page Page
const MyordersComp = (props) => {

//show the selected page content      
const handleMainContent = (data) => {  
  let url = "/account/"+data+"";  
  props.history.push(url);
}


  return (
    <section>
                
        <div className="row col-12 pt-3 p-2 m-2">
        <MyaccountSidemenu handleMainContent={handleMainContent} content={"myorders"} />
        <div className="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto">
        <p id="title">My Orders</p>
        <div class="alert alert-warning">
            <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have placed no orders.
        </div>
    </div>
    </div>    

</section>
  );
};

export default MyordersComp;