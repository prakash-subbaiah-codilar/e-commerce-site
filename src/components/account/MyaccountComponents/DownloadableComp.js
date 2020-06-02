import React from 'react';

import MyaccountSidemenu from './MyaccountSidemenu';

import './Myaccount.css';

//Display the Downloadable content in My account page Page
const DownloadableComp = (props) => {
  
//show the selected page content      
const handleMainContent = (data) => {  
  let url = "/account/"+data+"";  
  props.history.push(url);
}

  return (
    <section>    
        <div className="row col-12 pt-3 p-2 m-2">
        <MyaccountSidemenu handleMainContent={handleMainContent} content={"downloadable"} />
        <div className="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto">
        <p id="title">My Downloadable Products</p>
        <div class="alert alert-warning">
            <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have not purchased any downloadable products yet.
        </div>
    </div>
    </div>    

</section>
  );
};

export default DownloadableComp;