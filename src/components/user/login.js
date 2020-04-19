import React, { Component } from "react";
//import config from "do"
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import Button from './Button'
import swal from 'sweetalert';
import Consumer from '../store/providers/UserContextProvider'
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

class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      email : '',
      password : '',
      redirect : false,
      redirectPath : '',
      formValid : true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  userSession = {};
  handleUserInput=(event)=>{
    var name = event.target.name;
    var value = event.target.value;
    this.setState({[name] : value})
  }
  handleSubmit(event) {
    event.preventDefault();
    var data = {
      Username : this.state.email,
      Password : this.state.password
    }
    var result = {}
    try{
    Axios.post(process.env.REACT_APP_MIDDLEWARE+'/api/Login', data)
    .then(res=>{
        result = res;
        if (result.data.Code === '00') {
          result = {
            IsLoggedIn: true,
            Name: result.data.record.Name,
            ID: result.data.record.ID,
            Roles: result.data.record.Roles,
            MenuItems : []
          }
          //debugger

          localStorage.setItem('User', JSON.stringify(result));
          this.setState({redirect : true})
          this.setState({redirectPath : '/'});
          this.state.User = ["Customer", "InventoryManager"];
          //history.push('/')
        }
        else
        {
          swal({
            title: "Error!",
            text: "Invalid Login Credentials",
            icon: "error",
            timer: 2000,
            button: false
          })
            //alert(result.data.Message);
        }
    })
  }
  catch(error)
  {
    result = error.message;
  }
}
  /*redirect : false,
            redirectPath : '',*/

  validateForm() {
    this.setState({formValid : this.email.length > 0 && this.password.length > 0});
  }
  renderRedirect(path) 
  {
    return <Redirect to = {{pathname : path, state : this.state.User}}/>
}
render(){
  if(this.state.redirect)
  {
    return (this.renderRedirect(this.redirectPath));
  }
  else{
  return (
    <div className="Login container-login100" style={{backgroundImage: `url(${LoginBackground})`}} >
        <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" style={{backgroundColor:'white'}}>
      <form 
      onSubmit={this.handleSubmit} 
      className="login100-form validate-form">
      <span className="login100-form-title p-b-37">
                    Sign In 
    </span>
        <div controlId="email" bsSize="medium" className="wrap-input100 validate-input m-b-20">
        <div className="wrap-input100 validate-input m-b-20" data-validate="Enter username or email">
                    <input className="input100" type="text" name="email" 
                    onChange={this.handleUserInput} 
                    value={this.state.email} 
                    placeholder="email"></input>
                    <span className="focus-input100"></span>
                </div>
        </div>
        <div controlId="password" bsSize="medium" className="wrap-input100 validate-input m-b-20">
         
                <div className="wrap-input100 validate-input m-b-25" data-validate="Enter password">
                    <input className="input100" type="password" name="password" 
                    onChange={this.handleUserInput} 
                     value={this.state.password} 
                    placeholder="password"></input>
                    <span className="focus-input100"></span>
                </div>
        </div>
        <div className="container-login100-form-btn">
        <div className = "container-login100-form-btn" >
                <Button type = {
                    "submit"
                }
                id = {
                    "submit-form-button"
                }
                text = {
                    "Login"
                }
                disabled = {
                    !this.state.formValid
                } > 
                </Button> 
                </div>
                <div className="text-center p-t-57 p-b-20">
                    <a href="/signup" className="txt2 hov1">
                        or Sign Up
                    </a> <br />
                    <a href="/signup" className="txt2 hov1">
                        forgot your password?
                    </a>
                </div>
                </div>
               
        
      </form>
      </div>
    </div>    
  );}
  }
  
}
export default (Login)