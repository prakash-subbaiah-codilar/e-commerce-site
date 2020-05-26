import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { Link } from 'react-router-dom';

import CartButton from "../CartButton";
import { categoriesList } from "../../actions/MenusAction";


const Navigation = (props) => {
  
  const dispatch = useDispatch();    
  const selector = useSelector(state => state);
  
  const [categoryList, setCategoryList] = useState([]);  


  useEffect(() => {         
      dispatch(categoriesList(1));          
  },[]);
  
  useEffect(() => {    
    setCategoryList(selector.menus.categories);      
  }, [selector.menus.categories]);

  
const nestedMenu2 = (categoryLevel, id) => {
  return <React.Fragment>
          {categoryLevel.children.length >= 0 ?
                <React.Fragment>
                <div className="dropdown-menu m-0 p-0" id="submenu" aria-labelledby={id}>                                
                {categoryLevel.children.slice(0).reverse().map((categoryLevelNext, i) => (
                  <React.Fragment>
                  <Link to={"/category/"+categoryLevelNext.id+""} style={{textDecoration: 'none'}}>
                    <a className="dropdown-item text-left text-dark m-0 p-3" style={{width: "200px"}}>{categoryLevelNext.name}{categoryLevelNext.children.length > 0 ? <i className="fa fa-angle-down fa-1x text-center" aria-hidden="true" id="icon"></i> : null}</a>                   
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

const nestedMenu = (categoryLevel, id) => {
  return <React.Fragment>
            {categoryLevel.children.length > 0 ?
                  <React.Fragment>
                    <div className="dropdown-menu m-0 p-0 ml-1 mr-1" aria-labelledby={id}>                              
                      {categoryLevel.children.slice(0).reverse().map((categoryLevelNext, i) => (
                        <React.Fragment>
                          <div className="dropdown-item m-0 p-0">
                            <div className="dropdown m-0 p-0">
                              <Link to={"/category/"+categoryLevelNext.id+""} style={{textDecoration: 'none'}}>                                                                          
                                <li className="nav-item text-left text-dark m-0 p-3" style={{width: "200px"}}>                                        
                                    <a>{categoryLevelNext.name}{categoryLevelNext.children.length > 0 ? <i className="fa fa-angle-right fa-1x float-right" aria-hidden="true" id="icon"></i> : null }</a>                                          
                                </li>
                              </Link>
                                                                  
                            {nestedMenu2(categoryLevelNext, categoryLevelNext.id)}                                        
                            </div>
                          </div>                                    
                        </React.Fragment>                
                      ))}
                  </div>
                  </React.Fragment>                
                  :
                  null
                  }
          </React.Fragment>
}
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
    
<nav className="navbar navbar-expand-sm navbar-light m-0 p-0 bg-secondary">
  <div className="col-12 m-0 p-0">            
      <ul className="navbar-nav m-0 p-0">                  
          {categoryList.children_count > 0 ? 
            <React.Fragment>
              {categoryList.children.slice(0).reverse().map((categoryLevel1, i) => (
                <React.Fragment>
                  <li className="nav-item dropdown m-0 p-0">                                                   
                    <Link to={"/category/"+categoryLevel1.id+""} style={{textDecoration: 'none'}}>                                                                          
                      <a className="nav-link text-light m-0 p-3 btn">{categoryLevel1.name}&nbsp;&nbsp;<i className="fa fa-angle-down float-right" aria-hidden="true" id="icon" style={{fontSize: 20, margin: "0px"}}></i></a>
                    </Link>
                    {nestedMenu(categoryLevel1, categoryLevel1.id)}
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
