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
import Button from '../user/Button'
import {Button as ModalButton} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'
import MedicalCondition from './MedicalConditions'
import Example from './example'
// import 'react-bootstrap'
// import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import "../user/Login/css/main.css";
// import "../user/Login/css/util.css";
// import "../user/Login/vendor/bootstrap/css/bootstrap.min.css";
// import "../user/Login/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
// import "../user/Login/fonts/iconic/css/material-design-iconic-font.min.css";
// import "../user/Login/vendor/animate/animate.css";
// import "../user/Login/vendor/css-hamburgers/hamburgers.min.css";
// import "../user/Login/vendor/animsition/css/animsition.min.css";
// import "../user/Login/vendor/select2/select2.min.css";
// import "../user/Login/vendor/daterangepicker/daterangepicker.css";
import LoginBackground from "../master/Pharmacy/images/bg-01_old.jpg";
import { Container } from 'rsuite';

class AddPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserID: props.UserID,
            Patient:{},
            //InfoLoaded : false,
            FirstName : '',
            IsLoading : true,
            IsFormValid : false,
            ShowModal : false
        }
    }
    GetPatient = async (id) => {
        var result = {};
        var error = '';
        var data = {
            UserID: id
        }
        try {
            await Axios.post(process.env.REACT_APP_MIDDLEWARE + '/api/RetrievePatientDetails', data).then(async res => {
                if (res.data.Code === '00') {
                    if (res.data.record !== null && res.data.record.length > 0) {
                        result = res.data.record[0];
                        await swal({
                            title: "Success!",
                            text: `Patient ${result.FirstName} ${result.LastName} info loaded successfully`,
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
                        text: "Unable to get patient info: " + res.data.Messages,
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
    SetStateOfProps(data)
    {
        this.setState({Patient : data})
        this.setState({FirstName : data.FirstName});
        this.setState({IsLoading : false});
    }
    handleShow = (e) => {
        this.setState({ShowModal : true})
        //alert(this.state.ShowModal)
        
    };
    handleClose = (e)=>{
        this.setState({ShowModal : false})
    }
    async componentWillMount(){
        await this.GetPatient(this.state.UserID).then(res =>{
            this.SetStateOfProps(res)
        })
        
    }
     render () {
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
         return(<>
            <div className = " form container-login100"
            style = {{backgroundImage: `url(${LoginBackground})`}}>
                {/* <Example></Example> */}
            <div className = "card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
            <form onSubmit = {this.handleSubmitForm} className="well form-horizontal">
                <legend><center><h2><b>Patient Details</b></h2></center></legend>
                <div class="form-group">
            <InputField className = {""}
            type = {"text"}
            id = {'FirstNameFieldName'}
            name = {"First Name"}
            value = {this.state.Patient.FirstName}
            isValidProperty = {true}>
            </InputField>

            <InputField className = {""}
            type = {"text"}
            id = {'LastNameFieldName'}
            name = {"Last Name"}
            value = {this.state.Patient.LastName}
            isValidProperty = {true}>
            </InputField>

            <InputField className = {""}
            type = {"text"}
            id = {'MobilePhoneFieldName'}
            name = {"Mobile Phone"}
            value = {this.state.Patient.PhoneNumber}
            isValidProperty = {true}>
            </InputField>
           
            <div className = "container-login100-form-btn">
            <Button type = {"submit"}
            id = {"submit-form-button"}
            text = {"Update"}
            disabled = {!this.state.formValid} > 
            </Button> 
            </div>
            </div>
            <div className="container-login100-form-btn">
            <ModalButton className="btn btn-primary" onClick={this.handleShow} >
        Add Medicals
      </ModalButton>
            </div>
            </form> 
            </div>              
            </div>
            <Modal show={this.state.ShowModal} onHide={this.handleClose} animation={false}
            className=""
            dialogClassName="modal-100w modal-dialog modal-lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
          <Modal.Header closeButton>
            <Modal.Title><legend><center><h2><b>Medical History</b></h2></center></legend></Modal.Title>
          </Modal.Header>
          <Modal.Body >
              <div>
               <div>{/* className = "card-body p-l-55 p-r-55 p-t-80 p-b-30" > */}
                <MedicalCondition PatientID = {this.state.Patient.ID}></MedicalCondition>
              </div>
              </div>
            </Modal.Body>
          <Modal.Footer>
          <ModalButton variant="primary" className="btn btn-success" onClick={this.handleClose} >
        Add
      </ModalButton>
            <ModalButton variant="secondary" className="btn btn-primary" onClick={this.handleClose} >
        Close
      </ModalButton>
          </Modal.Footer>
        </Modal>
        </>
        );
         }
     
     }
    
    }
    export default AddPatient
