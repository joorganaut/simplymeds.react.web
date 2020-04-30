import React from 'react'
import Axios from 'axios'
import swal from 'sweetalert';
import InputField from '../user/InputField'
import InputLabel from '../user/InputLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import LoginBackground from "../master/Pharmacy/images/bg-01_old.jpg";
import RxComponent from '../master/BaseLoadingComponent'
import ProductToolbar from './product-toolbar'
import ContainerUnit from './ContainerUnit'
import imageCompression from 'browser-image-compression';

const ProductNameFieldName = 'ProductName';
const ProductPriceFieldName = 'ProductPrice';
const ContainerUnitFieldName = 'ContainerUnit'
const DescriptionFieldName = 'Description';
const ProductNameMinLength = 5;
const ProductNameMaxLength = 30;
const ProductPriceMinValue = 0;
const ProductNameInvalidErrorMessage = `Product Name must be between ${ProductNameMinLength} - ${ProductNameMaxLength} characters`;
const ProductPriceInvalidErrorMessage = `Product must have a price greater than ${ProductPriceMinValue}`;
const DescriptionInvalidErrorMessage = `Product must have a description`;
const ContainerUnitErrorMessage = `A sale unit must be specified`;


class ProductIndex extends RxComponent {
    constructor(props)
    {
        var data = JSON.parse(localStorage.getItem('ProductData'))
        super(props)
        this.state = {
            testValue : 0,
            Roles : props.Roles,
            Redirect : {},
            ProductName : data !== null?data.Name: '',
            ProductBrand : data !== null?data.Brand:'',
            ProductPrice : data !== null?data.Price: 0,
            ProductCost : data !== null?data.Cost: 0,
            ContainerUnit : data !== null?data.Unit: '',
            IsPrescription : data !== null?data.IsPrescription: '',
            IsDiscounted : data !== null?data.IsDiscounted: '',
            DiscountPrice : data !== null?data.DiscountPrice: 0,
            Tags : data !== null?data.Tags: '',
            Image : {},
            ImageString : data !== null?data.Image: '',
            Description : data !== null ? data.Description : '',
            ErrorMessage : {
                ProductName : '',
                ProductPrice : '',
                ProductCost : '',
                ContainerUnit : '',
                IsPrescription : '',
                IsDiscounted : '',
                DiscountPrice : '',
                Tags : '',
                Image : '',
                Description : '',
            },
            ControlValid : {
                ProductName : data !== null && data.Name !== null?true : false,
                ProductPrice : data !== null && data.Price !== null?true : false,
                ProductCost : false,
                ContainerUnit : data !== null && data.Unit !== null?true : false,
                IsDiscounted : false,
                IsPrescription : false,
                DiscountPrice : false,
                Tags : true,
                Image : false,
                Description : data !== null && data.Description !== null?true : false,
            },
            ComponentFunction : this.renderPage(),
            FormIsValid : true,
        }
        
        this.PageRoles.push("InventoryManager")
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.ViewPreview = this.ViewPreview.bind(this)
        this.ViewAllProducts = this.ViewAllProducts.bind(this)
    }
    //ContainerUnits = ContainerUnit();
    SaveForm = async (data) => {
        // AddProductDetails
        this.setState({
            IsLoading: true
        })
        await Axios.post(process.env.REACT_APP_MIDDLEWARE + '/api/AddProductDetails', data).then(async res => {
            if (res.data.Code === '00') {
                await swal({
                    title: "Success!",
                    text: `Product details saved successfully`,
                    icon: "success",
                    button: {
                        text: "Ok",
                        closeModal: true,
                    },
                    dangerMode: true
                })
                this.ClearForm()
            } else {
                swal({
                    title: "Error!",
                    text: "Unable to save product details: " + res.data.Messages,
                    icon: "error",
                    button: {
                        text: "Ok",
                        closeModal: true,
                    },
                    dangerMode: true
                })
            }
        })
    }
    renderPage=()=>{
        return(<>
        
        <div className="form form-group container-login100" style = {{backgroundImage: `url(${LoginBackground})`}}>
        <div className = "card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
            <div className="row">
        <legend><center><h2><b>Product Setup </b></h2></center></legend>
        </div>
        
        <div className="row">
        <div className = "text-center card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
                <form onSubmit = {
                    this.handleSubmitForm
                } class="well form-horizontal">
                    <ProductToolbar 
                    homeAction={this.GoHome}
                    saveAction={this.handleFormSubmit} 
                    clearAction={this.ClearForm}
                    previewAction={this.ViewPreview} 
                    searchAction={this.ViewAllProducts}></ProductToolbar>
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
                    ProductNameFieldName
                }
                name = {
                    'Product Name'
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
                    ProductPriceFieldName
                }
                name = {
                    'Product Price'
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
                    "Cost Price"
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
                    true
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
                                className="form-control" 
                                name={ContainerUnitFieldName}
                                onChange={this.handleUserInput} style={{
                                    height:48
                                }}>
                                    <option  selected>{'unit per sale....'}</option>
                                    {ContainerUnit.map(x=>{
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
                        true
                        }></InputLabel>
                        <div className ={`text-default form-group`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={'fas fa-stethoscope'}></i>
                                    </span>                                    
                                </div>
                                <select id="IsPrescription" value={this.state.IsPrescription} 
                                className="form-control" 
                                name='IsPrescription'
                                onChange={this.handleUserInput} style={{
                                    height:48
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
                value = {''
                    //this.state.Image
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    true
                }
                errorMessage = {
                    this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.Image : ''
                } >
                </InputField>
               <div className="row text-center">
                    <div className="col-lg-4 col-md-8 col-md-12">
                    <InputLabel  name="Discounted" isValidProperty={
                        true
                        }></InputLabel>
                        <div className ={`text-default form-group`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={'fas fa-percent'}></i>
                                    </span>                                    
                                </div>
                                <select id="IsDiscounted" value={this.state.IsDiscounted} 
                                className="form-control" 
                                name='IsDiscounted'
                                onChange={this.handleUserInput} style={{
                                    height:48
                                }}>
                                    <option  selected>{'select....'}</option>
                                    <option  value={true}>{'Yes'}</option>
                                    <option  value={false}>{'No'}</option>
                                </select>                               
                                </div>
                                <div className="row">
                                <div className="col-12 mt-2 mb-1">
                                <small className="text-danger">{
                                this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.IsDiscounted : ''
                                }</small>
                                 </div>
                                </div>
                                </div>
                             </div>
                        </div> 
                <InputField type = {
                    "number"
                }
                placeholder = {
                    "discount price...."
                }
                id = {
                    'DiscountPrice'
                }
                name = {
                    "Discount Price"
                }
                fontAwesomeIcon = {
                    "fas fa-money"
                }
                value = {
                    this.state.DiscountPrice
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    true
                }
                errorMessage = {
                    this.state.ErrorMessage !== undefined ? this.state.ErrorMessage.DiscountPrice : ''
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
                                name={DescriptionFieldName}
                                required
                                rows="3"
                                placeholder="description"
                                onChange={this.handleUserInput}>
                                   
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
                        true
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
                                placeholder="#painkiller, #headache, #fever"
                                onChange={this.handleUserInput}>
                                    
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
    
    ViewPreview=(e)=>{
        var data = {
            Name : this.state.ProductName,
            Cost : this.state.ProductCost,
            IsPrescription : this.state.IsPrescription,
            Price : this.state.ProductPrice,
            Unit : this.state.ContainerUnit,
            Description : this.state.Description,
            Tags : this.state.Tags,
            Image : this.state.ImageString,
            IsDiscounted : this.state.IsDiscounted,
            DiscountPrice : this.state.DiscountPrice
        }
        localStorage.setItem('ProductData', JSON.stringify(data))
        this.HandleRedirect('/product-preview/', data)
    }
    ClearForm=()=>{        
            this.setState({ProductName : '',
            ProductCost : 0,
            IsPrescription : '',
            ProductPrice : 0,
            ContainerUnit : '',
            Description : '',
            Tags : '',
            ImageString : '',
            IsDiscounted : '',
            DiscountPrice : 0
    })
        localStorage.removeItem('ProductData')
        // this.HandleRedirect('/product-details/')
    }
    
    ViewAllProducts=(e)=>{
        this.HandleRedirect('/product-all/', {})
    }
    handleFormSubmit = (e) => {
        if (this.state.FormIsValid) {
            try{
                var data = {
                    Name : this.state.ProductName,
                    ImageString : this.state.ImageString,
                    Cost : this.state.ProductCost,
                    Price : this.state.ProductPrice,
                    ContainerUnit : this.state.ContainerUnit,
                    RequiresPrescription : this.state.IsPrescription,
                    Discounted : this.state.Discounted,
                    DiscountPrice : this.state.DiscountPrice,
                    Description : this.state.Description,
                    Tags : this.state.Tags
                }
                swal({
                    title: "Alert",
                    text: `Are you sure?`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then(async s => {
                    if (s) {
                        await this.SaveForm(data).then(async () => {
                            // await this.componentDidMount().then(() => {
                                
                            // })
                            this.setState({
                                IsLoading: false
                            });
                        })
                    }
                })
            }
            catch(error)
            {
                swal({
                    title: "Error!",
                    text: "Unable to save product info: " + e.message,
                    icon: "error",
                    button: {
                        text: "Ok",
                        closeModal: true,
                    },
                    dangerMode: true
                })
            }            
        }
    }
    handleUserInput=(e)=>{
        if(e.target.name === 'Image')
        {
            var file = e.target.files[0];
            if(file.size > 100000)
            {
                swal({
                    title: "Error!",
                    text: "File greater than 100kb",
                    icon: "error",
                    button: {
                      text: "Ok",
                      closeModal: true,
                    },
                    dangerMode: true
                  })
                return;
            }
            const options = {
                maxSizeMB: -10,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
                onProgress: () => null
            }
            var result = '';
            var reader = new FileReader()
            reader.onload=()=>{
                result = reader.result
                this.setState({ImageString : result})
            }
            imageCompression(file, options).then(compressedFile => {
                reader.readAsDataURL(compressedFile)
            });
            
        }
        this.setState({[e.target.name] : e.target.value})
        this.ValidateControls(e.target.name, e.target.value)
    }
    validateForm() {
        this.setState({
            formValid: this.state.ControlValid.ProductName &&
            this.state.ControlValid.ProductPrice &&
            this.state.ControlValid.ContainerUnit &&
            this.state.ControlValid.Description
        });
    }
    ValidateControls=(fieldName, value)=>{
        let fieldValidationErrors = this.state.ErrorMessage;
        let productNameValid = this.state.ControlValid.ProductName;
        let productPriceValid = this.state.ControlValid.ProductPrice;
        let descriptionValid = this.state.ControlValid.Description;
        let containerUnitValid = this.state.ControlValid.ContainerUnit;

        switch (fieldName) {
            case ProductNameFieldName:
                productNameValid = value.length >= ProductNameMinLength && value.length <= ProductNameMaxLength;
                fieldValidationErrors.ProductName = productNameValid ? '' : ProductNameInvalidErrorMessage;
                break;
            case ProductPriceFieldName:
                productPriceValid = value > 0;
                fieldValidationErrors.ProductPrice = productPriceValid ? '' : ProductPriceInvalidErrorMessage;
                break;
            case DescriptionFieldName:
                descriptionValid = value.length > 5;
                fieldValidationErrors.Description = descriptionValid ? '' : DescriptionInvalidErrorMessage;
                break;
            case ContainerUnitFieldName:
                containerUnitValid = value >= 0;
                fieldValidationErrors.ContainerUnit = containerUnitValid ? '' : ContainerUnitErrorMessage;
                break;
            default:
                break;
        }
        var ControlValid = this.state.ControlValid;
        ControlValid.ProductName = productNameValid
        ControlValid.ProductPrice = productPriceValid
        ControlValid.Description = descriptionValid
        ControlValid.ContainerUnit = containerUnitValid
        this.setState({
            ErrorMessage: fieldValidationErrors,
            ControlValid : ControlValid
        }, this.validateForm);
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default ProductIndex