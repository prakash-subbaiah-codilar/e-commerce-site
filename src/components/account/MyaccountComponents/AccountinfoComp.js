import React from 'react';

//Display Account info content in My account page Page
const AccountinfoComp = () => {
  

  return (
                    <div className="">
                            <p id="title">Edit Account Information</p>
                            
                            <p className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pt-3" id="subTitle">Account Information</p>                            
                            <hr className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-secondary m-0 p-0 pb-3"></hr>              
                            <form>                            
                                <div className="form-group col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <label for="name">First Name&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <label for="name">Last Name&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-check pb-4 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" />
                                        <small>Change Email</small>
                                    </label>
                                </div>
                                <div className="form-check pb-4 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" />
                                        <small>Change Password</small>
                                    </label>
                                </div>
                                <small>If you created this account using Amazon Pay, you might not know your site password. <span className="text-primary">Request a password to change your account password.</span></small>
                                <button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="submit">Save</button>
                            </form>
                        </div>
  );
};

export default AccountinfoComp;