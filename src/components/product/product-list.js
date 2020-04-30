import React from 'react'
import RxComponent from '../master/BaseLoadingComponent'
import {Table} from 'react-bootstrap'
import Axios from 'axios'
import swal from 'sweetalert';
import Loader from 'react-loader-spinner'
import ProductToolbar from './product-toolbar'
import Pagination from "react-js-pagination";
import 'react-bootstrap'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBackground from "../master/Pharmacy/images/bg-01_old.jpg";
import { Redirect } from 'react-router-dom';
import { relativeTimeThreshold } from 'moment';
class ProductList extends RxComponent{
    constructor(props) {
        super(props)
        this.state = {
            Products : [],
            pagingParams: {
                page: 1,
                pageSize: 5,
                totalItemsCount: 0
            },
            Roles: props.Roles,
            ComponentFunction: this.renderPage(),
            ComponentLoadingMethod: this.componentWillMount()
        }
        this.PageRoles.push("InventoryManager")
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
    }
    async componentWillMount() {
        var values = []
        await this.GetAllProducts(x=>{
            if (x !== null && x.count > 0) {
                values = x.result.map(obj =>
                    ({
                        ID: obj.ID,
                        Name: obj.Name,
                        Cost: obj.Cost,
                        Price: obj.Price,
                        Unit: obj.ContainerUnit,
                        Prescription: obj.RequiresPrescription,
                        Discounted: obj.Discounted,
                        DiscountedPrice: obj.DiscountedPrice
                    })
                )
            }
        })
        this.setState({
            Products: values
        })
        this.setState({
            IsLoading: false
        })
        this.setState({
            Reload: false
        })
    }
    handleUserInput=()=>{

    }
    GetAllProducts = async (callback) => {
        var result = {};
        var error = '';
        var data = {
            
            pagingParams : {
              page : this.state.pagingParams.page - 1,
              pageSize : this.state.pagingParams.pageSize,
              sort : 'ID',
              dir : 'asc'
            }
        }
        try {
            await Axios.post(process.env.REACT_APP_MIDDLEWARE + '/api/AllProducts', data).then(async res => {
                if (res.data.Code === '00') {
                    if (res.data.records !== null && res.data.records.count > 0) {
                        result = res.data.records;
                        this.state.pagingParams.totalItemsCount = res.data.count;
                        callback(result)
                        await swal({
                          title: "Success!",
                          text: `Products loaded successfully`,
                          icon: "success",
                          button: {
                              text: "Ok",
                              closeModal: true,
                          },
                          dangerMode: true
                      }) 
                    }else{
                        swal({
                            title: "Failure!",
                            text: "Oops!! seems there are no products",
                            icon: "error",
                            button: {
                                text: "Ok",
                                closeModal: true,
                            },
                            dangerMode: true
                        })
                    }
                } else {
                    swal({
                        title: "Error!",
                        text: "Unable to get products: " + res.data.Messages,
                        icon: "error",
                        button: {
                            text: "Ok",
                            closeModal: true,
                        },
                        dangerMode: true
                    })
                }
            })
        } catch (e) {
            error = e.message;
            swal({
                title: "Error!",
                text: "Unable to get products: " + error,
                icon: "error",
                button: {
                    text: "Ok",
                    closeModal: true,
                },
                dangerMode: true
            })
        }
        return result;
      }
      buildTable = (columns, data, propertyAsKey) => {
        return (<>
        <thead>
              <tr>{columns.map(col => <th key={`header-${col.heading}`}>{col.heading === 'ID' ? '' : col.heading}</th>)}
              <th></th>
        <th></th>
              </tr>
          </thead>
          <tbody>
          <tr >
        <td key={`Add-${'ID'}`}>        
          </td>
          <td key={`Add-${'ID'}`}>   
          <div className="input-group input-group-lg">
           <div className="input-group-prepend">
          <span className="input-group-addon">
              <i className='fas fa-info-circle' aria-hidden="true"></i>
          </span>  
          <input type="text" className="form-control col-sm-12"  onChange={this.handleUserInput} name='Name'   value={this.state.Name}>
          </input> 
            </div></div>  
          </td>
          <td key={`Add-${'ID'}`}>   
          <div className="input-group input-group-lg">
           <div className="input-group-prepend">
          <span className="input-group-addon">
              <i className='fas fa-medkit' aria-hidden="true"></i>
          </span>  
          <input type="text" className="form-control col-sm-12"  onChange={this.handleUserInput} name='TreatmentPlan'   value={this.state.TreatmentPlan}>
          </input> 
            </div></div> 
          </td>
          <td key={`Add-${'ID'}`}>   
          <div className="input-group input-group-lg">
           <div className="input-group-prepend">
          <span className="input-group-addon">
              <i className='fas fa-calendar'></i>
          </span>  
          <input type="date" className="form-control col-sm-12"  onChange={this.handleUserInput} name='UsedLast'   value={this.state.UsedLast}>
          </input> 
            </div></div> 
          </td>
          <td><button className="btn btn-primary" onClick={this.HandleAdd} title="add"><i className="fas fa-plus"></i></button></td>
          <td></td>
          </tr>
              {/* {data.map(item =>
                  <tr key={`${item[propertyAsKey]}-row`}>
                      {columns.map(col => <td key={`${item[propertyAsKey]}-${col.heading}`}>{item[col.heading]}</td>)}
                      <td><button className="btn btn-primary" title="edit"><i className="fas fa-pencil-square-o"></i></button></td>
                      <td><button className="btn btn-danger" title="delete" id={item['ID']} value={item['ID']} name={item['ID']+'del-btn'} onClick={this.HandleDelete}><i className="fas fa-trash"></i></button></td>
                  </tr>
              )} */}
          </tbody></>
        );
    };
    handleFormSubmit=()=>{}
    handlePageChange=()=>{}
    renderPage=()=>{
        return(<>
        <div className="form form-group container-login100" style = {{backgroundImage: `url(${LoginBackground})`}}>
        <div className = "card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
        <legend><center><h2><b>All Products</b></h2></center></legend>
        <ProductToolbar 
                    homeAction={this.GoHome}
                    saveAction={this.handleFormSubmit} 
                    clearAction={this.ClearForm}
                    previewAction={this.ViewPreview} 
                    searchAction={this.ViewAllProducts}></ProductToolbar>
                    <fieldset>
                    <center>
                    <div className="form-group text-center justify-content-center ">
        <Table variant="light" striped bordered hover size='md' className="col-lg-4 col-md-4 col-sm-8">
        {this.buildTable([
            {heading : 'ID'}, 
        {heading:'Name'}, 
        {heading : 'Cost'}, 
        {heading : 'Price'}, 
        {heading : 'Unit'},
        {heading : 'Prescription'},
        {heading : 'Discounted'},
        {heading : 'DiscountedPrice'}],
         this.state.Products, 'ID')}
        </Table>
       <div className="pagination">
       <Pagination
          itemClass="page-item"
          linkClass="page-link"
        //   activePage={this.state.pagingParams.page}
        //   itemsCountPerPage={this.state.pagingParams.pageSize}
        //   totalItemsCount={this.state.pagingParams.totalItemsCount}
          pageRangeDisplayed={1}
          onChange={this.handlePageChange.bind(this)}
        />
       </div>
       </div>
       </center>
       </fieldset>
        </div>
        </div>
        </>)
    }
    render(){
        return(<>
        {this.renderAllComponents(this.renderPage())}
        </>)
    }
}
export default ProductList