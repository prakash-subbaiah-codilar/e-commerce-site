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

const nestedMenu3 = (categoryLevel) => {
    return <React.Fragment>
            {categoryLevel.children.length >= 0 ?
                  <React.Fragment>
                  {categoryLevel.children.slice(0).reverse().map((categoryLevelNext, i) => (
                    <React.Fragment>
                    <Link to={"/category/"+categoryLevelNext.id+""}>
                      <a className="dropdown-item text-left bg-red text-dark p-2 pl-2 pr-2">{categoryLevelNext.name}&nbsp;<i className="fa fa-angle-down fa-1x text-center" aria-hidden="true" id="icon"></i></a>                    
                    </Link>
                    {nestedMenu3(categoryLevelNext)}
                    </React.Fragment>
                  ))}
                  </React.Fragment>
                  :
                  null
                  }
    </React.Fragment>
  };

  
const nestedMenu2 = (categoryLevel) => {
  return <React.Fragment>
          {categoryLevel.children.length >= 0 ?
                <React.Fragment>
                {categoryLevel.children.slice(0).reverse().map((categoryLevelNext, i) => (
                  <React.Fragment>
                  <Link to={"/category/"+categoryLevelNext.id+""}>
                    <a className="dropdown-item text-left bg-red text-dark p-2 pl-2 pr-2">{categoryLevelNext.name}{/*&nbsp;<i className="fa fa-angle-down fa-1x text-center" aria-hidden="true" id="icon"></i>*/}</a>                    
                  </Link>
                  {nestedMenu3(categoryLevelNext)}
                  </React.Fragment>
                ))}
                </React.Fragment>
                :
                null
                }
  </React.Fragment>
};

const nestedMenu1 = (categoryLevel, id) => {
  return <React.Fragment>
          {categoryLevel.children.length >= 0 ?
                <React.Fragment>
                  <div className="dropdown-menu" aria-labelledby={id}>
                  <Link to={"/category/"+categoryLevel.id+""} className="dropdown-item text-left text-dark p-2 pl-2 pr-2"><h6>All {categoryLevel.name}</h6></Link>
                {categoryLevel.children.slice(0).reverse().map((categoryLevelNext, i) => (
                  <React.Fragment>
                    <Link to={"/category/"+categoryLevelNext.id+""} className="dropdown-item text-left text-dark p-2 pl-2 pr-2">
                      <b>{categoryLevelNext.name}{/*&nbsp;<i className="fa fa-angle-down fa-1x text-center" aria-hidden="true" id="icon"></i>*/}</b>
                    </Link>
                  {nestedMenu2(categoryLevelNext)}
                  </React.Fragment>                
                ))}
                </div>
                </React.Fragment>                
                :
                null
                }
  </React.Fragment>
};

          

return (
  
<header id="header">

  {/*Top header with signin and signup*/}
  <div className="bg-secondary fixed-top pt-0 pb-0" id="top">
          <ul className="text-right text-light">    
            <a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Default welcome msg!</button></a>
            <a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Sign In</button></a>
            <a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Create an Account</button></a>
          </ul>
        </div>
{/*Middle header with search and Add cart section*/}
<nav className="navbar navbar-expand-sm navbar-light bg-light mt-5 pt-4 mb-0">       

        <div className="container">
        <Link to={"/"}><a className="navbar-brand text-dark">LUMA</a></Link>
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
    
<nav className="navbar navbar-expand-sm navbar-light p-2 mb-3 bg-secondary">
  <div className="col-12">            
      <ul className="navbar-nav">                  
          {categoryList.children_count >= 0 ? 
            <React.Fragment>
              {categoryList.children.slice(0).reverse().map((categoryLevel1, i) => (
                <React.Fragment>
                  <li className="nav-item dropdown">                                                   
                  <a className="nav-link dropdown-toggle text-light" data-toggle="dropdown">{categoryLevel1.name}</a>                                                    
                    {nestedMenu1(categoryLevel1, categoryLevel1.id)}                                                  
                  </li>
                </React.Fragment>
              ))}        
            </React.Fragment>
            :
            <div>Loading</div>
            }                                            
      </ul>
  </div>
</nav>  

</header>
)};

export default Navigation;
