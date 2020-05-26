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

  const [activeId, setActiveId] = useState(null);  
  const [activeIdMobile, setActiveIdMobile] = useState(null);  

  const [collapseNav, setCollapseNav] = useState(false);  
  
  useEffect(() => {         
      dispatch(categoriesList(1));          
  },[]);
  
  useEffect(() => {    
    setCategoryList(selector.menus.categories);      
  }, [selector.menus.categories]); 


//Declare the active submenu  
  const handleClick = (id) => {
    setActiveId(id);
  };
  //Declare the active submenu in mobile 
  const handleClickMobile = (id) => {
    setCollapseNav(false);
    setActiveIdMobile(id);
  };
  const handleNavbar = () => {
//alert("clicked");
    document.getElementsByClassName('navbar-toggler').collapse('toggle');
  };
/*Nested Sub Menu Layout*/
const nestedMenu = (categoryLevel, id, menuType) => {
  return <React.Fragment>
            {categoryLevel.children.length > 0 ?
                  <React.Fragment>
                    <div className={menuType === "directmenu" ? "dropdown-menu m-0 p-0 ml-1 mr-1" : "dropdown-menu m-0 p-0"} id={menuType} aria-labelledby={id}>                              
                      {categoryLevel.children.slice(0).reverse().map((categoryLevelNext, i) => (
                        <React.Fragment>
                          <div className="dropdown-item m-0 p-0">
                            <div className="dropdown bg-light m-0 p-0">
                              <Link to={"/category/"+categoryLevelNext.id+""} style={{textDecoration: 'none'}}>
                                <li className={activeId === categoryLevelNext.id ? "nav-item text-left text-dark m-0 p-2 active" : "nav-item text-left text-dark m-0 p-2"} style={{width: "200px"}} onClick={ handleClick.bind(this, categoryLevelNext.id) } >                                        
                                    <a className="nav-link">{categoryLevelNext.name}{categoryLevelNext.children.length > 0 ? <i className="fa fa-angle-right fa-1x float-right" aria-hidden="true" id="icon"></i> : null }</a>                                          
                                </li>
                              </Link>
                              {categoryLevelNext.children.length > 0 ?                                                                  
                                nestedMenu(categoryLevelNext, categoryLevelNext.id, "submenu")
                                :
                                null
                              }
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

/*Nested Sub Menu Mobile Layout*/
const nestedMenu1Mobile = (categoryLevel, menuType) => {
  return <React.Fragment>
          {categoryLevel.children.length >= 0 ?
                <React.Fragment>
                  <div className={menuType === "mainmenu" ? "pt-2 pb-2" : "pl-2 pr-2"}>
          {menuType === "mainmenu" ? <Link to={"/category/"+categoryLevel.id+""} className="text-left text-dark p-1 menulist" onClick={ handleClickMobile.bind(this, categoryLevel.id) }>{activeIdMobile === categoryLevel.id ? <h6 style={{borderLeft: "3px solid red", marginLeft: "0px"}}>All {categoryLevel.name}</h6> : <h6>All {categoryLevel.name}</h6>}</Link> : null }
                  {categoryLevel.children.slice(0).reverse().map((categoryLevelNext, i) => (
                  <React.Fragment>                    
                    {activeIdMobile === categoryLevelNext.id ?
                    <div style={{borderLeft: "3px solid red", marginLeft: "0px"}}>
                    <Link to={"/category/"+categoryLevelNext.id+""} className={menuType === "mainmenu" ? "text-left text-dark p-2 menulist" : "text-secondary p-2 menulist"} onClick={ handleClickMobile.bind(this, categoryLevelNext.id) }>                                          
                        <div>{categoryLevelNext.name}</div>                          
                    </Link>
                     </div>
                     :
                     <div>
                    <Link to={"/category/"+categoryLevelNext.id+""} className={menuType === "mainmenu" ? "text-left text-dark p-2 menulist" : "text-secondary p-2 menulist"} onClick={ handleClickMobile.bind(this, categoryLevelNext.id) }>                                          
                        <div>{categoryLevelNext.name}</div>                          
                    </Link>
                     </div>
                    }
                                        
                  {nestedMenu1Mobile(categoryLevelNext, "submenu")}
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
  <div className="bg-secondary p-1 d-none d-md-block">
          <ul className="text-right text-light">    
            <a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Default welcome msg!</button></a>
            <a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Sign In</button></a>
            <a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Create an Account</button></a>
          </ul>
        </div>
{/*Middle header with search and Add cart section*/}
<nav className="navbar navbar-expand-sm navbar-light bg-light m-0 p-0">       

        <div className="container p-0">
        <button className={collapseNav ? "navbar-toggler p-2 m-2 mr-auto collapsed" : "navbar-toggler p-2 m-2 mr-auto"} data-toggle="collapse" data-target="#navbarNav" aria-expanded={collapseNav ? true : false}><span className="navbar-toggler-icon" onClick={() => setCollapseNav(!collapseNav)}></span></button>
        <Link to={"/"}><a className="navbar-brand text-dark p-2">LUMA</a></Link>
        <div className="d-sm-block d-md-none">
                <h6 className="p-3">
                  {/*Cart Button Component*/}
                  <CartButton />
                </h6>
        </div>
            <div className={collapseNav ? "navbar-collapse collapse show" : "collapse navbar-collapse"} id="navbarNav">
              <ul className="navbar-nav ml-auto">               

              <form className="form-inline my-2 my-lg-0 d-none d-md-block">                                              
                  <div className="container mt-3">                    

                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Search" />
                      <div className="input-group-append bg-secondary">
                        <i className="fa fa-search fa-2x text-center text-light p-1" aria-hidden="true" id="icon"></i>
                      </div>
                    </div>
                    
                  </div>
                
              </form>
              <div className="d-none d-md-block p-2">
                <h6 className="pl-2">
                  {/*Cart Button Component*/}
                  <CartButton />
                </h6>
              </div>
              
              {/*Mobile view Menu Structure*/}
              <div className="d-sm-block d-md-none m-0 p-0">
                  {categoryList.children_count >= 0 ? 
                  <React.Fragment>
                  {categoryList.children.slice(0).reverse().map((categoryLevel1, i) => (
                    <React.Fragment>
                      <hr className="text-secondary m-0 p-0"></hr>
                      <li className="m-0 p-2">
                          <div className="pt-2 pb-2" data-toggle="collapse" data-target={"#"+categoryLevel1.id+""}><h5>{categoryLevel1.name}<i className="fa fa-angle-down fa-1x float-right text-right" aria-hidden="true" id="icon"></i></h5></div>                          
                          <div class="collapse" id={categoryLevel1.id}>                
                            {/*Nested Sub Menu Mobile Layout*/}
                            {nestedMenu1Mobile(categoryLevel1, "mainmenu")}                                                        
                          </div>
                      </li>                                    
                    </React.Fragment>
                  ))}        
                  </React.Fragment>
                  :
                  <div>Loading</div>
                  } 
                </div>  




              </ul>

            </div>
          </div>
    </nav>
    
 {/*Bottom Header with Menus by category*/}
    
<nav className="navbar navbar-expand-sm navbar-light m-0 p-0 bg-secondary d-none d-md-block">
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
                    {/*Nested Submenu Layout*/}
                    {nestedMenu(categoryLevel1, categoryLevel1.id, "directmenu")}                    
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
