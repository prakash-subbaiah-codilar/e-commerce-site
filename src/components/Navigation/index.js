import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { Link } from 'react-router-dom';

import CartButton from "../CartButton";
import { categoriesList } from "../../actions/MenusAction";


const Navigation = () => {
  
  const dispatch = useDispatch();    
  const selector = useSelector(state => state);
  
  const [categoryList, setCategoryList] = useState([]);  

  useEffect(() => {         
      dispatch(categoriesList(1));          
  },[]);
  
  useEffect(() => {    
    setCategoryList(selector.menus.categories);      
  }, [selector.menus.categories]);

return (
  
<header id="header">

  {/*Top header with signin and signup*/}
  <div className="bg-secondary fixed-top pt-0 pb-0">
  <ul className="text-right text-light">    
    <a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Default welcome msg!</button></a>
    <a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Sign In</button></a>
    <a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Create an Account</button></a>
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
                  {/*Cart Button Component*/}
                  <CartButton />
                </h6>

              </div>

              </ul>

            </div>
          </div>
    </nav>
    
    {/*Bottom Header with Menus by category*/}
    <div className="pt-2 pb-1" style={{backgroundColor: '#DCDCDC'}}>
      <ul className="text-left text-dark">        
      {categoryList.children_count >= 0 ? 
      <React.Fragment>
        {categoryList.children.slice(0).reverse().map((category, i) => (
          <Link to={"/category/"+category.id+""}><a className="text-left text-dark p-2 pl-2 pr-2">{category.name}&nbsp;<i className="fa fa-angle-down fa-1x text-center" aria-hidden="true" id="icon"></i></a></Link>
        ))}
      </React.Fragment>
      :
      <div>Loading</div>
      }        
      </ul>
  </div>
  

</header>
)};

export default Navigation;
