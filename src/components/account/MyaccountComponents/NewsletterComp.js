import React from 'react';

//Display Newsletter content in My account page Page
const NewsletterComp = () => {
  

  return (
      <div>
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
  );
};

export default NewsletterComp;