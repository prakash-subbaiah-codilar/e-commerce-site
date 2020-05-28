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
  const [activePath, setActivePath] = useState(null);  

  const [activeIdMobile, setActiveIdMobile] = useState(null);  

  const [activePathMobile, setActivePathMobile] = useState(null);  
  
  const [sidebarView, setSidebarView] = useState("close");    
  const [menuTab, setMenuTab] = useState(true);    
  
  useEffect(() => {         
      dispatch(categoriesList(2));          
  },[]);
  
  useEffect(() => {        
    setCategoryList(selector.menus.categories);      
  }, [selector.menus.categories]); 


//Declare the active submenu  
  const handleClick = (id, path) => {
    setActiveId(id);                
    let pathFind = path.split('/');    
    setActivePath(pathFind[2]);        
  };

//Declare the active submenu in mobile 
  const handleClickMobile = (id, path) => {
    closeNav();    
    setActiveIdMobile(id);         
    let pathFind = path.split('/');            
    setActivePathMobile(pathFind[2]);        
  };

//open and close Navbar in mobile view
const openNav = () => {
  setSidebarView("open");
  document.getElementById("mySidebar").style.width = "80%";
  document.getElementById("main").style.marginLeft = "80%";  
};
const closeNav = () => {
  setSidebarView("close");
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
};

//Sidebar menus and account tab button Layout
const menuTabButtons = () => {
  return <div className="d-md-block d-lg-none row mx-auto col-12 text-center m-0 p-0">
          {menuTab ?
          <React.Fragment>
            <div className="text-secondary text-center mx-auto col-6 p-2 pt-4 pb-4" style={{backgroundColor: "#DCDCDC"}} onClick={() => setMenuTab(true)}>Menu</div>
            <div className="text-secondary text-center mx-auto col-6 p-2 pt-4 pb-4" style={{backgroundColor: "#fff"}} onClick={() => setMenuTab(false)}>Account</div>
          </React.Fragment>
          :
          <React.Fragment>
            <div className="text-secondary text-center mx-auto col-6 p-2 pt-4 pb-4" style={{backgroundColor: "#fff"}} onClick={() => setMenuTab(true)}>Menu</div>
            <div className="text-secondary text-center mx-auto col-6 p-2 pt-4 pb-4" style={{backgroundColor: "#DCDCDC"}} onClick={() => setMenuTab(false)}>Account</div>
          </React.Fragment>
          }    
        </div>
};


//Nested Sub Menu Layout
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
                                <li className={activeId === categoryLevelNext.id ? "nav-item text-left text-dark m-0 p-2 active" : "nav-item text-left text-dark m-0 p-2"} style={{width: "200px"}} onClick={ handleClick.bind(this, categoryLevelNext.id, categoryLevelNext.path) } >                                        
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

