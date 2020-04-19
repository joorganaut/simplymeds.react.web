import React, {
    Component
} from 'react'
import {
    Redirect
} from 'react-router-dom'
import Axios from 'axios'
import swal from 'sweetalert';
import Loader from 'react-loader-spinner'
import InputField from '../user/InputField'
import InputLabel from '../user/InputLabel'
import Button from '../user/Button'
import {Button as ModalButton} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import LoginBackground from "../master/Pharmacy/images/bg-01_old.jpg";
import RxComponent from '../master/BaseLoadingComponent'
import ProductToolbar from './product-toolbar'
import ContainerUnit from './ContainerUnit'
import CartButton from '../store/AddToCartButton'

class ProductIndex extends RxComponent {
    constructor(props)
    {
        super(props)
        this.state = {
            testValue : 0,
            Roles : props.Roles,
            Redirect : {},
            ProductName : '',
            ProductPrice : 0,
            ProductCost : 0,
            ContainerUnit : 0,
            IsPrescription : false,
            Tags : '',
            Image : {},
            Description : '',
            ErrorMessage : {
                ProductName : '',
                ProductPrice : '',
                ProductCost : '',
                ContainerUnit : '',
                IsPrescription : '',
                Tags : '',
                Image : '',
                Description : '',
            },
            ControlValid : {
                ProductName : false,
                ProductPrice : false,
                ProductCost : false,
                ContainerUnit : false,
                IsPrescription : false,
                Tags : true,
                Image : false,
                Description : false,
            },
            ComponentFunction : this.renderPage(),
            FormIsValid : false,
        }
        
        this.PageRoles.push("InventoryManager")
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.TestAdd = this.TestAdd.bind(this)
    }
    ContainerUnits = ContainerUnit();
    SaveForm=(e)=>{
        
    }
    ViewPreview=(e)=>{
        this.HandleRedirect('/product-preview/')
    }
    
