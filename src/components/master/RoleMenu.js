import React, {Component} from 'react'
import 'react-bootstrap'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import logo from "./Pharmacy/css/images/bg_rx3.0.jpg"
import {Consumer} from '../store/providers/storeContextProvider'; 



// bg_rx3.0
class RoleMenu extends Component{
    constructor(props)
    {
        super(props)
        var CartItems = JSON.parse(localStorage.getItem(`${props.ID}:Cart`))
        this.state = {
            ID : props.ID,
            IsLoggedIn : props.IsLoggedIn,
            Name : props.Name,
            MenuItems : props.MenuItems,
            CartItems : CartItems,
            CartCount : CartItems === null?0:CartItems.length,
            CartLoading : this.props.ReloadCart
        }
    }
    OnAddToCart=()=>{
        var CartItems = JSON.parse(localStorage.getItem(`${this.state.ID}:Cart`))
        this.setState({CartCount: CartItems === null?0:CartItems.length})
    }
      
    componentWillMount(){
        //alert('Hello World')
    }
    renderCartNumber=()=>{
        this.state.CartCount = this.state.CartItems.length
        return this.props.CartCount
    }
    Logout=()=>{
        localStorage.removeItem('User')
        this.setState({IsLoggedIn : false})
    }
    getMenuItems=(item)=>{
        return <li className="nav-item"><a  className="nav-link" href={item.url}>{item.Name}</a></li>
    }
    getMenuItemsDIV=(item)=>{
        return <a  className="dropdown-item" href={item.url}>{item.Name}</a>
    }
    renderListItems=()=>{
        return (
        <li className="has-children">
            <a href="/">{this.state.Name}</a>
            <ul className="dropdown">
                {this.state.MenuItems.forEach(x=>{
                    this.getMenuItems(x);
                })}
                <li className="nav-item"><a className="nav-link" href="/" onClick={this.Logout}>Logout</a></li>
            </ul>
        </li>)
    }

    renderListItemsDIV=()=>{
        return (<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuUserLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {this.state.Name}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuUserLink">
            {this.state.MenuItems.forEach(x=>{
                    this.getMenuItemsDIV(x);
                })}
                <a class="dropdown-item" href={"/patient-details/?id="+this.state.ID}>Personal Details</a>
                <a class="dropdown-item" href={"/product-details/?id="+this.state.ID}>Products</a>
              <a class="dropdown-item" href="/" onClick={this.Logout}>Logout</a>
            </div> </li>)
    }
    setLoading=(e)=>{
        this.state.CartLoading = true;
    }
    renderMenu=()=>{
        if(this.state.CartLoading === true)
        {
            return(
                <center>
                <div>Please hold on.....
                    <Loader
             type="Puff"
             color="#00BFFF"
             height={100}
             width={100}/>
            {/* //  timeout={10000} */}
                </div>
                </center>
            )
        }
        else{
        //alert(this.state.IsLoggedIn)
        if(this.state.IsLoggedIn)
        {
            return <React.Fragment>
<nav className="main-nav navbar navbar-fixed navbar-expand-lg text-dark navbar-light" style={
    {
        
    }}>
                <a className="navbar-brand" href="/">
                <img alt="" src={logo} className="logo" style={
                    {
                        height:70,
                        width:70,
                        // borderRadius : 50
                    }
                }/>
                    <small>&reg;</small></a>
                    {/* Simply Meds</a> */}
                <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-dark site-menu" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item">
                        {/* <a class="active" title="home" href="/"  onClick={this.state.homeAction}><i class="fa fa-home"></i></a>  */}
                            <a className="nav-link" href="#"><i class="fa fa-home">Home</i></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Store"><i class="fa fa-shopping-cart">Store</i></a>
                        </li>
                        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Quick Shopping
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="/">
          <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                        <span className="input-text">
                            <i className ="fas fa-pills" aria-hidden="true">Meds ++Prescription</i>
                        </span>  
                        </div></div>
          </a>
          <a class="dropdown-item" href="/">
          <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                        <span className="input-text">
                            <i className ="fas fa-syringe" aria-hidden="true">Vaccines</i>
                        </span>  
                        </div></div>
              </a>           
          <a class="dropdown-item" href="/">
              <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                        <span className="input-text">
                            <i className ="fas fa-shopping-cart" aria-hidden="true">Super Mart</i>
                        </span>  
                        </div></div>
              </a>     

        <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuNestedLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                        <span className="">
                            <i className ="fas fa-heartbeat" aria-hidden="true">Life Style</i>
                        </span>  
                        </div></div>
        </a>
        <div class="dropdown-menu form-group" aria-labelledby="navbarDropdownMenuNestedLink">
          <a class="dropdown-item" href="/">
          <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                        <span className="">
                            <i className ="fas fa-capsules" aria-hidden="true">Supplements</i>
                        </span>  
                        </div></div>
              </a>          
          <a class="dropdown-item" href="/">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
            <span className="">
                <i className ="fas fa-capsules" aria-hidden="true">Vitamins</i>
            </span>  
            </div></div>
              </a>
              <a class="dropdown-item" href="/">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
            <span className="">
                <i className ="fas fa-capsules" aria-hidden="true">Diet &amp; Nutrition</i>
            </span>  
            </div></div>
              </a>
          <a class="dropdown-item" href="/">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
            <span className="">
                <i className ="fas fa-mug-hot" aria-hidden="true"> Tea &amp; Coffee</i>
            </span>  
            </div></div>
            </a>
        </div>    
        </div>
      </li>
      
          {this.renderListItemsDIV()}
      <li className="nav-item">
      <div class="icons text-dark">
                        <a href="/cart" class="icons-btn d-inline-block bag">
                            <span class="icon-shopping-bag"></span>
            <span class="number btn-danger">
                <Consumer>
                {
                    (value) =>
                    (value.state.CartCount !== null ? value.state.CartCount : 0)
                }
                </Consumer>
                {/* {
            this.state.CartCount
            } */}
            </span>
                        </a>
                        
                    </div>
      </li>
                    </ul>
                </div>
                <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>  
            </nav>
           
            </React.Fragment>
        }
        else
        {
            return <React.Fragment>
            <div class="navbar-fixed-top navbar-light navbar  text-dark">

<div class="container text-dark">
<nav className="navbar navbar-expand-lg text-dark ">
            <a className="navbar-brand logo" href="/">
            <img alt="" src={logo} className="logo" style={
                {
                    height:35,
                    width:35
                }
            }
            />
                Rx3.0</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse text-dark" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item">                        
                        <a className="nav-link" href="/signin">
                        <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                        <span className="input-group-addon">
                            <i className='fa fa-sign-in' aria-hidden="true">Login</i>
                        </span>  
                        </div></div>
                        </a>                        
                        </li>
                        </ul>
            </div>
            </nav>
</div>
</div>
            </React.Fragment>
        }
    }
}
    render(){
        return(
            this.renderMenu()
        )
    }
}

export default RoleMenu