//Nested Sub Menu in Mobile Layout
const nestedMenu1Mobile = (categoryLevel, menuType) => {
  return <React.Fragment>
          {categoryLevel.children.length >= 0 ?
                <React.Fragment>
                  <div className={menuType === "mainmenu" ? "pt-2 pb-2" : "pl-2 pr-2"}>                                    

                  {menuType === "mainmenu" ?
                  <React.Fragment>
                    {activeIdMobile === categoryLevel.id ? 
                      <Link to={"/category/"+categoryLevel.id+""} className="text-left text-dark p-1 menulist" onClick={ handleClickMobile.bind(this, categoryLevel.id, categoryLevel.path) } style={{borderLeft: "3px solid red", marginLeft: "0px"}}>                     
                        <h6>All {categoryLevel.name}</h6>                      
                      </Link>
                    :
                      <Link to={"/category/"+categoryLevel.id+""} className="text-left text-dark p-1 menulist" onClick={ handleClickMobile.bind(this, categoryLevel.id, categoryLevel.path) }>                                                             
                        <h6>All {categoryLevel.name}</h6>                    
                      </Link>
                    }
                    </React.Fragment>
                  :
                  null
                  }                
                                    
                  {categoryLevel.children.slice(0).reverse().map((categoryLevelNext, i) => (
                  <React.Fragment>                    
                    {activeIdMobile === categoryLevelNext.id ?
                    <div style={{borderLeft: "3px solid red", marginLeft: "0px"}}>
                    <Link to={"/category/"+categoryLevelNext.id+""} className={menuType === "mainmenu" ? "text-left text-dark p-2 menulist" : "text-secondary p-2 menulist"} onClick={ handleClickMobile.bind(this, categoryLevelNext.id, categoryLevelNext.path) }>                                          
                        <div>{categoryLevelNext.name}</div>                          
                    </Link>
                     </div>
                     :
                     <div>
                    <Link to={"/category/"+categoryLevelNext.id+""} className={menuType === "mainmenu" ? "text-left text-dark p-2 menulist" : "text-secondary p-2 menulist"} onClick={ handleClickMobile.bind(this, categoryLevelNext.id, categoryLevelNext.path) }>                                          
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

//Sidebar Menus
const sidebar = () => {
  return <div id="mySidebar" className="d-sm-block d-md-none sidebar m-0 p-0">
          {/*Sidebar menus and account tab button*/}
          {menuTabButtons()}
          {menuTab ?
            <div className="d-sm-block d-md-none m-0 p-0">
                          {categoryList.children_count >= 0 ? 
                          <React.Fragment>
                          {categoryList.children.slice(0).reverse().map((categoryLevel1, i) => (
                            <React.Fragment>
                              <hr className="text-secondary m-0 p-0"></hr>
                              <div className="m-0 p-2">
                                  <div className="pt-2 pb-2" data-toggle="collapse" data-target={"#"+categoryLevel1.id+""}>                                                                                                          
                                  {activePathMobile == categoryLevel1.id ?
                                    <div style={{borderLeft: "3px solid red", marginLeft: "0px"}}><h5 className="p-1">{categoryLevel1.name}<i className="fa fa-angle-down fa-1x float-right text-right" aria-hidden="true" id="icon"></i></h5></div>
                                    :
                                    <div><h5 className="p-1">{categoryLevel1.name}<i className="fa fa-angle-down fa-1x float-right text-right" aria-hidden="true" id="icon"></i></h5></div>
                                  }
                                  </div>                                                    
                                  <div class="collapse" id={categoryLevel1.id}>                
                                    {/*Nested Sub Menu Mobile Layout*/}
                                    {nestedMenu1Mobile(categoryLevel1, "mainmenu")}                                                        
                                  </div>
                              </div>
                              {categoryLevel1.children.length === i+1 ? <hr className="text-secondary m-0 p-0"></hr> : null}
                            </React.Fragment>
                          ))}        
                          </React.Fragment>
                          :
                          <div>Loading</div>
                          } 
                        </div>  
          :
                  <ul className="d-sm-block d-md-none text-left text-secondary m-0 p-0">    
                    <hr className="text-secondary m-0 p-0"></hr>
                    <a className="text-left">Default welcome msg!</a>
                    <hr className="text-secondary m-0 p-0"></hr>
                    <a className="text-left" onClick={closeNav}><Link to="/account/login" className="p-0 m-0">Sign In</Link></a>
                    <hr className="text-secondary m-0 p-0"></hr>
                    <a className="text-left" onClick={closeNav}><Link to="/account/create" className="p-0 m-0">Create an Account</Link></a>
                    <hr className="text-secondary m-0 p-0"></hr>
                  </ul>
          }
            
        </div>
};


/*Search inputbar toggle in Mobile view Layout*/
const searchInputbarLayout = () => {
  return <div className="collapse mb-5 col-12 m-0 p-0" id="searchbox">
            <form className="form-inline my-2 my-lg-0">                                              
                <div className="container mt-3">                    

                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search entire store here..." />
                    <div className="input-group-append bg-secondary">
                      <i className="fa fa-search text-center text-light p-1" style={{fontSize: "22px"}} aria-hidden="true" id="icon"></i>
                    </div>
                  </div>
                  
                </div>                
            </form>
            <hr className="text-dark col-12 m-0 p-0"></hr>
          </div>
};

{/*Bottom Header with Menus by category in Desktop*/}    
const bottomHeaderMenusDesktop = () => {
  return <nav className="navbar navbar-expand-sm navbar-light m-0 p-0 d-none d-md-block" style={{backgroundColor: "#DCDCDC"}}>
            <div className="col-12 m-0 p-0">            
                <ul className="navbar-nav m-0 p-0">                  
                    {categoryList.children_count > 0 ? 
                      <React.Fragment>
                        {categoryList.children.slice(0).reverse().map((categoryLevel1, i) => (
                          <React.Fragment>
                            <li className="nav-item dropdown m-0 p-0">                                                   
                            
                              <Link to={"/category/"+categoryLevel1.id+""} style={{textDecoration: 'none'}} onClick={ handleClick.bind(this, categoryLevel1.id, categoryLevel1.path) }>                                                                          
                              {activeId === categoryLevel1.id || activePath == categoryLevel1.id ?
                                <a className="nav-link text-dark m-0 p-3 btn" style={{borderBottom: "3px solid red"}}><b>{categoryLevel1.name}&nbsp;&nbsp;<i className="fa fa-angle-down float-right" aria-hidden="true" id="icon" style={{fontSize: 20, margin: "0px"}}></i></b></a>
                                :
                                <a className="nav-link text-dark m-0 p-3 btn"><b>{categoryLevel1.name}&nbsp;&nbsp;<i className="fa fa-angle-down float-right" aria-hidden="true" id="icon" style={{fontSize: 20, margin: "0px"}}></i></b></a>
                              }
                              </Link>                                    
                                                           
                              {/*Nested Submenu Layout*/}
                              {nestedMenu(categoryLevel1, categoryLevel1.id, "directmenu")}                    
                            </li>                  
                          </React.Fragment>
                        ))}        
                      </React.Fragment>
                      :
                      <div className="m-0 p-3 btn">Loading...</div>
                      }                                            
                </ul>
            </div>
          </nav>
};


return (
  
<header id="header">

      {/*Mobile Menu side bar Layout*/}
      {sidebar()}

      {/*Top header with signin and signup in Desktop*/}
        <div className="bg-secondary p-1 d-none d-md-block">
                <ul className="text-right text-light">    
                  <a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Default welcome msg!</button></a>
                  <Link to="/account/login"><a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Sign In</button></a></Link>
                  <Link to="/account/create"><a className="text-right"><button id="back" className="btn btn-sm btn-secondary text-light">Create an Account</button></a></Link>
                </ul>
        </div>

      {/*Middle header with search and Add cart section*/}
      <nav className="navbar navbar-expand-md navbar-light bg-light p-0" id="main">       

              <div className="container p-0">  
              <React.Fragment>
              <button onClick={sidebarView === "open" ? closeNav.bind(this) : openNav.bind(this) } className="navbar-toggler p-2 m-2 float-right" ><span className="navbar-toggler-icon"></span></button>
                {sidebarView === "open" ?
                  null
                :
                <React.Fragment>
                  <Link to={"/"}><a className="navbar-brand text-dark p-2 mr-auto">LUMA</a></Link>                
                  <div className="d-sm-block d-md-none ml-auto row m-0">              
                          <h6 className="pl-3 pr-3 pt-0 pb-0" data-toggle="collapse" data-target="#searchbox">
                            <i className="fa fa-search text-secondary text-right float-right pt-3" style={{fontSize: "22px"}} aria-hidden="true" id="icon"></i>            
                          </h6>
                          <h6 className="pl-3 pr-3 pt-0 pb-0">
                            {/*Cart Button Component*/}
                            <CartButton />
                          </h6>
                  </div>        
                </React.Fragment>
                }
              </React.Fragment>      
                  <div className="navbar-collapse collapse" id="navbarNav">          
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
                    </ul>
                  </div>         
                </div>
      </nav>

      {/*Search inputbar toggle in Mobile view*/}
      {searchInputbarLayout()}
          
      {/*Bottom Header with Menus by category in Desktop*/}    
      {bottomHeaderMenusDesktop()}  

</header>
)};

export default Navigation;
