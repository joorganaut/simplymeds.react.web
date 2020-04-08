import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import "./Signup/vendor/mdi-font/css/material-design-iconic-font.min.css";
import "./Signup/vendor/font-awesome-4.7/css/font-awesome.min.css";
import "./Signup/vendor/select2/select2.min.css";
import "./Signup/vendor/datepicker/daterangepicker.css";
import "./Signup/css/main.css";
import "../master/Pharmacy/fonts/icomoon/style.css";
import "../master/Pharmacy/css/bootstrap.min.css";
import "../master/Pharmacy/css/magnific-popup.css";
import "../master/Pharmacy/css/jquery-ui.css";
// import "../master/Pharmacy/css/owl.carousel.min.css";
import "../master/Pharmacy/css/owl.theme.default.min.css";
import "../master/Pharmacy/css/aos.css";
import "../master/Pharmacy/css/style.css";
import {LinkedCalendar} from 'rb-datepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

/*  <!-- Icons font CSS-->
    <link href="@Url.Content("~/App_Themes/Signup/vendor/mdi-font/css/material-design-iconic-font.min.css")" rel="stylesheet" media="all">
    <link href="@Url.Content("~/App_Themes/Signup/vendor/font-awesome-4.7/css/font-awesome.min.css")" rel="stylesheet" media="all">
    <!-- Font special for pages-->
    <link href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Vendor CSS-->
    <link href="@Url.Content("~/App_Themes/Signup/vendor/select2/select2.min.css")" rel="stylesheet" media="all">
    <link href="@Url.Content("~/App_Themes/Signup/vendor/datepicker/daterangepicker.css")" rel="stylesheet" media="all">

    <!-- Main CSS-->
    <link href="@Url.Content("~/App_Themes/Signup/css/main.css")" rel="stylesheet" media="all">
    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/fonts/icomoon/style.css")">

    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/bootstrap.min.css")">
    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/magnific-popup.css")">
    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/jquery-ui.css")">
    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/owl.carousel.min.css")">
    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/owl.theme.default.min.css")">


    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/aos.css")">

    <link rel="stylesheet" href="@Url.Content("~/App_Themes/Pharmacy/css/style.css")">*/

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
 function onDatesChange() {

 }
  return (
        
    <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
    <div className="wrapper wrapper--w680">
        <div className="card card-4">
            <div className="card-body">
                <h2 className="title">Please Sign-up</h2>
                <form method="POST" action="https://localhost:44340/Home/Register">
                    <div className="row row-space">
                        <div className="col-12">
                            <div className="input-group">
                                <label className="label">first name</label>
                                <input className="input--style-4" type="text" name="first_name"></input>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group">
                                <label className="label">middle name</label>
                                <input className="input--style-4" type="text" name="middle_name"></input>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group">
                                <label className="label">last name</label>
                                <input className="input--style-4" type="text" name="last_name"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row row-space">
                        <div className="col-12">
                            <div className="input-group">
                                <label className="label">Birthday</label>
                                <div className="input-group-icon">
                                <input class="input--style-4 js-datepicker" type="text" name="birthday"></input>
                                        <i class="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                  </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group">
                                <label className="label">Gender</label>
                                <div className="p-t-10">
                                    <label className="radio-container m-r-45">
                                        Male
                                        <input type="radio" checked="checked" name="gender"></input>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-container">
                                        Female
                                        <input type="radio" name="gender"></input>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-space">
                        <div className="col-12">
                            <div className="input-group">
                                <label className="label">Email</label>
                                <input className="input--style-4" type="email" name="email"></input>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group">
                                <label className="label">Phone Number</label>
                                <input className="input--style-4" type="text" name="phone"></input>
                            </div>
                        </div>
                    </div>
                    <div className="p-t-15">
                        <button className="btn btn--radius-2 btn--blue" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>  
  );
}