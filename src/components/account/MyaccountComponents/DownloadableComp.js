import React from 'react';

//Display the Downloadable content in My account page Page
const DownloadableComp = () => {
  

  return (
    <div>
        <p id="title">My Downloadable Products</p>
        <div class="alert alert-warning">
            <strong><i className="fa fa-exclamation-triangle" aria-hidden="true" id="icon" style={{fontSize: "22px"}}></i></strong> You have not purchased any downloadable products yet.
        </div>
    </div>
  );
};

export default DownloadableComp;