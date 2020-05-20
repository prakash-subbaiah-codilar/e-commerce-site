import React, { useState, useEffect } from 'react';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';

import { createEmptyCart, getCartDetails } from "../actions/AddcartAction";

import getSymbolFromCurrency from 'currency-symbol-map';

import './CartButton.css';

const CartButton = () => {
  
  const dispatch = useDispatch();  
  
  const selector = useSelector(state => state);
  
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const toggleClose = () => setPopoverOpen(!popoverOpen);

//Call createEmptyCart function to create new cart id for guest 
useEffect(() => {         
  if(selector.addcart.cartId){
    console.log(selector.addcart.cartId);
    //localStorage.clear();
    dispatch(getCartDetails(selector.addcart.cartId));
  }else{
    dispatch(createEmptyCart());        
  }  
},[selector.addcart.cartId]);


  return (            
            <div>
                <div className="row" id="Popover1">                    
                  <div className="text-left p-1"><i className="fa fa-shopping-cart fa-2x text-center pt-2" aria-hidden="true" id="icon" data-toggle="modal" data-target="#loginModal"></i> </div>
                  <div className="text-right p-1 pt-3">{selector.addcart.cartData.cart ? <div className="text-light bg-danger pl-2 pt-1 pr-2 pb-1">{selector.addcart.cartData.cart.items.length == 0 ? null : selector.addcart.cartData.cart.items.length}</div> : null }</div>
                </div>
                <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>                
                <PopoverBody>
                    <span className="float-right">
                      <i className="fa fa-times fa-1x text-secondary pointer" aria-hidden="true" id="icon" onClick={toggleClose}></i>                      
                    </span>

                    <div>                        
                        {selector.addcart.cartData.cart  ?
                            <div>
                                {selector.addcart.cartData.cart.items.length == 0 ?
                                <div className="text-center text-secondary pt-3 pb-3">You have no items in your shopping cart.  </div>
                                :
                                <div className="pt-3 p-2">
                                    {/*<h6>Guest CartID:  {selector.addcart.cartId}</h6>*/}
                                    
                                    <div className="clearfix p-2">
                                        <div className="float-left">{selector.addcart.cartData.cart.items.length == 1 ? <div>1 Item in Cart</div> : <div>{selector.addcart.cartData.cart.items.length} Items in cart</div>}</div>
                                        <div className="float-right text-right">Cart Subtotal: <br />  <b>{getSymbolFromCurrency(selector.addcart.cartData.cart.prices.subtotal_excluding_tax.currency)} {selector.addcart.cartData.cart.prices.subtotal_excluding_tax.value}</b></div>
                                    </div>                                  
                                    <div className="text-center p-2">
                                        <button className="btn btn-primary btn-lg" type="button"> Proceed to Checkout </button>
                                    </div>      
                                    <hr className="text-secondary p-2"></hr>
                                </div>
                                }
                            </div>
                        :                            
                            <div className="mx-auto text-center pt-3 pb-3"><img style={{width:50, height:50}} src={require('./loading_spinner.gif')} alt="new" /></div>                
                        }
                    </div>
                                            
                    
                </PopoverBody>
                </Popover>
            </div>            
  );
};

export default CartButton;
