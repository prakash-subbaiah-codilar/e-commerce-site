import React, { useEffect } from 'react';
import './index.css';
import './AddCartPopup.css';

import { useDispatch, useSelector } from 'react-redux';

import { createEmptyCart, getCartDetails } from "../../actions/AddcartAction";


const Navigation = () => {

const dispatch = useDispatch();  
const selector = useSelector(state => state);

useEffect(() => {       
  //Call createEmptyCart function to create new cart id for guest 
  if(selector.addcart.cartId){
    console.log(selector.addcart.cartId);
    //localStorage.clear();
    dispatch(getCartDetails(selector.addcart.cartId));
  }else{
    dispatch(createEmptyCart());        
  }  
},[]);

const addCartPopup = () => {
  return <div className="modal col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 ml-auto" id="loginModal" style={{marginTop: '100px'}}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Cart</h5>
                  <button className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                You have no items in your shopping cart.  
                <br /><br />
                <h6>Guest CartID:  {selector.addcart.cartId}</h6>

                </div>                          
              </div>
            </div>
          </div>;
}
return (
<header id="header">

  {/*Top header with signin and signup*/}
  <div className="bg-secondary fixed-top pt-0 pb-0">
  <ul className="text-right text-light">    
    <a className="text-right"><button id="back" className="btn btn-sm text-light">Default welcome msg!</button></a>
    <a className="text-right"><button id="back" className="btn btn-sm text-light">Sign In</button></a>
    <a className="text-right"><button id="back" className="btn btn-sm text-light">Create an Account</button></a>
  </ul>
  </div>

{/*Middle header with search and Add cart section*/}
<nav className="navbar navbar-expand-sm navbar-light bg-light mt-5 pt-4 mb-0">
        <div className="container">
          <a className="navbar-brand" href="#">LUMA</a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">               

              <form className="form-inline my-2 my-lg-0">                                              
                  <div className="container mt-3">                    

                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Search" />
                      <div className="input-group-append bg-secondary">
                        <i className="fa fa-search fa-2x text-center text-light p-1" aria-hidden="true" id="icon"></i>
                      </div>
                    </div>
                    
                  </div>
                
              </form>
              <div className="p-2">
                <h6>
                  <i className="fa fa-shopping-cart fa-2x text-center pt-2" aria-hidden="true" id="icon" data-toggle="modal" data-target="#loginModal"></i> 
                </h6>

                  {addCartPopup()}
                                   
                
              </div>

              </ul>

            </div>
          </div>
    </nav>
    
    {/*Bottom Header with Menus by category*/}
    <div className="pt-2 pb-1" style={{backgroundColor: '#DCDCDC'}}>
      <ul className="text-left text-dark">        
        <a className="text-left p-2 pl-2 pr-2">Menu 1&nbsp;<i className="fa fa-angle-down fa-1x text-center" aria-hidden="true" id="icon"></i></a>
        <a className="text-left p-2 pl-2 pr-2">Menu 2&nbsp;<i className="fa fa-angle-down fa-1x text-center" aria-hidden="true" id="icon"></i></a>
        <a className="text-left p-2 pl-2 pr-2">Menu 3&nbsp;<i className="fa fa-angle-down fa-1x text-center" aria-hidden="true" id="icon"></i></a>
      </ul>
  </div>
  

</header>
)};

export default Navigation;
