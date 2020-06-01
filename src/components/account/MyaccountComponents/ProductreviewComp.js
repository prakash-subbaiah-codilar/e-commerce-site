import React from 'react';

//Display Product Review content in My account page Page
const ProductreviewComp = () => {
  

  return (
      <div>
          <p id="title">My Product Reviews</p>                            
          <div class="alert alert-warning">
              <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have submitted no reviews.
          </div>
      </div>
  );
};

export default ProductreviewComp;