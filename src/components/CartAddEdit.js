import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { updateMultipleCartItems, getCartDetails, removeItemFromCart, updateCartItems } from "../actions/AddcartAction";

import getSymbolFromCurrency from 'currency-symbol-map';

import './CartAddEdit.css';

const CartAddEdit = () => {

  const dispatch = useDispatch();    
  const selector = useSelector(state => state);

  const [cartItemsList, setCartItemsList] = useState([]);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    setCartItemsList(selector.addcart.cartData);
      setCart(selector.addcart.cart);
      setItems(selector.addcart.items);
      setPrices(selector.addcart.prices);
  }, [selector.addcart.cartData]);

//Update Quantity input field value
  const handleQuantityChange = (e) => {    
    const updatedArray = [...items];
    let update_qty = Number(e.target.value)
    updatedArray[e.target.id].quantity = update_qty;
    setCart(updatedArray);   
}

//Update Multiple Cart Items Quantity
const updateCart = () => {  
  let data = [];
  {items.map((cartItem, i) => (        
    data.push({     
             cart_item_id: Number(cartItem.id),
             quantity: cartItem.quantity
          })      
        ))};
    dispatch(updateMultipleCartItems(selector.addcart.cartId, data));  
}

//Detele the cart from Add cart popup
const delete_cart_item = (cart_item_id) => {    
  var result = confirm("Are you sure you would like to remove this item from the shopping cart?");
  if (result) {
    dispatch(removeItemFromCart(selector.addcart.cartId, cart_item_id)); 
  }
}


  return (
            <div id="cartAddEdit">               
                <p className="p-3 text-secondary" id="shoppingCartTitle">Shopping Cart</p>
                <div className="row col-12">
                  <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
                    <div className="p-2">
                      <table className="table col-12">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th></th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="col-12">
                            {cartItemsList ?
                              <React.Fragment>
                                {(items.length == 0 || items == undefined) ?
                                    <tr className="text-center text-secondary pt-3 pb-3">No Items from cart.  </tr>
                                :
                                <React.Fragment>
                                  {items.map((cartItem, i) => (                                                                           
                                  <tr key={cartItem.id}>
                                    <th style={{width: '100px', height: '100px'}}>                                      
                                       <img className="mx-auto" src={cartItem.product.small_image.url} alt="new" style={{width: '100%', height: '100%', objectFit: 'contain'}} />                                      
                                    </th>
                                    <td>{cartItem.product.name}</td>
                                    <td><b>{getSymbolFromCurrency(cartItem.product.price.regularPrice.amount.currency)}&nbsp;{cartItem.product.price.regularPrice.amount.value}</b></td>
                                    <td>                                      
                                      <span className="pl-2">                                                         
                                                        <input type="text" id={i} className="p-1 text-center" style={{width: '50px', height: '30px'}}
                                                          value={cartItem.quantity} 
                                                          onChange={handleQuantityChange}
                                                         />                                                        
                                      </span>
                                    </td>
                                    <td><b>{getSymbolFromCurrency(cartItem.product.price.regularPrice.amount.currency)}&nbsp;{cartItem.product.price.regularPrice.amount.value * cartItem.quantity}</b><br />
                                    <div className="text-secondary">                                                                      
                                      <i className="fa fa-edit fa-1x p-2 pt-5 mt-2" aria-hidden="true" id="icon"></i>
                                      <i className="fa fa-trash fa-1x p-2 pt-5 mt-2" aria-hidden="true" id="icon" onClick={delete_cart_item.bind(this, cartItem.id)}></i>
                                    </div>                                    
                                    </td>
                                  </tr>    

                                  ))}
                                
                                </React.Fragment>                               
                                }
                              </React.Fragment>
                              :
                              <tr>Loading...</tr>
                            }
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="border border-left-0 border-top-1 border-right-0 border-bottom-0 p-2 text-right">
                      <button className="btn btn-sm btn-outline-secondary" onClick={updateCart}>Update Shopping Cart</button>
                    </div>
                    <div>
                      <p data-toggle="collapse" data-target="#applyCode">Apply Discount Code&nbsp;&nbsp;<i className="fa fa-angle-down fa-1x" aria-hidden="true" id="icon"></i></p>
                      <div className="collapse mb-5" id="applyCode">
                        <h6>Applied</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 colRight p-3">
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
                          </select>
                        </div>
                        <div class="form-group">
                          <label>State/Province</label>
                          <select class="form-control" name="Country">
                            <option>1</option>
                            <option>2</option>
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
                          <p className="float-right">{cartItemsList ? <span>{(items.length == 0 || items == undefined) ? null : <span>{getSymbolFromCurrency(cartItemsList.cart.prices.subtotal_excluding_tax.currency)} {cartItemsList.cart.prices.subtotal_excluding_tax.value}</span>}</span> : null }</p>
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
