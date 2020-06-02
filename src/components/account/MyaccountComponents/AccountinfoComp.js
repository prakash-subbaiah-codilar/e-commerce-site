import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { changeCustomerPassword } from "../../../actions/MyaccountAction";

import { customerDetail } from "../../../actions/MyaccountAction";

import MyaccountSidemenu from './MyaccountSidemenu';

import './Myaccount.css';

//Display Account info content in My account page Page
const AccountinfoComp = (props) => {
    const dispatch = useDispatch();  
    const selector = useSelector(state => state);
    const [customerDatass, setCustomerDatass] = useState([]);

    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const [infoEmail, setInfoEmail] = useState("");
    const [infoCurrentPassword, setInfoCurrentPassword] = useState("");
    const [infoNewPassword, setInfoNewPassword] = useState("");
    const [infoConfirmNewPassword, setInfoConfirmNewPassword] = useState("");
    
    useEffect(() => {                                           

        dispatch(customerDetail(selector.auth.customerToken));                
        setCustomerDatass(selector.myaccount.customerDetail);        
        
        setFname(customerDatass.firstname);
        setLname(customerDatass.lastname);        
        setInfoEmail(customerDatass.email);

      }, [selector.myaccount.customerDetail]);

const handleSubmit = () => {
    //Change Email
    if(changeEmail && !changePassword){
        alert("change email");
    }
    //Change Password
    if(!changeEmail && changePassword){
        if(infoNewPassword === infoConfirmNewPassword){
            dispatch(changeCustomerPassword(selector.auth.customerToken, infoCurrentPassword, infoNewPassword));
        }else{
            alert("New Password and Confirm New Password are mismatch.")
        }
    }
    //Change Email & Password
    if(changeEmail && changePassword){
        alert("change email and Password");
    }    
    
}
const changeEmailLayout = () => {    
    return <div>
        <div className="form-group">
            <label for="name">Email&nbsp;<span className="text-danger">*</span></label>
            <input type="text" id="email" value={infoEmail} onChange={(e) => setInfoEmail(e.target.value)} className="form-control form-control-sm" required/>
        </div>
        <div className="form-group">
            <label for="name">Current Password&nbsp;<span className="text-danger">*</span></label>
            <input type="text" id="currentpassword" value={infoCurrentPassword} onChange={(e) => setInfoCurrentPassword(e.target.value)} className="form-control form-control-sm" required/>
        </div>
    </div>
}

const changePasswordLayout = () => {    
    return <div>        
        <div className="form-group">
            <label for="name">Current Password&nbsp;<span className="text-danger">*</span></label>
            <input type="text" id="currentpassword" value={infoCurrentPassword} onChange={(e) => setInfoCurrentPassword(e.target.value)} className="form-control form-control-sm" required/>
        </div>
        <div className="form-group">
            <label for="name">New Password&nbsp;<span className="text-danger">*</span></label>
            <input type="text" id="newpassword" value={infoNewPassword} onChange={(e) => setInfoNewPassword(e.target.value)} className="form-control form-control-sm" required/>
        </div>
        <div className="form-group">
            <label for="name">Confirm New Password&nbsp;<span className="text-danger">*</span></label>
            <input type="text" id="confirmnewpassword" value={infoConfirmNewPassword} onChange={(e) => setInfoConfirmNewPassword(e.target.value)} className="form-control form-control-sm" required/>
        </div>
    </div>
}

const changeEmailPasswordLayout = () => {    
    return <div>
         <div className="form-group">
            <label for="name">Email&nbsp;<span className="text-danger">*</span></label>
            <input type="text" id="email" value={infoEmail} onChange={(e) => setInfoEmail(e.target.value)} className="form-control form-control-sm" required/>
        </div>        
        <div className="form-group">
            <label for="name">Current Password&nbsp;<span className="text-danger">*</span></label>
            <input type="text" id="currentpassword" value={infoCurrentPassword} onChange={(e) => setInfoCurrentPassword(e.target.value)} className="form-control form-control-sm" required/>
        </div>
        <div className="form-group">
            <label for="name">New Password&nbsp;<span className="text-danger">*</span></label>
            <input type="text" id="newpassword" value={infoNewPassword} onChange={(e) => setInfoNewPassword(e.target.value)} className="form-control form-control-sm" required/>
        </div>
        <div className="form-group">
            <label for="name">Confirm New Password&nbsp;<span className="text-danger">*</span></label>
            <input type="text" id="confirmnewpassword" value={infoConfirmNewPassword} onChange={(e) => setInfoConfirmNewPassword(e.target.value)} className="form-control form-control-sm" required/>
        </div>
    </div>
}


//show the selected page content      
const handleMainContent = (data) => {  
    let url = "/account/"+data+"";  
    props.history.push(url);
  }

return (
 <section>    
        <div className="row col-12 pt-3 p-2 m-2">
        <MyaccountSidemenu handleMainContent={handleMainContent} content={"accountinfo"} />
        <div className="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 mx-auto">
                            <p id="title">Edit Account Information</p>
                            <div className="row">
                            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pt-3">
                            <p className="pt-3" id="subTitle">Account Information</p>                            
                            <hr className="text-secondary m-0 p-0 pb-3"></hr>              
                            <form>                            
                                <div className="form-group">
                                    <label for="name">First Name&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" value={fname} className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-group">
                                    <label for="name">Last Name&nbsp;<span className="text-danger">*</span></label>
                                    <input type="text" id="name" value={lname} className="form-control form-control-sm" required/>
                                </div>
                                <div className="form-check pb-4">
                                    <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" onChange={(e) => setChangeEmail(!changeEmail)} />
                                        <small>Change Email</small>
                                    </label>
                                </div>
                                <div className="form-check pb-4">
                                    <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" onChange={(e) => setChangePassword(!changePassword)} />
                                        <small>Change Password</small>
                                    </label>
                                </div>
                                <small>If you created this account using Amazon Pay, you might not know your site password. <span className="text-primary">Request a password to change your account password.</span></small>
                                {/*<button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" type="submit">Save</button>*/}
                            </form>
                            </div>
                            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pt-3">
                                {changeEmail && !changePassword ? 
                                <React.Fragment>
                                    <p className="pt-3" id="subTitle">Change Email</p>                            
                                    <hr className="text-secondary m-0 p-0 pb-3"></hr>              
                                    {changeEmailLayout()}
                                </React.Fragment>
                                : null }
                                {changePassword && !changeEmail ? 
                                <React.Fragment>
                                    <p className="pt-3" id="subTitle">Change Password</p>                            
                                    <hr className="text-secondary m-0 p-0 pb-3"></hr>     
                                    {changePasswordLayout()}         
                                </React.Fragment>
                                : null }
                                {changePassword && changeEmail ? 
                                <React.Fragment>
                                    <p className="pt-3" id="subTitle">Change Email & Change Password</p>                            
                                    <hr className="text-secondary m-0 p-0 pb-3"></hr>              
                                    {changeEmailPasswordLayout()}
                                </React.Fragment>
                                : null }
                            </div>
                            </div>
                            <button className="btn btn-primary btn-sm pl-3 pr-3 col-12 col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3" onClick={handleSubmit}>Save</button>                            
                            </div>
    </div>    

</section>
  );
};

export default AccountinfoComp;