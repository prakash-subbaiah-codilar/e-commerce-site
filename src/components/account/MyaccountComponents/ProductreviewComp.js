import React from 'react';

import MyaccountSidemenu from './MyaccountSidemenu';

import './Myaccount.css';

//Display Product Review content in My account page Page
const ProductreviewComp = (props) => {
  
//show the selected page content      
const handleMainContent = (data) => {  
    let url = "/account/"+data+"";  
    props.history.push(url);
  }
  

  return (
    <section>    
    <div className="row col-12 pt-3 p-2">
    <div className="col-12 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mx-auto">
        <MyaccountSidemenu handleMainContent={handleMainContent} content={"productreview"} />
    </div>    
    <div className="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto">
          <p id="title">My Product Reviews</p>                            
          <div class="alert alert-warning">
              <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have submitted no reviews.
          </div>
          </div>
    </div>    

</section>
  );
};

export default ProductreviewComp;