    ViewAllProducts=(e)=>{
        this.HandleRedirect('/product-all/')
    }
    TestAdd(){
        var num = this.state.testValue;
        if(num === undefined)
        {
            num = 0;
        }
        this.setState({testValue : num + 1})
    }
    renderPage=()=>{
        return(<>
        
        <div className="form form-group container-login100" style = {{backgroundImage: `url(${LoginBackground})`}}>
        <div className = "card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
            <div className="row">
        <legend><center><h2><b>Product Setup <label >
        {/* <Consumer>
                {
                    (value) =>
                    {return (value.state.CartCount)}
                }
                </Consumer> */}
            </label></b></h2></center></legend>
        </div>
        <ProductToolbar saveAction={this.SaveForm} previewAction={this.ViewPreview} searchAction={this.ViewAllProducts}></ProductToolbar>
        <div className="row">
        <div className = "text-center card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
                <form onSubmit = {
                    this.handleSubmitForm
                } class="well form-horizontal">
                    <fieldset>
                    <center>
                    <div className="form-group text-center justify-content-center ">
                <InputField className = {
                    "text-center"
                }
                type = {
                    "text"
                }
                placeholder = {
                    "product name...."
                }
                id = {
                    'ProductName'
                }
                name = {
                    "Product Name"
                }
                fontAwesomeIcon = {
                    "fas fa-info"
                }
                value = {
                    this.state.ProductName
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    this.state.ControlValid !== undefined ? this.state.ControlValid.ProductName : false
                }
                errorMessage = {
                    this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.ProductName : ''
                } >
                </InputField>
                <InputField type = {
                    "number"
                }
                placeholder = {
                    "price...."
                }
                id = {
                    'ProductPrice'
                }
                name = {
                    "Price"
                }
                fontAwesomeIcon = {
                    "fas fa-money"
                }
                value = {
                    this.state.ProductPrice
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    this.state.ControlValid !== undefined ? this.state.ControlValid.ProductPrice : false
                }
                errorMessage = {
                    this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.ProductPrice : ''
                } >
                </InputField> 
                <InputField type = {
                    "number"
                }
                placeholder = {
                    "cost..."
                }
                id = {
                    'ProductCost'
                }
                name = {
                    "Cost"
                }
                fontAwesomeIcon = {
                    "fas fa-money"
                }
                value = {
                    this.state.ProductCost
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    this.state.ControlValid !== undefined ? this.state.ControlValid.ProductCost : false
                }
                errorMessage = {
                    this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.ProductCost : ''
                } >
                </InputField> 
                <div className="row text-center">
                    <div className="col-lg-4 col-md-8 col-md-12">
                    <InputLabel  name="Unit per sale" 
                    isValidProperty={
                        this.state.ControlValid !== undefined ? this.state.ControlValid.ContainerUnit : false
                    }></InputLabel>
                        <div className ={`text-default form-group`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={'fas fa-medkit'}></i>
                                    </span>                                    
                                </div>
                                <select id="ContainerUnit" value={this.state.ContainerUnit} 
                                className="dropdown-menu form-control" 
                                name='ContainerUnit'
                                onChange={this.HandleUserInput} style={{
                                    height:46
                                }}>
                                    <option  selected>{'unit per sale....'}</option>
                                    {this.ContainerUnits.map(x=>{
                                        return<option  value={x.Value}>{x.Name}</option>
                                    })}
                                </select>                               
                                </div>
                                <div className="row">
                                <div className="col-12 mt-2 mb-1">
                                <small className="text-danger">{
                                this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.ContainerUnit : ''
                                }</small>
                                 </div>
                                </div>
                                </div>
                             </div>
                        </div> 
                        <div className="row text-center">
                    <div className="col-lg-4 col-md-8 col-md-12">
                    <InputLabel  name="Requires Prescription" isValidProperty={
                        this.state.ControlValid !== undefined ? this.state.ControlValid.IsPrescription : false
                        }></InputLabel>
                        <div className ={`text-default form-group`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={'fas fa-stethoscope'}></i>
                                    </span>                                    
                                </div>
                                <select id="IsPrescription" value={this.state.IsPrescription} 
                                className="dropdown-menu form-control" 
                                name='IsPrescription'
                                onChange={this.HandleUserInput} style={{
                                    height:46
                                }}>
                                    <option  selected>{'select....'}</option>
                                    <option  value={true}>{'Yes'}</option>
                                    <option  value={false}>{'No'}</option>
                                </select>                               
                                </div>
                                <div className="row">
                                <div className="col-12 mt-2 mb-1">
                                <small className="text-danger">{
                                this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.IsPrescription : ''
                                }</small>
                                 </div>
                                </div>
                                </div>
                             </div>
                        </div> 
                        
                <InputField type = {
                    "file"
                }
                placeholder = {
                    "product image...."
                }
                id = {
                    'Image'
                }
                name = {
                    "Image"
                }
                fontAwesomeIcon = {
                    "fas fa-camera"
                }
                value = {
                    this.state.Image
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    this.state.ControlValid !== undefined ? this.state.ControlValid.Image : false
                }
                errorMessage = {
                    this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.Image : ''
                } >
                </InputField>
                <div className="row text-center">
                    <div className="col-lg-4 col-md-8 col-md-12">
                    <InputLabel  name="Description" isValidProperty={
                        this.state.ControlValid !== undefined ? this.state.ControlValid.Description : false
                        }></InputLabel>
                        <div className ={`text-default form-group`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={'fas fa-info'}></i>
                                    </span>                                    
                                </div>
                                <textarea id="Description" value={this.state.Description} 
                                className="form-control" 
                                name='Description'
                                required
                                rows="3"
                                placeholder="description"
                                onChange={this.HandleUserInput}>
                                   
                                </textarea>                               
                                </div>
                                <div className="row">
                                <div className="col-12 mt-2 mb-1">
                                <small className="text-danger">{
                                this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.Description : ''
                                }</small>
                                 </div>
                                </div>
                                </div>
                             </div>
                        </div> 
                        <div className="row text-center">
                    <div className="col-lg-4 col-md-8 col-md-12">
                    <InputLabel  name="Tags" isValidProperty={
                        this.state.ControlValid !== undefined ? this.state.ControlValid.Tags : false
                        }></InputLabel>
                        <div className ={`text-default form-group`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={'fas fa-info'}></i>
                                    </span>                                    
                                </div>
                                <textarea id="Tags" value={this.state.Tags} 
                                className="form-control" 
                                name='Tags'
                                required
                                rows="3"
                                placeholder="tags"
                                onChange={this.HandleUserInput}>
                                    
                                </textarea>                               
                                </div>
                                <div className="row">
                                <div className="col-12 mt-2 mb-1">
                                <small className="text-danger">{
                                this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.Tags : ''
                                }</small>
                                 </div>
                                </div>
                                </div>
                             </div>
                        </div> 
                </div>
                </center>
                </fieldset>
                </form> 
                
                {/* <CartButton ID={this.state.UserID} ProductID={1} ReloadCart={this.props.ReloadCart} OnAddToCart={this.OnAddToCart}></CartButton> */}
                </div>
        </div>
        </div>
        </div>
        </>)
    }
    OnAddToCart=()=>{
        this.props.OnAddToCart()
    }
    handleFormSubmit=(e)=>{

    }
    handleUserInput=(e)=>{
        this.setState({[e.target.name] : e.target.value})
        this.ValidateControls(e.target.name, e.target.value)
    }
    ValidateControls=(name, value)=>{

    }
    render(){
        return(<>
        {this.renderAllComponents()}
        </>)
    }
}
export default ProductIndex