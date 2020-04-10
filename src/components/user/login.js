import React, { useState } from "react";
//import config from "do"
import Axios from 'axios'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import "./Login/css/main.css";
import "./Login/css/util.css";
import "./Login/vendor/bootstrap/css/bootstrap.min.css";
import "./Login/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./Login/fonts/iconic/css/material-design-iconic-font.min.css";
import "./Login/vendor/animate/animate.css";
import "./Login/vendor/css-hamburgers/hamburgers.min.css";
import "./Login/vendor/animsition/css/animsition.min.css";
import "./Login/vendor/select2/select2.min.css";
import "./Login/vendor/daterangepicker/daterangepicker.css";
import LoginBackground from "./Login/images/bg-01.jpg"
/*<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css"> */

export default function Login(props) {
  var userSession = {};
  function handleSubmit(event) {
    event.preventDefault();
    var data = {
      Username : email,
      Password : password
    }
    var result = {}
    try{
    Axios.post(process.env.REACT_APP_MIDDLEWARE+'/api/Login', data)
    .then(res=>{
        result = res;
        userSession = {
          isLoggedIn : true,
          Name : result.data.record.Name,
          Email: "",
          Cart :  25
      }
      debugger
      localStorage.setItem('User', JSON.stringify(userSession));
      history.push('/')
    }).error(err=>{

    })
  }
  catch(error)
  {
    result = error.message;
  }
}
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  
  
  var history = useHistory();
  
  return (
    

    <div className="Login container-login100" style={{backgroundImage: `url(${LoginBackground})`}} >
        <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" style={{backgroundColor:'white'}}>
      <form 
      onSubmit={handleSubmit} 
      className="login100-form validate-form">
      <span className="login100-form-title p-b-37">
                    Sign In 
    </span>
        <div controlId="email" bsSize="medium" className="wrap-input100 validate-input m-b-20">
        <div className="wrap-input100 validate-input m-b-20" data-validate="Enter username or email">
                    <input className="input100" type="text" name="username" onChange={e => setEmail(e.target.value)} value={email} placeholder="username or email"></input>
                    <span className="focus-input100"></span>
                </div>
        </div>
        <div controlId="password" bsSize="medium" className="wrap-input100 validate-input m-b-20">
         
                <div className="wrap-input100 validate-input m-b-25" data-validate="Enter password">
                    <input className="input100" type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="password"></input>
                    <span className="focus-input100"></span>
                </div>
        </div>
        <div className="container-login100-form-btn">
        <Button block bsSize="large" type="submit" 
        className="btn login100-form-btn" value="Sign-in" disabled={!validateForm()} >
          Sign-in
        </Button>
                </div>
                <div className="text-center p-t-57 p-b-20">
                    <a href="/signup" className="txt2 hov1">
                        or Sign Up
                    </a>
                </div>

        
      </form>
      </div>
    </div>    
  );
}