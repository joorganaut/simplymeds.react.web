import React from 'react'
import RxComponent from '../master/BaseLoadingComponent'
import ProductToolbar from './product-toolbar'
import LoginBackground from "../master/Pharmacy/images/bg-01_old.jpg";
class ProductPreview extends RxComponent
{
    constructor(props)
    {
        super(props)
        this.state = {
            Roles : props.Roles,
            Product : props.Values,
            ComponentFunction : this.renderPage(),
        }
        this.PageRoles.push("InventoryManager")
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }
    componentWillMount(){
        //this.state.Product = this.props.Values
    }
    renderPage=()=>{
        return(<>
        
        <div className="form form-group container-login100" style = {{backgroundImage: `url(${LoginBackground})`}}>
        <div className = "card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
            <div className="row">
        <legend><center><h2><b>Product Preview<label >
        {/* <Consumer>
                {
                    (value) =>
                    {return (value.state.CartCount)}
                }
                </Consumer> */}
            </label></b></h2></center></legend>
        </div>
        
        <div className="row">
        <div className = "text-center card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
                <form onSubmit = {
                    this.handleSubmitForm
                } class="well form-horizontal">
                    <ProductToolbar 
                    saveAction={this.SaveForm} 
                    previewDisabled={true}
                    previewAction={this.ViewPreview} 
                    searchAction={this.ViewAllProducts}>
                    </ProductToolbar>
                    <br/>
                    <br/>
                    <fieldset>
                    <center>
                        <div className="container" style={{
                            border : 'none',
                            borderRadius : 50
                        }}>
                        <div className="row text-center justify-content-center bg-primary"
                        style={{
                            border : 'none',
                            borderRadius : '50px 50px 0 0'
                        }}>
                        <h2 class="text-dark"><strong>{
                        this.state.Product !== undefined ? this.state.Product.Name : ''
                        }</strong></h2>
                        </div>
                        <div className="row text-center justify-content-center bg-light"
                        >&nbsp;</div>
                        <div className="row" style={{
                            borderRadius : '50px 50px 50px 50px'
                        }}>
                        <div className="col text-center justify-content-center bg-light"style={{
                            borderRadius : '0px 0px 0px 50px'
                        }}>
                        {/* image column */}
                        <div class="text-center item mb-4">
                            {/* <span class="tag">Sale</span> */}
                            {/* <span class="tag align-top">View</span> */}
                            <a href="shop-single.html">
                                 <img src={this.state.Product.Image} alt='' style={{
                                     height : 300,
                                     width : 250
                                 }}/>
                                 </a>
                            
                            {/* <p class="price"><del>95.00</del> &mdash; $55.00</p> */}
                        </div>
              </div>
              <div className="col justify-content-center bg-light"style={{
                            borderRadius : '0px 0px 50px 0px'
                        }}>
                        {/* details column */}
                        <div className="row">
                            <div className="col-3 text-left strong"><strong>name:</strong></div><div className="col text-left">{
                        this.state.Product !== undefined ? this.state.Product.Name : ''
                        }</div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-left strong"><strong>description:</strong></div><div className="col text-left text-wrap">
                            {
                        this.state.Product !== undefined ? this.state.Product.Description : ''
                        }
                                </div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-left strong"><strong>cost price:</strong></div><div className="col text-left">{
                        this.state.Product !== undefined ? '=N='+this.state.Product.Cost : ''
                        }</div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-left strong"><strong>selling price:</strong></div><div className="col text-left">{
                        this.state.Product !== undefined ? '=N='+this.state.Product.Price : ''
                        }</div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-left strong"><strong>unit:</strong></div><div className="col text-left">{
                        this.state.Product !== undefined ? this.state.Product.Unit : ''
                        }</div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-left strong"><strong>requires prescription:</strong></div><div className="col text-left">{
                        this.state.Product !== undefined ? this.state.Product.IsPrescription : ''
                        }</div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-left strong"><strong>discounted:</strong></div><div className="col text-left">No</div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-left strong"><strong>discount price:</strong></div><div className="col text-left">N/A</div>
                        </div>
                        <div className="row">
                            <div className="col-3 text-left strong"><strong>tags:</strong></div><div className="col text-left text-wrap">
                            {
                        this.state.Product !== undefined ? this.state.Product.Tags : ''
                        }
                                </div>
                        </div>
              </div>
             
                        </div>
                    </div>
                </center>
                </fieldset>
                </form>                 
                 </div>
        </div>
        </div>
        </div>
        </>)
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
export default ProductPreview