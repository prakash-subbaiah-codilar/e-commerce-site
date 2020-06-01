import React from 'react';

//Display Address book content in My account page Page
const AddressbookComp = () => {
  

  return (
    <div>
                         <p id="title">Add New Address</p>

                         <div className="row">
                         <div className="col-6">
                         <p className="pt-3" id="subTitle">Contact Information</p>
                         <hr className="text-secondary m-0 p-2"></hr>
                                <div className="form-group">
                                    <label for="name">First Name&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group">
                                    <label for="name">Last Name&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group">
                                    <label for="name">Company</label>
                                    <input type="text" id="name" className="form-control form-control-sm"/>
                                </div>
                                <div className="form-group">
                                    <label for="name">Phone Number&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                         </div>
                         
                         <div className="col-6">
                         <p className="pt-3" id="subTitle">Address</p>
                         <hr className="text-secondary m-0 p-2"></hr>
                                <div className="form-group">
                                    <label for="name">Street Address&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm"/>
                                    <input type="text" id="name" className="form-control form-control-sm mt-3 mb-3"/>
                                    <input type="text" id="name" className="form-control form-control-sm mt-3 mb-3"/>
                                </div>
                                <div className="form-group">
                                    <label for="name">City&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group">
                                    <label for="gender">State/Province&nbsp;<span className="text-danger">*</span></label>
                                    <select id="gender" className="form-control">
                                    <option>Please select a region, state or province</option>                                    
                                    </select>
                                </div> 
                                <div className="form-group">
                                    <label for="name">Zip/Postal Code&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group">
                                    <label for="gender">Country&nbsp;<span className="text-danger">*</span></label>
                                    <select id="gender" className="form-control">
                                    <option>United States</option>                                    
                                    </select>
                                </div>
                         
                         </div>

                         </div>
                         <button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="submit">Save Address</button>

                        </div>
  );
};

export default AddressbookComp;