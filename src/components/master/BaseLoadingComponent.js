import React, {Component} from 'react'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
class BaseLoadingComponent extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
                IsLoading : false,
                ComponentFunction : props.ComponentFunction
        }
    }
    renderLoading=()=>{
        return(
            <center>
            <div>Please hold on.....
                <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={10000}/>
            </div>
            </center>
        )
    }
    renderAllComponents=()=>{
        if(this.state.IsLoading)
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
       return this.renderAllComponents()
    }
}
export default BaseLoadingComponent