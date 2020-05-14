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
import MiddlewareManager from '../master/MiddlewareManager'
let manager = new MiddlewareManager()
class ProductList extends RxComponent{
    constructor(props) {
        super(props)
        this.state = {
            Products : [],
            BackUrl: '',
            ViewDetail : 0,
            Roles: props.Roles,
            IsLoading : true,
            ComponentFunction: this.renderPage(),
            pagingParams: {
                page: 1,
                pageSize: 5,
                totalItemsCount: 0
            },
            searchParams:{
                Name : '',
                Brand : '',
                IsPrescription : '',
                Discounted : '',
                Tags : '',
                Price : 0
            }
        }
        this.PageRoles.push("InventoryManager")
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.renderPage = this.renderPage.bind(this)
        this.renderRedirect = this.renderRedirect.bind(this)
    }
    async componentDidMount() {
        var values = []
        await this.setState({IsLoading : true}, ()=>{})
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
                    DiscountedPrice: obj.DiscountPrice,
                    Stock: obj.stock !== null ? obj.stock : 0,
                })
            )
        }
        // values.forEach(async x=>{
        //     await this.GetProductStockAndImage(x.ID, async(y)=>{
        //         x.Stock = y !== undefined && y.record !== undefined ? y.record.Stock : 0
        //     })
        // })
        await this.setState({
            Products: values
        })
        // await this.setState({
        //     Reload: true
        // })
        await this.setState({
            IsLoading: false
        })
        // await this.setState({
        //     Reload: false
        // })
    }
    ViewPreview = async (e) => {
        var data = {}
        //Get Actual Product 
        var postData = {
            ID: this.state.ViewDetail
        }
        await manager.PostData(postData, '/api/RetrieveProductDetails', (response) => {
            if (response.data.Code === '00') {
                var res = response.data.record
                var image = response.data.image
                data = {
                    ID : res.ID,
                    Name: res.Name,
                    Brand: res.Brand,
                    Cost: res.Cost,
                    IsPrescription: res.RequiresPrescription === null?'false':res.RequiresPrescription.toString(),
                    Price: res.Price,
                    Unit: res.ContainerUnit.toString(),
                    Description: res.Description,
                    Tags: res.Tags,
                    Image: image,
                    IsDiscounted: res.Discounted === null?'false':res.Discounted.toString(),
                    DiscountPrice: res.DiscountPrice,
                    BackUrl: '/product-all/#/',
                    IsEdit: true,
                }
                localStorage.setItem('ProductData', JSON.stringify(data))
                this.HandleRedirect('/product-preview/', data)
            }
            else{
                swal({
                    title: "Failure!",
                    text: "Oops!! seems something terrible happened "+res.data.Message,
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
    GetAllProducts = async () => {
        var result = {};
        var error = '';
        var data = {            
            pagingParams : {
              page : this.state.pagingParams.page - 1,
              pageSize : this.state.pagingParams.pageSize,
              sort : 'ID',
              dir : 'asc'
            },
            query:this.state.searchParams
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
                        text: "Unable to get products: " + res.data.Message,
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

      GetProductStockAndImage = async (id, callback) => {
        var result = {
            error : '',
            record: {}
        };
        var data = {            
            ProductID : id
        }
        try {
            await Axios.post(process.env.REACT_APP_MIDDLEWARE + '/api/RetrieveProductStockAndImage', data).then(res => {
                if (res.data.Code === '00') {
                    if (res.data.record !== null) {
                        result.record = res.data.record;
                        callback(result)
                    }else{
                        result.error = 'unable to fetch details'
                    }
                } else {
                    result.error = 'unable to fetch detail ' + res.data.Message
                }
            })//.done()
        } catch (e) {
            result.error = 'unable to fetch detail ' + e.message            
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
                      <td><button className="btn btn-secondary shadow" title="view details" value={item['ID']} onClick={async(e)=>{await this.setState({ViewDetail : item['ID']}); this.ViewPreview(e)}}><i value={item['ID']} className="fas fa-info-circle"></i></button></td>
                      <td><button className="btn btn-danger shadow" title="delete" id={item['ID']} value={item['ID']} name={item['ID']+'del-btn'} onClick={this.HandleDelete}><i className="fas fa-trash"></i></button></td>
                  </tr>
              ) : <></>}
          </tbody></>
        );
    };
    handleFormSubmit=async (params)=>{
        var pagingParams = this.state.pagingParams
        pagingParams.page = 1;
        await this.setState({pagingParams : pagingParams}, ()=>{})
        await this.setState({IsLoading: true}, ()=>{}) 
        await this.setState({searchParams : params}, ()=>{})
        await this.componentDidMount();
        await this.setState({
        IsLoading: false
        }, ()=>{});
    }
    
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
                    clearDisabled={true}              
                    homeAction={()=>{ localStorage.removeItem('ProductData'); this.GoHome('/product-details/#/')}}
                    saveAction={this.handleFormSubmit} 
                    clearAction={this.ClearForm}
                    previewAction={this.ViewPreview} 
                    backAction={()=>this.GoBack(this.state.BackUrl)}
                    searchAction={this.ViewAllProducts}></ProductToolbar>
                    <fieldset>
                    <center>
                    <div className="form-group text-center justify-content-center ">
                    <ProductSearchbar SearchAction={this.handleFormSubmit}></ProductSearchbar>
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
        {heading : 'DiscountedPrice'},
        {heading : 'Stock'}],
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