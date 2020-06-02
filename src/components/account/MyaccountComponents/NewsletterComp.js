import React from 'react';

import MyaccountSidemenu from './MyaccountSidemenu';

import './Myaccount.css';

//Display Newsletter content in My account page Page
const NewsletterComp = (props) => {
  
//show the selected page content      
const handleMainContent = (data) => {  
    let url = "/account/"+data+"";  
    props.history.push(url);
  }
  

  return (
      <section>    
    <div className="row col-12 pt-3 p-2">
    <div className="col-12 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mx-auto">
      <MyaccountSidemenu handleMainContent={handleMainContent} content={"newsletter"} />
    </div>      
    <div className="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto">
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
    </div>    

</section>
  );
};

export default NewsletterComp;