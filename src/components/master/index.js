import React, { Component } from 'react';
import 'react-bootstrap'
import logo from "./Pharmacy/css/images/SimplyMeds_logo1.jpeg"
import RoleMenu from "./RoleMenu"
class Index extends Component {

    constructor(props) {
        super(props)
        var user = JSON.parse(localStorage.getItem('User'));
        if (user !== null) {
            this.state = {
                User: user
            }
        } else {
            this.state = {
                User:{
                    ID : 0,
                    IsLoggedIn : false,
                    Name : '',
                    Role : '',
                    MenuItems : [],
                }
            }
        }
    }


    render() {
        return (
                <RoleMenu 
                Name={this.state.User.Name} 
                Role={this.state.User.Role}
                    IsLoggedIn={this.state.User.IsLoggedIn} 
                ID={this.state.User.ID}
                MenuItems={this.state.User.MenuItems}
                >
                </RoleMenu>
                           
                );
    }
}
export default Index;