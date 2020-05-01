import React from 'react'
import RxComponent from '../master/BaseLoadingComponent'
import {Table} from 'react-bootstrap'
import Axios from 'axios'
import swal from 'sweetalert';
import Loader from 'react-loader-spinner'
import ProductToolbar from './product-toolbar'
import ProductSearchbar from './product-searchbar'
import Pagination from "react-js-pagination";
import 'react-bootstrap'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBackground from "../master/Pharmacy/images/bg-01_old.jpg";
import { Redirect } from 'react-router-dom';
import { relativeTimeThreshold } from 'moment';
import ContainerUnit from './ContainerUnit'

class ProductList extends RxComponent{
    constructor(props) {
        super(props)
        this.state = {
            Products : [],
            Roles: props.Roles,
            IsLoading : true,
            ComponentFunction: this.renderPage(),
            pagingParams: {
                page: 1,
                pageSize: 5,
                totalItemsCount: 0
            },
            searchParams:{
                name : '',
                brand : '',
                prescription : null,
                discounted : null,
                tags : '',
                cost : 0
            }
        }
        this.PageRoles.push("InventoryManager")
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.renderPage = this.renderPage.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }
    async componentDidMount() {
        var values = []
        var x = await this.GetAllProducts()
        if (x !== null && x.length > 0) {
            values = x.map(obj =>
                ({
                    ID: obj.ID,
                    Name: obj.Name,
                    Brand: obj.Brand,
                    Cost: obj.Cost,
                    Price: obj.Price,
                    Unit: obj.ContainerUnit,
                    Prescription: obj.RequiresPrescription,
                    Discounted: obj.Discounted,
                    DiscountedPrice: obj.DiscountPrice
                })
            )
        }
        this.setState({
            Products: values
        })
        this.setState({
            Reload: true
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
    GetAllProducts = async () => {
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
            await Axios.post(process.env.REACT_APP_MIDDLEWARE + '/api/AllProducts', data).then(res => {
                if (res.data.Code === '00') {
                    if (res.data.records !== null && res.data.count > 0) {
                        result = res.data.records;
                        this.state.pagingParams.totalItemsCount = res.data.count;
                        swal({
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
            })//.done()
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
              <tr>{columns.map(col => <th className='text-center' key={`header-${col.heading}`}>{
                  col.heading === 'ID' 
              ? '' 
              : col.heading === 'Prescription'
              ?'Requires Prescription'
              : col.heading === 'DiscountedPrice'
              ? 'Discounted Price'
              : col.heading}</th>)}
              <th className='text-center'><button className="btn btn-secondary shadow" style={{borderRadius : 100}} title="refresh"><i className="fas fa-refresh"></i></button></th>
             <th></th>
              </tr>
          </thead>
          <tbody>
              {data !== undefined ? data.map(item =>
                  <tr key={`${item[propertyAsKey]}-row`}>
                      {columns.map(col => <td 
                      key={`${item[propertyAsKey]}-${col.heading}`} 
                      className={
                          typeof item[col.heading] === 'string'
                      ?'text-left': typeof item[col.heading] === 'boolean' || item[col.heading] === null? 'text-center' : 'text-right'
                      }>
                      {
                          col.heading === 'Unit'
                        ? ContainerUnit.filter(x=> x.Value === item[col.heading])[0] !== undefined
                        ? ContainerUnit.filter(x=> x.Value ===  item[col.heading])[0].Name 
                        : typeof ContainerUnit.filter(x=> x.Value ===  item[col.heading])[0]
                        : typeof item[col.heading] === 'boolean' 
                        ? item[col.heading].toString() 
                        : item[col.heading] === null && col.heading === 'Discounted'
                        ? 'false'
                        : item[col.heading]
                      }
                      </td>)}
                      <td><button className="btn btn-secondary shadow" title="view details"><i className="fas fa-info-circle"></i></button></td>
                      <td><button className="btn btn-danger shadow" title="delete" id={item['ID']} value={item['ID']} name={item['ID']+'del-btn'} onClick={this.HandleDelete}><i className="fas fa-trash"></i></button></td>
                  </tr>
              ) : <></>}
          </tbody></>
        );
    };
    handleFormSubmit=()=>{}
    handlePageChange=(e)=>{
        this.setState({
          IsLoading: true
        })
        this.state.pagingParams.page = e;
        this.componentDidMount();
        this.setState({
          IsLoading: false
        });
      }
    renderPage=()=>{
        return(<>
        <div className="form form-group container-login100" style = {{backgroundImage: `url(${LoginBackground})`}}>
        <div className = "card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
        <legend><center><h2><b>View All Products</b></h2></center></legend>
        <ProductToolbar 
                    homeAction={this.GoHome}
                    saveAction={this.handleFormSubmit} 
                    clearAction={this.ClearForm}
                    previewAction={this.ViewPreview} 
                    searchAction={this.ViewAllProducts}></ProductToolbar>

                   
                    <fieldset>
                    <center>
                    <div className="form-group text-center justify-content-center ">
                    <ProductSearchbar></ProductSearchbar>
        <Table variant="light" striped bordered hover size='md' className="col-lg-4 col-md-4 col-sm-8">
        {this.buildTable([
            {heading : 'ID'}, 
        {heading:'Name'},
        {heading:'Brand'},  
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
          activePage={this.state.pagingParams.page}
          itemsCountPerPage={this.state.pagingParams.pageSize}
          totalItemsCount={this.state.pagingParams.totalItemsCount}
          pageRangeDisplayed={2}
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