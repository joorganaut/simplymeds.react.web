import React, {Component} from 'react'
import {Table} from 'react-bootstrap'
import InputField from '../user/InputField'
import Axios from 'axios'
import swal from 'sweetalert';
import Loader from 'react-loader-spinner'
import 'react-bootstrap'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBackground from "../master/Pharmacy/images/bg-01_old.jpg";

class MedicalConditions extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            PatientID : props.PatientID,
            IsLoading : true,
            Medicals : [],
            Name : '',
            TreatmentPlan : '',
            UsedLast : ''
        }
    }
    
    async componentWillMount(){
      var values = []
       await this.GetPatientMedicals(this.state.PatientID).then(data=>{
        //alert(typeof(data))
        if(data === null || data.length <= 0) 
        {
          values = [
            {
              ID : 1,
              Name : 'Asthma',
              TreatmentPlan : 'Ventolin',
              UsedLast : '12th May 2019',
              IsLoading : this.state.IsLoading
            },
            {
              ID : 2,
              Name : 'Diabetes',
              TreatmentPlan : 'Glucophage',
              UsedLast : '1st April 2020'
            },
            {
              ID : 3,
              Name : 'Corona Flu',
              TreatmentPlan : 'Choroquine',
              UsedLast : '1st Dec 2019'
            }
          ]
        }
       })

       
      this.setState({Medicals : values})
      this.setState({IsLoading : false})
    }
    handleChange =(value, formattedValue) =>{
      this.setState({
        value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
        formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
      });
    }
    handleUserInput=(e)=>{
      this.setState({[e.target.name] : e.target.value})
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
        <span className="input-group-text">
            <i className='fa fa-info-circle' aria-hidden="true"></i>
        </span>  
        <input type="text" className="form-control"  onChange={this.handleUserInput} name='Name'   value={this.state.Name}>
        </input> 
          </div></div>  
        </td>
        <td key={`Add-${'ID'}`}>   
        <div className="input-group input-group-lg">
         <div className="input-group-prepend">
        <span className="input-group-text">
            <i className='fa fa-medkit' aria-hidden="true"></i>
        </span>  
        <input type="text" className="form-control"  onChange={this.handleUserInput} name='TreatmentPlan'   value={this.state.TreatmentPlan}>
        </input> 
          </div></div> 
        </td>
        <td key={`Add-${'ID'}`}>   
        <div className="input-group input-group-lg">
         <div className="input-group-prepend">
        <span className="input-group-text">
            <i className='fa fa-calendar' aria-hidden="true"></i>
        </span>  
        <input type="date" className="form-control"  onChange={this.handleUserInput} name='UsedLast'   value={this.state.UsedLast}>
        </input> 
          </div></div> 
        </td>
        <td><button className="btn btn-primary" onClick={this.HandleAdd}><i className="fa fa-plus"></i></button></td>
        <td></td>
        </tr>
            {data.map(item =>
                <tr key={`${item[propertyAsKey]}-row`}>
                    {columns.map(col => <td key={`${item[propertyAsKey]}-${col.heading}`}>{item[col.heading]}</td>)}
                    <td><button className="btn btn-primary"><i className="fa fa-pencil-square-o"></i></button></td>
                    <td><button className="btn btn-danger"><i className="fa fa-trash"></i></button></td>
                </tr>
            )}
        </tbody></>
      );
  };
    render(){
      
      if(this.state.IsLoading)
      {
         return(
             <center>
               <div>Please hold on.....
             <Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      //timeout={10000}
      />
         </div>
         </center>
         )
      }
      else{
        return <>
        <div className="form form-group container-login100" style = {{backgroundImage: `url(${LoginBackground})`}}>
        <div className = "card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
        <legend><center><h2><b>Patient Medical History</b></h2></center></legend>
        <Table variant="light" striped bordered hover size='md' className="col-lg-12 col-md-8 col-sm-4">
        {this.buildTable([{heading : 'ID'}, {heading:'Name'}, {heading : 'TreatmentPlan'}, {heading : 'UsedLast'}],
         this.state.Medicals, 'ID')}
        </Table></div></div>
        </>
      }
        }
    GetPatientMedicals = async (id) => {
      var result = {};
      var error = '';
      var data = {
          PatientID: id
      }
      try {
          await Axios.post(process.env.REACT_APP_MIDDLEWARE + '/api/RetrievePatientMedicals', data).then(async res => {
              if (res.data.Code === '00') {
                  if (res.data.record !== null && res.data.record.length > 0) {
                      result = res.data.record;
                      await swal({
                        title: "Success!",
                        text: `Patient medicals loaded successfully`,
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
                          text: "Oops!! seems there are no Medicals",
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
                      text: "Unable to get patient Medicals: " + res.data.Messages,
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
              text: "Unable to get patient info: " + error,
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
    AddPatientMedicals = async()=>{
      this.setState({IsLoading : true})
      var data = {
        PatientID : this.state.PatientID,
        Name : this.state.Name,
        TreatmentPlan : this.state.TreatmentPlan,
        LastUsed : this.state.UsedLast 
      } 
      try {
        await Axios.post(process.env.REACT_APP_MIDDLEWARE + '/api/AddPatientMedicals', data).then(async res => {
          if (res.data.Code === '00') {
          //   await this.GetPatientMedicals().then(values=>{
          //     this.setState({Medicals : values})
          //   this.setState({IsLoading : false})
          // })
            await swal({
              title: "Success!",
              text: `Patient medicals saved successfully`,
              icon: "success",
              button: {
                text: "Ok",
                closeModal: true,
              },
              dangerMode: true
            })
          } else {
            swal({
              title: "Error!",
              text: "Unable to save patient medical details: " + res.data.Messages,
              icon: "error",
              button: {
                text: "Ok",
                closeModal: true,
              },
              dangerMode: true
            })
          }
          this.setState({IsLoading : false})
        })
      } catch (error) {
        swal({
          title: "Error!",
          text: "Unable to save patient medical info: " + error,
          icon: "error",
          button: {
            text: "Ok",
            closeModal: true,
          },
          dangerMode: true
        })
        this.setState({IsLoading : false})
      }
      }
    HandleAdd =(e)=>{
      swal({
        title: "Alert",
        text: "Are you sure?",
        icon: "warning",
        buttons : true,
        dangerMode : true,
      }).then(async s =>{
        if (s) {
          this.AddPatientMedicals()
          //this.setState({IsLoading : true})
        }
      })
    }
}
export default MedicalConditions
