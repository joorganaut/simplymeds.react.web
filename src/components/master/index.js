import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import "./Pharmacy/fonts/icomoon/style.css";
import "./Pharmacy/css/bootstrap.min.css";
import "./Pharmacy/css/magnific-popup.css";
import "./Pharmacy/css/jquery-ui.css";
/*import "./Pharmacy/css/owl.carousel.min.css";*/
// import "./Pharmacy/css/owl.theme.default.min.css";
import "./Pharmacy/css/aos.css";
import "./Pharmacy/css/style.css";
import logo from "./Pharmacy/css/images/SimplyMeds_logo1.jpeg"
/*<link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/fonts/icomoon/style.css")">

    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/bootstrap.min.css")">
    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/magnific-popup.css")">
    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/jquery-ui.css")">
    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/owl.carousel.min.css")">
    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/owl.theme.default.min.css")"> 
    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/aos.css")">

    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/style.css")">
    */
class Index extends Component {

    constructor() {
        super();

        // this.userSession = {
        //     isLoggedIn : false,
        //     Name : 'Osazee Joe Igbinosun',
        //     Cart : {
        //         ItemsCount : 25
        //     }
        // }
    }


    render() {
        var Logout=()=>{
            debugger
            userSession = {};
            localStorage.clear();
        }
        debugger
        const userValue = localStorage.getItem('User');
        //localStorage.clear();
        var userSession = {};
        let ddlMenu;
        let cartItemsCount = 0;
        debugger
        if (userValue === undefined || userValue === null) {
            userSession = undefined
        }
        else
        {
            userSession = JSON.parse(userValue);
        }
        if (userSession !== undefined) {
            cartItemsCount = userSession.Cart
            ddlMenu =
                <li className="has-children">
                    <a href="~/Shop/?tag=life">{userSession.Name}</a>
                    <ul className="dropdown">
                        <li><a href="~/Shop/?tag=supplements">Patient Details</a></li>
                        <li><a href="~/Shop/?tag=vitamins">Medical History</a></li>
                        <li><a href="~/Shop/?tag=diet">Book a session</a></li>
                        <li><a href="~/Shop/?tag=beverage">Account</a></li>
                        <li><a href="#" onClick={Logout()}>Logout</a></li>
                    </ul>
                </li>

        }
        else {
            ddlMenu = <li><a href="/signin">Login</a></li>
        }
        
        return (
            <div>
                <div className="site-navbar py-2 navbar-fixed-top navbar-dark navbar">

                    <div className="search-wrap">
                        <div className="container">
                            <a href="#" className="search-close js-search-close"><span className="icon-close2"></span></a>
                            <form action="#" method="post">
                                <input type="text" className="form-control" placeholder="Search keyword and hit enter..."></input>
                            </form>
                        </div>
                    </div>

                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="logo">
                                <div className="site-logo">
                                    <img src={logo} className="logo" style={{
                                        height: 40,
                                        width: 40
                                    }} />
                                    <a href="/" className="js-logo-clone">Simply Meds<small>&reg;</small></a>
                                </div>
                            </div>
                            <div className="main-nav d-none d-lg-block">
                                <nav className="site-navigation text-right text-md-center" role="navigation">
                                    <ul className="site-menu js-clone-nav d-none d-lg-block">
                                        <li className="active"><a href="/">Home</a></li>
                                        <li><a href="~/Shop">Store</a></li>
                                        <li className="has-children">
                                            <a href="#">Quick Shop</a>
                                            <ul className="dropdown">
                                                <li><a href="~/Shop/?tag=drug">Drugs</a></li>
                                                <li className="has-children">
                                                    <a href="~/Shop/?tag=life">Lifestyle</a>
                                                    <ul className="dropdown">
                                                        <li><a href="~/Shop/?tag=supplements">Supplements</a></li>
                                                        <li><a href="~/Shop/?tag=vitamins">Vitamins</a></li>
                                                        <li><a href="~/Shop/?tag=diet">Diet &amp; Nutrition</a></li>
                                                        <li><a href="~/Shop/?tag=beverage">Tea &amp; Coffee</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="~/Shop/?tag=vaccines">Vaccines</a></li>
                                                <li><a href="~/Shop/?tag=supermarket">Groceries</a></li>

                                            </ul>
                                        </li>
                                        <li><a href="about.html">About</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                        {ddlMenu}
                                    </ul>
                                </nav>
                            </div>
                            <div className="icons">
                                <a href="#" className="icons-btn d-inline-block js-search-open"><span className="icon-search"></span></a>
                                <a href="cart.html" className="icons-btn d-inline-block bag">
                                    <span className="icon-shopping-bag"></span>
                                    <span className="number">{cartItemsCount}</span>
                                </a>
                                <a href="#" className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none">
                                    <span className="icon-menu"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
export default Index;