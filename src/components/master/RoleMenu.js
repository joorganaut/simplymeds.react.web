import React, {Component} from 'react'
import 'react-bootstrap'
import logo from "./Pharmacy/css/images/SimplyMeds_logo1.jpeg"
class RoleMenu extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            ID : props.ID,
            IsLoggedIn : props.IsLoggedIn,
            Name : props.Name,
            Roles : props.Role,
            MenuItems : props.MenuItems,
            CartItems : []//localStorage.getItem(`${props.ID}:Cart`)
        }
    }
    renderCartNumber=()=>{
        return this.state.CartItems.length
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
              <a class="dropdown-item" href="/" onClick={this.Logout}>Logout</a>
            </div> </li>)
    }
    renderMenu=()=>{
        //alert(this.state.IsLoggedIn)
        if(this.state.IsLoggedIn)
        {
            return <React.Fragment>
<nav className="main-nav navbar navbar-fixed navbar-expand-lg text-dark navbar-light" >
                <a className="navbar-brand" href="/">
                <img alt="" src={logo} className="logo" style={
                    {
                        height:35,
                        width:35,
                        borderRadius : 50
                    }
                }
                />
                    Simply Meds</a>
                <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-dark site-menu" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item">
                            <a className="nav-link" href="/About">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Contact">Store</a>
                        </li>
                        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Quick Shopping
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="/">Drugs</a>
          <a class="dropdown-item" href="/">Vaccines</a>           
          <a class="dropdown-item" href="/">Super-mart</a>          
        <a class="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuNestedLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Life style
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuNestedLink">
          <a class="dropdown-item" href="/">Supplements</a>          
          <a class="dropdown-item" href="/">Vitamins</a>
          <a class="dropdown-item" href="/">Diet &amp; Nutrition</a>
          <a class="dropdown-item" href="/">Tea &amp; Coffee</a>
        </div>    
        </div>
      </li>
      
          {this.renderListItemsDIV()}
      <li className="nav-item">
      <div class="icons text-dark">
                        <a href="cart.html" class="icons-btn d-inline-block bag">
                            <span class="icon-shopping-bag"></span>
            <span class="number">{this.state.CartItems.length}</span>
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
            <a className="navbar-brand" href="/">
            <img alt="" src={logo} className="logo" style={
                {
                    height:35,
                    width:35
                }
            }
            />
                Simply Meds</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse text-dark" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item">
                            <a className="nav-link" href="/signin">Login</a>
                        </li>
                        </ul>
            </div>
            </nav>
</div>
</div>
            </React.Fragment>
        }
    }
    render(){
        return(
            this.renderMenu()
        )
    }
}
export default RoleMenu