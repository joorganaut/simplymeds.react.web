import React, { Component } from 'react';
// import 'react-bootstrap'
import RoleMenu from "./RoleMenu"
class Index extends Component {

    constructor(props) {
        super(props)
        var user = JSON.parse(localStorage.getItem('User'));
        if (user === null) {
            user = {
                ID : 0,
                IsLoggedIn : false,
                Name : '',
                Role : '',
                MenuItems : [],
            }
        }
        this.state = {
            ReloadCart : this.props.ReloadCart,
            User: user
        }
    }
    
    render() {
        if(this.state.ReloadCart === true)
        {
            return(<></>)
        }
        else{
        return (
                <RoleMenu 
                ReloadCart = {this.state.ReloadCart}
                CartCount = {this.props.CartCount}
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
    // Index = connect(this.mapStateToProps, this.mapDispatchToProps)(RoleMenu)
}

export default Index;