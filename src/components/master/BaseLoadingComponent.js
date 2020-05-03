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
                pagingParams: {
                    page: 1,
                    pageSize: 5,
                    totalItemsCount: 0
                },
                ComponentFunction : props.ComponentFunction,
                //ComponentLoadingMethod : props.ComponentLoadingMethod,
                RedirectParams : {}
        }
        this.componentWillMount = this.componentWillMount.bind(this)
        this.TestAdd = this.TestAdd.bind(this)        
    }
    PageRoles = []
    IsInRole = false;
    TestAdd(){
        
    }
    GoHome=(path)=>{
        this.HandleRedirect(path !== null && path !== undefined ? path : '/')
    }
    componentWillMount(){
        var state = this.ValidateRoles();
        this.setState({IsInRole : state})
        //return this.state.ComponentLoadingMethod;
        //this.setState({Product : data})
    }
    HandleRedirect=(path, RedirectParams)=>{
        this.setState({RedirectPath : path, Redirect : true, RedirectParams : RedirectParams})       
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
    renderRedirect = (path, obj) => {
        return <Redirect to = {{pathname : path, state : {
            Values : obj
        }}}/>
     }
    renderAllComponents=(callback)=>{
        //this.ValidateRoles();
        if (this.state.IsInRole === false) {
            this.setState({Redirect : true})
            //return this.renderAllComponents()
        } 
       
        if(this.state.Redirect === true)
        {
            return this.renderRedirect(this.state.RedirectPath, this.state.RedirectParams)
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
                {callback}
                </>
            )
        }
    }
    render(){
       return(this.renderAllComponents())
    }
}
export default BaseLoadingComponent