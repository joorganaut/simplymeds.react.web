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
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import LoginBackground from "../master/Pharmacy/images/bg-01_old.jpg";
import NoImage from '../master/Pharmacy/css/images/No_Image_Available.jpg'

class AddPatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserID: props.UserID,
            Patient:{},
            IsLoading : true,
            IsFormValid : true,
            Redirect : false,
        }
        this.HandleUserInput = this.HandleUserInput.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }
    handleSubmitForm=(event)=>{
        event.preventDefault();
        var result;
        const data = this.state.Patient;
        //alert(this.state.Patient.DOB)
        try{
            swal({
                title: "Alert",
                text: `Are you sure?`,
                icon: "warning",
                buttons : true,
                dangerMode : true,
              }).then(async s =>{
                if (s) {
                    await this.UpdatePatientDetails(data).then(async ()=>{
                        await this.componentDidMount().then(()=>{
                            this.setState({IsLoading : false});
                        })
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
                    if (res.data.record !== null ) {
                        result = res.data.record;
                        result.ImageString = res.data.image;
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
        if(e.target.name === 'Image' && e.target.files.length > 0)
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
            var result = '';
            var reader = new FileReader()
            reader.onload=()=>{
                result = reader.result
                const Patient = this.state.Patient;
                Patient.ImageString = result
                this.setState({Patient : Patient})
            }
            reader.readAsDataURL(file)
            //this.getBase64(file, (x)=>{result = x})
            
        }
        const Patient = this.state.Patient;
        Patient[e.target.name] = e.target.value
        this.setState({Patient : Patient})
        //this.state.Patient[e.target.name] = e.target.value
    }
    SetStateOfProps(data)
    {
        this.setState({Patient : data})
        this.setState({IsLoading : false});
    }
    async componentDidMount(){
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
            //this.componentWillMount()
            this.setState({IsLoading : false})
          })
    }
    setRedirectToMedicalHistory=()=>this.setState({Redirect : true})
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
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
                {/* add patient picture */}
                <div className="row text-center">
                    <div className="col-lg-4 col-md-8 col-md-12">
                    <img src={
                            this.state.Patient !== undefined 
                            ? this.state.Patient.ImageString !== undefined
                            ? this.state.Patient.ImageString: NoImage : NoImage
                        } alt='' style={{
                            height : 150,
                            width : 150,
                            borderRadius : 100
                         }}/>
                    <div className ={`text-default form-group`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={'fas fa-camera'}></i>
                                    </span>                                    
                                </div>
                                <input type="file"                                 
                                    onChange = {this.HandleUserInput}
                                    className="form-control"
                                    name="Image"
                                    forHtml=''/>
                                </div>
                                {/* <InputFieldError errorMessage={this.props.errorMessage}></InputFieldError> */}
                                </div>
                             </div>
                        </div>    
               <InputField className = {"form-control"}
               type = {"text"}
               id = {'FirstName'}
               name = {"FirstName"}
               value = {this.state.Patient.FirstName}
               onChange={this.HandleUserInput}
               isValidProperty = {true}>
               </InputField>
   
               <InputField className = {"form-control"}
               type = {"text"}
               id = {'LastName'}
               name = {"LastName"}
               value = {this.state.Patient.LastName}
               onChange={this.HandleUserInput}
               isValidProperty = {true}>
               </InputField>
   
               <InputField className = {"form-control"}
               type = {"text"}
               id = {'MobilePhone'}
               name = {"PhoneNumber"}
               value = {this.state.Patient.PhoneNumber}
               onChange={this.HandleUserInput}
               isValidProperty = {true}>
               </InputField>
               <InputField className = {"form-control"}
               type = {"date"}
               id = {'DOB'}
               name = {"DOB"}
               value = {this.formatDate(this.state.Patient.DOB)}
               timezone=""
               onChange={this.HandleUserInput}
               isValidProperty = {true}>
               </InputField>
                <div className="row text-center">
                    <div className="col-lg-4 col-md-8 col-md-12">
                        <label for="Gender" isValidProperty={true} className="control-label">
                            Gender
                        </label>
                        <div className ={`text-default form-group`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={''}></i>
                                    </span>                                    
                                </div>
                                <select id="cars" value={this.state.Patient.Gender} 
                                className="dropdown-menu form-control" 
                                name='Gender'
                                onChange={this.HandleUserInput} style={{
                                    height:46
                                }}>
                                <option  value="0">Male</option>
                                <option  value="1">Female</option>
                                </select>                               
                                </div>
                                <div className="row">
                                <div className="col-12 mt-2 mb-1">
                                <small className="text-danger">{''}</small>
                                 </div>
                                </div>
                                </div>
                             </div>
                        </div>           
              
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
