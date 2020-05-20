import React from 'react';
//import Config from './../../Config';//Get the API_KEY_URL

import './CartAddEdit.css';

const CartAddEdit = () => {

  return (
            <div>               
                <p className="p-3 text-secondary" id="shoppingCartTitle">Shopping Cart</p>
                <div className="row col-12">
                  <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
                    <div className="p-2">
                      <table className="table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                <tr>
                                    <th>Image</th>
                                    <td>$489.00</td>
                                    <td>Doe</td>
                                    <td>$489.00</td>
                                </tr>                               
                            </tbody>
                        </table>
                    </div>
                    <div className="ml-auto text-secondary text-right">
                    <i className="fa fa-edit fa-2x p-2" aria-hidden="true" id="icon"></i>
                    <i className="fa fa-trash fa-2x p-2" aria-hidden="true" id="icon"></i>
                    </div>
                    <div className="border border-left-0 border-top-1 border-right-0 border-bottom-0 p-2 text-right">
                      <button className="btn btn-sm btn-outline-secondary">Update Shopping Cart</button>
                    </div>
                    <div>
                      <p data-toggle="collapse" data-target="#applyCode">Apply Discount Code&nbsp;&nbsp;<i className="fa fa-angle-down fa-1x" aria-hidden="true" id="icon"></i></p>
                      <div className="collapse mb-5" id="applyCode">
                        <h6>Applied</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 colRight p-2">
                    <p className="p-1 text-secondary" id="summaryTitle">Summary</p>
                    <hr className="text-secondary p-2"></hr> 
                    <div>
                      <p data-toggle="collapse" data-target="#estimateShipping">Estimate Shipping and Tax&nbsp;<i className="fa fa-angle-down fa-1x float-right text-right" aria-hidden="true" id="icon"></i></p>
                      <div className="collapse mb-5" id="estimateShipping">      
                        <p>Enter your destination to get a shipping estimate.</p>      
                        <div class="form-group">
                          <label>Country</label>
                          <select class="form-control" name="Country">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label>State/Province</label>
                          <select class="form-control" name="Country">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label>Zip/Postal Code</label>    
                          <input type="text" class="form-control" name="postalcode" />                      
                        </div>
                      </div>      
                    </div>                                                                  

                    <hr className="text-secondary p-2"></hr>                   
                    <div className="clearfix">
                        <p className="float-left">Subtotal</p>
                        <p className="float-right">$1,199.00</p>
                    </div>  
                    <div className="clearfix">
                        <p className="float-left">Shipping (Flat Rate - Fixed)</p>
                        <p className="float-right">$5.00</p>
                    </div>                    
                                        
                    <hr className="text-secondary p-2"></hr>
                    <div className="clearfix">
                        <p className="float-left">Order Total</p>
                        <p className="float-right">$1,204.00</p>
                    </div>                                        
                    <div className="text-center p-2">
                    <button className="btn btn-primary btn-lg" type="button"> Proceed to Checkout </button>
                    </div>
                  </div>
                </div>
            </div>
  );
};

export default CartAddEdit;
