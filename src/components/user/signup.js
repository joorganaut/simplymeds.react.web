/* eslint-disable react/no-direct-mutation-state */
import React, {
    Component
} from "react";
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import InputField from './InputField'
import Button from './Button'

import swal from 'sweetalert';
import LoginBackground from "./Login/images/bg-01.jpg";
const FullNameFieldName = 'fullName';
const EmailAddressFieldName = 'emailAddress';
const MobilePhoneNumberFieldName = 'mobilePhoneNumber';
const PasswordFieldName = 'password'
const RPasswordFieldName = 'rpassword';
const FullNameMinLength = 5;
const FullNameMaxLength = 30;
const PasswordMinLength = 0;
const FullNameInvalidErrorMessage = `Full Name must be between ${FullNameMinLength} - ${FullNameMaxLength} characters`;
const EmailAddressInvalidErrorMessage = `Email Address is not a valid email address`;
const MobilePhoneNumberInvalidErrorMessage = `Mobile Phone Number is not a valid mobile number`;
const PasswordInvalidErrorMessage = `Password must be ${PasswordMinLength} characters`;
const RPasswordInvalidErrorMessage = `Passwords must match`;
//var history = createBrowserHistory({ basename: '/' });


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            emailAddress: '',
            mobilePhoneNumber: '',
            password: '',
            rpassword: '',
            formErrors: {
                fullName: '',
                emailAddress: '',
                mobilePhoneNumber: '',
                password: '',
                rpassword: ''
            },
            fullNameValid: false,
            emailAddressValid: false,
            mobilePhoneNumberValid: false,
            passwordValid: false,
            rpasswordValid: false,
            formValid: false,
            redirect : false,
            redirectPath : '',
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
                [name]: value
            },
            () => {
                this.validateField(name, value)
            });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fullNameValid = this.state.fullNameValid;
        let emailAddressValid = this.state.emailAddressValid;
        let mobilePhoneNumberValid = this.state.mobilePhoneNumberValid;
        let passwordValid = this.state.passwordValid;
        let rpasswordValid = this.state.rpasswordValid;

        switch (fieldName) {
            case FullNameFieldName:
                fullNameValid = value.length >= FullNameMinLength && value.length <= FullNameMaxLength;
                fieldValidationErrors.fullName = fullNameValid ? '' : FullNameInvalidErrorMessage;
                break;
            case EmailAddressFieldName:
                emailAddressValid = value.trim().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.emailAddress = emailAddressValid ? '' : EmailAddressInvalidErrorMessage;
                break;
            case MobilePhoneNumberFieldName:
                mobilePhoneNumberValid = value.match(/^((0|\+234)8\d{3}\s?\d{6})$/);
                fieldValidationErrors.mobilePhoneNumber = mobilePhoneNumberValid ? '' : MobilePhoneNumberInvalidErrorMessage;
                break;
            case PasswordFieldName:
                passwordValid = value.length >= PasswordMinLength;
                fieldValidationErrors.password = passwordValid ? '' : PasswordInvalidErrorMessage;
                break;
            case RPasswordFieldName:
                rpasswordValid = value === this.state.password;
                fieldValidationErrors.rpassword = rpasswordValid ? '' : RPasswordInvalidErrorMessage;
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            fullNameValid: fullNameValid,
            emailAddressValid: emailAddressValid,
            mobilePhoneNumberValid: mobilePhoneNumberValid,
            passwordValid: passwordValid,
            rpasswordValid: rpasswordValid
        }, this.validateForm);
    };

    validateForm() {
        this.setState({
            formValid: this.state.fullNameValid &&
                this.state.emailAddressValid &&
                this.state.mobilePhoneNumberValid &&
                this.state.passwordValid &&
                this.state.rpasswordValid
        });
    }
    renderRedirect = (path) => {
        swal({
            title: "Success",
            text: "You have successfully signed up, please login",
            icon: "success",
            button: {
                text: "Ok",
                closeModal: true,
            },
            dangerMode: true
        })
        return <Redirect to = {path}/>
    }
    handleSubmitForm(event) {
        event.preventDefault();

        if (this.state.formValid) {

            const data = {
                FirstName: this.state.fullName.split(' ')[0],
                LastName: this.state.fullName.split(' ')[1],
                FullName: this.state.fullName,
                Email: this.state.emailAddress.trim(),
                Username: this.state.emailAddress.trim(),
                MobilePhoneNumber: this.state.mobilePhoneNumber,
                Password: this.state.password,
            };
            var result={}
            var shouldRedirect = {};
            var isConfirm = {}
            try{
                swal({
                    title: "Alert",
                    text: "Are you sure?",
                    icon: "warning",
                    buttons : true,
                    dangerMode : true,
                  }).then(s=>{
                        isConfirm = s;
                        if(isConfirm)
                        {
                            Axios.post(process.env.REACT_APP_MIDDLEWARE + '/api/RegisterUser', data)
                            .then(res => {
                                result = res;
                                if (result.data.Code === '00') {
                                    this.setState({redirect : true, redirectPath : '/signin'});
                                    //this.setState({redirectPath : '/signin'});
                                } else {
                                    swal({
                                        title: "Error!",
                                        text: "Unable to register: " + result.data.Error,
                                        icon: "error",
                                        button: {
                                            text: "Ok",
                                            closeModal: true,
                                        },
                                        dangerMode: true
                                    })
                                    shouldRedirect = false;
                                }
                            })
                        }
                        
                        })
                
              }
              catch(error)
              {
                result = error.message;
                swal({
                    title: "Error!",
                    text: "Unable to register " + result,
                    icon: "error",
                    button: {text: "Ok", closeModal: true,}
                })
              }
        }
    }

    //   var history = useHistory();
    render() {
            if(this.state.redirect)
            {
                return this.renderRedirect(this.state.redirectPath)
            }
        else{
            return (
                <div className = "form container-login100 text-center" 
                style = {
                    {
                        backgroundImage: `url(${LoginBackground})`
                    }
                } >
                <div className = "text-center card-body wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30" >
                <form onSubmit = {
                    this.handleSubmitForm
                } class="well form-horizontal">
                    <fieldset>
                    <legend><center><h2><b>Sign Up</b></h2></center></legend>
                    <center>
                    <div className="form-group text-center justify-content-center ">
                <InputField className = {
                    "text-center"
                }
                type = {
                    "text"
                }
                id = {
                    FullNameFieldName
                }
                name = {
                    "Full Name"
                }
                fontAwesomeIcon = {
                    "fa fa-user"
                }
                value = {
                    this.state.fullName
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    this.state.fullNameValid
                }
                errorMessage = {
                    this.state.formErrors.fullName
                } >
                </InputField>
                <InputField type = {
                    "email"
                }
                id = {
                    EmailAddressFieldName
                }
                name = {
                    "Email Address"
                }
                fontAwesomeIcon = {
                    "fa fa-envelope"
                }
                value = {
                    this.state.emailAddress
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    this.state.emailAddressValid
                }
                errorMessage = {
                    this.state.formErrors.emailAddress
                } >
                </InputField> 
                <InputField type = {
                    "text"
                }
                id = {
                    MobilePhoneNumberFieldName
                }
                name = {
                    "Mobile Phone"
                }
                fontAwesomeIcon = {
                    "fa fa-phone"
                }
                value = {
                    this.state.mobilePhoneNumber
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    this.state.mobilePhoneNumberValid
                }
                errorMessage = {
                    this.state.formErrors.mobilePhoneNumber
                } >
                </InputField>
                <InputField type = {
                    "password"
                }
                id = {
                    PasswordFieldName
                }
                name = {
                    "Password"
                }
                fontAwesomeIcon = {
                    "fa fa-key"
                }
                value = {
                    this.state.password
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    this.state.passwordValid
                }
                errorMessage = {
                    this.state.formErrors.password
                } >
                </InputField>
                <InputField type = {
                    "password"
                }
                id = {
                    RPasswordFieldName
                }
                name = {
                    "Retype Password"
                }
                fontAwesomeIcon = {
                    "fa fa-key"
                }
                value = {
                    this.state.rpassword
                }
                onChange = {
                    this.handleUserInput
                }
                isValidProperty = {
                    this.state.rpasswordValid
                }
                errorMessage = {
                    this.state.formErrors.rpassword
                } >
                </InputField> 
                </div>
                </center>
                <div className = "container-login100-form-btn" >
                <Button type = {
                    "submit"
                }
                id = {
                    "submit-form-button"
                }
                text = {
                    "Sign Up"
                }
                disabled = {
                    !this.state.formValid
                } > 
                </Button> 
                </div>
                </fieldset>
                </form> 
                </div>
                </div>
            );
        }
                
            }
}
export default (SignUp);