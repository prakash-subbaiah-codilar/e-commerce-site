import React, { useState, useEffect } from 'react';

import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';

import { createEmptyCart, getCartDetails, removeItemFromCart, updateCartItems } from "../actions/AddcartAction";

import getSymbolFromCurrency from 'currency-symbol-map';

import './CartButton.css';

import { Link } from 'react-router-dom';

const CartButton = (props) => {
  
  const dispatch = useDispatch();  
  
  const selector = useSelector(state => state);
  
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [cartItemsList, setCartItemsList] = useState([]);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);
  
//Open and close Popover Cart function
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

useEffect(() => {
  setCartItemsList(selector.addcart.cartData);
    setCart(selector.addcart.cart);
    setItems(selector.addcart.items);
    setPrices(selector.addcart.prices);
}, [selector.addcart.cartData]);

//Detele the cart from Add cart popup
const delete_cart_item = (cart_item_id) => {    
  var result = confirm("Are you sure you would like to remove this item from the shopping cart?");
  if (result) {
    dispatch(removeItemFromCart(selector.addcart.cartId, cart_item_id)); 
  }
}
//Update Quantity input field value
const handleQuantityChange = (e) => {    
    const updatedArray = [...items];
    updatedArray[e.target.id].quantity = e.target.value;
    setCart(updatedArray);   
}

//Update Cart Items Quantity
const updateCart = (qty, cart_item_id) => {
  dispatch(updateCartItems(selector.addcart.cartId, cart_item_id, qty));
  toggleClose();
}

//Cart Item List Layout
const cartList = () => {
  return <div>
    {items.map((cartItem, i) => (                                       
    <div key={cartItem.id}>
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
            Qty: <span className="pl-2">                                                         
                      <input type="text" id={i} className="p-1 text-center" style={{width: '50px', height: '30px'}}
                        value={cartItem.quantity} 
                        onChange={handleQuantityChange}
                       />
                      <button className="btn btn-sm btn-secondary ml-1" onClick={updateCart.bind(this, cartItem.quantity, cartItem.id )}>Update</button>
                 </span>
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
</div>
}

  return (            
            <div>
                <div className="row" id="Popover1">                    
                    <div className="text-left p-1"><i className="fa fa-shopping-cart fa-2x text-center pt-2" aria-hidden="true" id="icon"></i> </div>
                    <div className="text-right p-1 pt-3">{cartItemsList ? <div>{(items.length == 0 || items == undefined) ? null : <div className="text-light bg-danger pl-2 pt-1 pr-2 pb-1">{items.length}</div>}</div> : null }</div>
                </div>
                <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>                
                <PopoverBody>
                    <span className="float-right">
                      <i className="fa fa-times fa-1x text-secondary pointer" aria-hidden="true" id="icon" onClick={toggleClose}></i>                      
                    </span>

                    <div>                        
                        {cartItemsList ?
                            <div>
                                {(items.length == 0 || items == undefined) ?
                                <div className="text-center text-secondary pt-3 pb-3">You have no items in your shopping cart.  </div>
                                :
                                <div className="pt-3 p-2">                        
                                    
                                    <div className="clearfix p-1">
                                        <div className="float-left">{items.length == 1 ? <div>1 Item in Cart</div> : <div>{items.length} Items in cart</div>}</div>
                                        <div className="float-right text-right">Cart Subtotal: <br />  <b>{getSymbolFromCurrency(cartItemsList.cart.prices.subtotal_excluding_tax.currency)} {cartItemsList.cart.prices.subtotal_excluding_tax.value}</b></div>
                                    </div>                                  
                                    <div className="text-center p-1">
                                        <button className="btn btn-primary btn-lg" type="button"> Proceed to Checkout </button>
                                    </div>      

                                    <hr className="text-secondary p-1"></hr>                                    

                                    {/*Cart Item List Layout*/}
                                    {cartList()}                                 

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
