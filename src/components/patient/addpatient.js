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
import LoginBackground from "../master/Pharmacy/images/bg-01_old.jpg";

class AddPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserID: props.UserID,
            Patient:{},
            IsLoading : true,
            IsFormValid : true,
            Redirect : false
        }
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }
    handleSubmitForm=(event)=>{
        event.preventDefault();
        var result;
        const data = this.state.Patient;
        alert(this.state.Patient.DOB)
        try{
            swal({
                title: "Alert",
                text: `Are you sure?`,
                icon: "warning",
                buttons : true,
                dangerMode : true,
              }).then(async s =>{
                if (s) {
                    await this.UpdatePatientDetails(data).then(()=>{
                        this.setState({IsLoading : false});
                    })
                }
              })
        }
        catch (e) {
            swal({
                title: "Error!",
                text: "Unable to update patient info: " + e.message,
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
                        this.SetStateOfProps(result)
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
    HandleUserInput=(e)=>{
        var patient = this.state.Patient;
        patient[e.target.name] = e.target.value
        this.setState({Patient : patient})
    }
    SetStateOfProps(data)
    {
        this.setState({Patient : data})
        this.setState({IsLoading : false});
    }
    async componentWillMount(){
        await this.GetPatient(this.state.UserID).then(res =>{
            //this.SetStateOfProps(res)
        })
        
    }
    renderRedirect = (path) => {
       return <Redirect to = {path}/>
    }
    redirectToMedicalHistory=()=>{
        return this.renderRedirect('/patient-medicals/?id='+this.state.Patient.ID)
    }

    UpdatePatientDetails= async (data)=>{
        this.setState({IsLoading : true})
        await Axios.post(process.env.REACT_APP_MIDDLEWARE + '/api/UpdatePatientDetails', data).then(async res => {
            if (res.data.Code === '00') {
            //   await this.GetPatientMedicals().then(values=>{
            //     this.setState({Medicals : values})
            //   this.setState({IsLoading : false})
            // })
              await swal({
                title: "Success!",
                text: `Patient medicals updated successfully`,
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
            this.componentWillMount()
            this.setState({IsLoading : false})
          })
    }
    setRedirectToMedicalHistory=()=>this.setState({Redirect : true})
     render () {
         if(this.state.Redirect)
         {
             return (this.redirectToMedicalHistory());
         }
         else{
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
               <div className = "card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
               <form method="post" onSubmit = {this.handleSubmitForm} className="well form-horizontal">
                   <legend><center><h2><b>Patient Details</b></h2></center></legend>
                   <div class="form-group">
               <InputField className = {"form-control"}
               type = {"text"}
               id = {'FirstNameFieldName'}
               name = {"FirstName"}
               value = {this.state.Patient.FirstName}
               onChange={this.HandleUserInput}
               isValidProperty = {true}>
               </InputField>
   
               <InputField className = {"form-control"}
               type = {"text"}
               id = {'LastNameFieldName'}
               name = {"LastName"}
               value = {this.state.Patient.LastName}
               onChange={this.HandleUserInput}
               isValidProperty = {true}>
               </InputField>
   
               <InputField className = {"form-control"}
               type = {"text"}
               id = {'MobilePhoneFieldName'}
               name = {"PhoneNumber"}
               value = {this.state.Patient.PhoneNumber}
               onChange={this.HandleUserInput}
               isValidProperty = {true}>
               </InputField>
               <InputField className = {"form-control"}
               type = {"date"}
               id = {'DOB'}
               name = {"DOB"}
               value = {this.state.Patient.DOB}
               onChange={this.HandleUserInput}
               isValidProperty = {true}>
               </InputField>
              
               <div className = "container-login100-form-btn">
               <Button type = {"submit"}
               id = {"submit-form-button"}
               text = {"Update"}
               disabled = {!this.state.IsFormValid} > 
               </Button> 
               </div>
               </div>
               <div className="container-login100-form-btn">
               <ModalButton className="btn btn-primary" onClick={this.setRedirectToMedicalHistory} >
           Add Medicals {this.state.Redirect}
         </ModalButton>
               </div>
               </form> 
               </div>              
               </div>
           </>
           );
            }
         }
         
     
     }
    
    }
    export default AddPatient
