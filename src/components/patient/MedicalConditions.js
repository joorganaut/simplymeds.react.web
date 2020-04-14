import React, {Component} from 'react'
import {Table} from 'react-bootstrap'
import Axios from 'axios'
import swal from 'react-bootstrap-sweetalert'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
const GetPatientMedicals = async (id) => {
  var result = {};
  var error = '';
  var data = {
      PatientID: id
  }
  try {
      await Axios.post(process.env.REACT_APP_MIDDLEWARE + '/api/RetrievePatientMedicals', data).then(async res => {
          if (res.data.Code === '00') {
              if (res.data.record !== null && res.data.record.length > 0) {
                  result = res.data.record[0];
              }else{
                  swal({
                      title: "Failure!",
                      text: "Oops!! seems something terrible happened",
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

class MedicalConditions extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            PatientID : props.PatientID,
            IsLoading : true,
            Medicals : []
        }
    }
    componentWillMount(){
      var values = [
        {
          ID : 1,
          Name : 'Asthma',
          Medication : 'Ventolin',
          UsedLast : '12th May 2019'
        },
        {
          ID : 2,
          Name : 'Diabetes',
          Medication : 'Glucophage',
          UsedLast : '1st April 2020'
        },
        {
          ID : 3,
          Name : 'Corona Flu',
          Medication : 'Choroquine',
          UsedLast : '1st Dec 2019'
        },
        {
          ID : 3,
          Name : 'Corona Flu2',
          Medication : 'Choroquine',
          UsedLast : '1st Dec 2019'
        },
        {
          ID : 3,
          Name : 'Corona Flu3',
          Medication : 'Choroquine',
          UsedLast : '1st Dec 2019'
        },
        {
          ID : 3,
          Name : 'Corona Flu4',
          Medication : 'Choroquine',
          UsedLast : '1st Dec 2019'
        },
        {
          ID : 3,
          Name : 'Corona Flu5',
          Medication : 'Choroquine',
          UsedLast : '1st Dec 2019'
        },
        {
          ID : 3,
          Name : 'Corona Flu6',
          Medication : 'Choroquine',
          UsedLast : '1st Dec 2019'
        },
        {
          ID : 3,
          Name : 'Corona Flu7',
          Medication : 'Choroquine',
          UsedLast : '1st Dec 2019'
        },
      ]
      this.setState({Medicals : values})
      this.setState({IsLoading : false})
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
      {columns.map(col => <td key={`Add-${col.heading}`}>{col.heading !== 'ID' ?<input type="text"></input> :''}</td>)}
                    <td><button className="btn btn-primary"><i className="fa fa-plus"></i></button></td>
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
      timeout={10000}/>
         </div>
         </center>
         )
      }
      else{
      //   <th></th>
      // <th>Condition</th>
      // <th>Medication</th>
      // <th>Used Last</th>
        return <Table variant="light" striped bordered hover size='sm' className="col-lg-12 col-md-8 col-sm-4">
        {this.buildTable([{heading : 'ID'}, {heading:'Name'}, {heading : 'Medication'}, {heading : 'UsedLast'}], this.state.Medicals, '')}
        </Table>
      }
        }
}
export default MedicalConditions
