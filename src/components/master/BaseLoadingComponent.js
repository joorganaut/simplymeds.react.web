import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
class BaseLoadingComponent extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
                UserID : props.UserID,
                testValue : 0,
                Roles : props.Roles,
                IsLoading : true,
                Redirect : false,
                RedirectPath : '/',
                ComponentFunction : props.ComponentFunction
        }
        this.TestAdd = this.TestAdd.bind(this)
    }
    PageRoles = []
    IsInRole = false;
    TestAdd(){
        
    }
    componentWillMount(){
        var state = this.ValidateRoles();
        this.setState({IsInRole : state})
    }
    HandleRedirect=(path)=>{
        this.setState({RedirectPath : path, Redirect : true})       
    }
    ValidateRoles=()=>{
        var state = false;
        if(this.state.Roles !== undefined )
        {
        var intersect = this.PageRoles.filter(x=>this.state.Roles.includes(x));
         state = intersect.length > 0 ? true : false;
        this.setState({IsInRole : state})
        }
        return state;
        // this.setState({IsInRole : this.state.Roles.includes(this.PageRoles)})
    }
    renderLoading=()=>{
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
    renderRedirect = (path) => {
        return <Redirect to = {path}/>
     }
    renderAllComponents=()=>{
        //this.ValidateRoles();
        if (this.state.IsInRole === false) {
            this.state.Redirect = true;
            //return this.renderAllComponents()
        } 
       
        if(this.state.Redirect === true)
        {
            return this.renderRedirect(this.state.RedirectPath)
        }
        if(this.state.IsLoading === true)
        {
            return(
                this.renderLoading()
            )
        }
        else{
            return (
                <>                
                {this.state.ComponentFunction}
                </>
            )
        }
    }
    render(){
       return(this.renderAllComponents())
    }
}
export default BaseLoadingComponent