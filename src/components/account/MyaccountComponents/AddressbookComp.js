import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { customerDetail } from "../../../actions/MyaccountAction";

import { createAddressBook } from "../../../actions/MyaccountAction";

import MyaccountSidemenu from './MyaccountSidemenu';

import { getCountries } from "../../../actions/AddcartAction";

import './Myaccount.css';

//Display Address book content in My account page Page
const AddressbookComp = (props) => {
    const dispatch = useDispatch();  
    const selector = useSelector(state => state);

    const [customerDatas, setCustomerDatas] = useState([]);
    const [customerDataAddress, setCustomerDataAddress] = useState([]);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [company, setCompany] = useState("");
    const [telephone, setTelephone] = useState("");
    const [streetAddress, setStreetAddress] = useState([]);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("United States");

    useEffect(() => {                                                 
        dispatch(customerDetail(selector.auth.customerToken));                
        setCustomerDatas(selector.myaccount.customerDetail);
        setCustomerDataAddress(selector.myaccount.customerDetail.addresses);
        
        setFirstname(customerDatas.firstname);
        setLastname(customerDatas.lastname);        

      }, [selector.myaccount.customerDetail]);

      useEffect(() => {
        dispatch(getCountries());    
      });

const handleAddressSubmit = (e) => {
        e.preventDefault();
        
        console.log(streetAddress);
        let x = streetAddress.toString();
        let y = streetAddress.join(" ");

        dispatch(createAddressBook(selector.auth.customerToken, firstname,
            lastname,
            company,
            telephone,
            y,                
            city,
            state,
            zipCode,
            country));
        
        dispatch(customerDetail(selector.auth.customerToken));                        

      }

const handleAddressLine = (e) => {    
        const updatedArray = [...streetAddress];    
        updatedArray[e.target.id] = e.target.value;
        setStreetAddress(updatedArray);   
        
   }

//show the selected page content      
const handleMainContent = (data) => {  
    let url = "/account/"+data+"";  
    props.history.push(url);
  }

{/*  <select id="country" onChange={(e) => setCountry(e.target.value)} className="form-control">                            
                                <option value="United States" >United States</option>                                                                
                                <option value="Uruguay">Uruguay</option>                                                                
</select>*/}
  //Country Select box
const countrySelectbox = () => {
    return <select className="form-control"  id="country" onChange={(e) => setCountry(e.target.value)}>            
              {selector.addcart.countries && selector.addcart.countries.length > 0 ?
                <React.Fragment>                
                  {selector.addcart.countries.map((countrie, i) => (
                      <React.Fragment>
                      {country === countrie.full_name_english ? 
                        <option key={countrie.id} value={countrie.full_name_english} selected="selected">{countrie.full_name_english}</option>                
                        :
                        <option key={countrie.id} value={countrie.full_name_english}>{countrie.full_name_english}</option>                
                     }
                    </React.Fragment>
                  ))};    
                </React.Fragment>              
                :
                null
              }                
            </select>
  };
  
  return (
    <section>    
        <div className="row col-12 pt-3 p-2">
        <div className="col-12 col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mx-auto">
            <MyaccountSidemenu handleMainContent={handleMainContent} content={"addressbook"} />
        </div>           
        <div className="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto">
            
                    
                    {customerDataAddress.length > 0 ?
                    <React.Fragment>
                        <p id="title">Address Book</p>
                        <p className="pt-3" id="subTitle">Default Addresses</p>
                        <hr className="text-secondary m-0 p-2"></hr>
                        <div className="row">
                            <div className="col-6">
                                <b>Default Billing Address</b>
                                {customerDataAddress.map((item, i) => (
                                    <React.Fragment>
                                    <br />
                                    <span>{item.firstname} {item.lastname}</span>
                                    <br />
                                    <span>{item.street[0]}</span>
                                    <br />
                                    {/*<span>{item.street[1]}</span>
                                    <br />
                                    <span>{item.street[2]}</span>
                                    <br />*/}
                                    <span>{item.city}&nbsp;</span>                                    
                                    <span>{item.region.region}&nbsp;</span>
                                    <span>{item.postcode}&nbsp;</span>
                                    <br />                                    
                                    <span>T:&nbsp;<span className="text-primary">{item.telephone}</span></span>
                                    <br />                                    
                                    <span className="text-primary">Change Billing Address</span>
                                </React.Fragment>
                                ))}
                            </div>
                            <div className="col-6">
                                <b>Default Shipping Address</b>
                                {customerDataAddress.map((item, i) => (
                                    <React.Fragment>
                                    <br />
                                    <span>{item.firstname} {item.lastname}</span>
                                    <br />
                                    <span>{item.street[0]}</span>
                                    <br />
                                    {/*<span>{item.street[1]}</span>
                                    <br />
                                    <span>{item.street[2]}</span>
                                    <br />*/}
                                    <span>{item.city}&nbsp;</span>                                    
                                    <span>{item.region.region}&nbsp;</span>
                                    <span>{item.postcode}&nbsp;</span>
                                    <br />                                    
                                    <span>T:&nbsp;<span className="text-primary">{item.telephone}</span></span>
                                    <br />                                    
                                    <span className="text-primary">Change Shipping Address</span>



                                    
                                </React.Fragment>
                                ))}                                
                            </div>
                            
                        </div>
                        <p className="pt-3" id="subTitle">Additional Address Entries</p>
                        <hr className="text-secondary m-0 p-2"></hr>
                        <br />
                        <span className="pb-3 mb-3">You have no other address entries in your address book.</span>
                        <br />
                        <button className="btn btn-primary btn-sm mt-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="button">Add New Address</button>
                    </React.Fragment>                    
                    :
                    <React.Fragment>
                        <form onSubmit={handleAddressSubmit}>
                        <div className="row">
                        <div className="col-6">
                        <p className="pt-3" id="subTitle">Contact Information</p>
                        <hr className="text-secondary m-0 p-2"></hr>
                        <div className="form-group">
                            <label for="name">First Name&nbsp;<span className="text-danger">*</span></label>
                            <input type="text" id="firstname" value={customerDatas.firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control form-control-sm" required/>
                        </div>
                        <div className="form-group">
                            <label for="name">Last Name&nbsp;<span className="text-danger">*</span></label>
                            <input type="text" id="lastname" value={customerDatas.lastname} onChange={(e) => setLastname(e.target.value)} className="form-control form-control-sm" required/>
                        </div>
                        <div className="form-group">
                            <label for="name">Company</label>
                            <input type="text" id="comapny" value={company} onChange={(e) => setCompany(e.target.value)} className="form-control form-control-sm"/>
                        </div>
                        <div className="form-group">
                            <label for="name">Phone Number&nbsp;<span className="text-danger">*</span></label>
                            <input type="text" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="form-control form-control-sm" required/>
                        </div>
                         </div>
                         
                         <div className="col-6">
                         <p className="pt-3" id="subTitle">Address</p>
                         <hr className="text-secondary m-0 p-2"></hr>
                        <div className="form-group">
                            <label for="name">Street Address&nbsp;<span className="text-danger">*</span></label>
                            <input type="text" id="0" value={streetAddress[0]} onChange={handleAddressLine} className="form-control form-control-sm"/>
                            <input type="text" id="1" value={streetAddress[1]} onChange={handleAddressLine} className="form-control form-control-sm mt-3 mb-3"/>
                            <input type="text" id="2" value={streetAddress[2]} onChange={handleAddressLine} className="form-control form-control-sm mt-3 mb-3"/>
                        </div>
                        <div className="form-group">
                            <label for="name">City&nbsp;<span className="text-danger">*</span></label>
                            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="form-control form-control-sm" required/>
                        </div>
                        <div className="form-group">
                            <label for="state">State/Province&nbsp;<span className="text-danger">*</span></label>
                            <select id="state" value={state} onChange={(e) => setState(e.target.value)} className="form-control">
                                <option value="" selected="selected" >Please select a region, state or province</option>                                                                
                                <option value="Alabama" >Alabama</option>                                                                
                                <option value="Alaska">Alaska</option>                                                                
                            </select>
                        </div> 
                        <div className="form-group">
                            <label for="zipcode">Zip/Postal Code&nbsp;<span className="text-danger">*</span></label>
                            <input type="text" id="zipcode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} onChange={(e) => setZipCode(e.target.value)} className="form-control form-control-sm" required/>
                        </div>
                        <div className="form-group">
                            <label for="country">Country&nbsp;<span className="text-danger">*</span></label>
                            {countrySelectbox()}
                            {/*<select id="country" onChange={(e) => setCountry(e.target.value)} className="form-control">                            
                                <option value="United States" >United States</option>                                                                
                                <option value="Uruguay">Uruguay</option>                                                                
                                </select>*/}
                        </div>
                         
                         </div>

                         </div>                         
                    <button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="submit">Save Address</button>
                    </form>
                    </React.Fragment>
                    }

                    
</div>
    </div>    

</section>
  );
};

export default AddressbookComp;