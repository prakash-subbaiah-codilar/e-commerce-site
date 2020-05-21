import React, { useState, useEffect } from 'react';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';

import { createEmptyCart, getCartDetails, removeItemFromCart } from "../actions/AddcartAction";

import getSymbolFromCurrency from 'currency-symbol-map';

import './CartButton.css';

import { Link } from 'react-router-dom';

const CartButton = (props) => {
  
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

//Detele the cart from Add cart popup
const delete_cart_item = (cart_item_id) => {    
  var result = confirm("Are you sure you would like to remove this item from the shopping cart?");
  if (result) {
    dispatch(removeItemFromCart(selector.addcart.cartId, cart_item_id)); 
  }
}

  return (            
            <div>
                <div className="row" id="Popover1">                    
                    <div className="text-left p-1"><i className="fa fa-shopping-cart fa-2x text-center pt-2" aria-hidden="true" id="icon"></i> </div>
                    <div className="text-right p-1 pt-3">{selector.addcart.cartData.cart ? <div>{selector.addcart.cartData.cart.items.length == 0 ? null : <div className="text-light bg-danger pl-2 pt-1 pr-2 pb-1">{selector.addcart.cartData.cart.items.length}</div>}</div> : null }</div>
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
                                    
                                    <div className="clearfix p-1">
                                        <div className="float-left">{selector.addcart.cartData.cart.items.length == 1 ? <div>1 Item in Cart</div> : <div>{selector.addcart.cartData.cart.items.length} Items in cart</div>}</div>
                                        <div className="float-right text-right">Cart Subtotal: <br />  <b>{getSymbolFromCurrency(selector.addcart.cartData.cart.prices.subtotal_excluding_tax.currency)} {selector.addcart.cartData.cart.prices.subtotal_excluding_tax.value}</b></div>
                                    </div>                                  
                                    <div className="text-center p-1">
                                        <button className="btn btn-primary btn-lg" type="button"> Proceed to Checkout </button>
                                    </div>      

                                    <hr className="text-secondary p-1"></hr>
                                    
                                    {selector.addcart.cartData.cart.items.map((cartItem, i) => (                                       
                                      <div id={cartItem.id}>
                                        <div className="row">
                                          <div className="col-4">
                                            <div style={{width: '75px', height: '75px'}}>                                            
                                              <img className="mx-auto" src={cartItem.product.small_image.url} alt="new" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                                            </div>
                                          </div>
                                          <div className="col-8">
                                            <p className="m-0">{cartItem.product.name}</p>
                                            <p className="m-0"><b>{getSymbolFromCurrency(cartItem.product.price.regularPrice.amount.currency)}&nbsp;{cartItem.product.price.regularPrice.amount.value}</b></p>
                                            <p className="m-0">
                                              Qty: <span className="pl-2"><input type="text" value={cartItem.quantity} className="p-1 text-center" style={{width: '50px', height: '30px'}}/></span>
                                              <div className="ml-auto text-secondary text-right">
                                                <i className="fa fa-edit fa-1x pl-2 pr-2" aria-hidden="true" id="icon"></i>
                                                <i className="fa fa-trash fa-1x pl-2 pr-2" aria-hidden="true" id="icon" onClick={delete_cart_item.bind(this, cartItem.id)}></i>
                                              </div>
                                              </p>                                           
                                          </div>                                                                                                                                                                                                                                                                                                 

                                      </div>                                      
                                      <hr className="text-secondary p-1"></hr>                                      
                                      
                                      </div>
                                    ))}
                                    <p className="text-center text-primary m-0" onClick={toggleClose}><Link to={"/checkout/cart"}>View and Edit Cart</Link></p>                                    
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
