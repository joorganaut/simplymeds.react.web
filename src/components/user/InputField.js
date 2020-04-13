import React, {Component, Fragment} from 'react';
import InputLabel from './InputLabel';
import InputFieldError from './InputFieldError';
import InputLabelValidationIcon from './InputLabelValidationIcon';
const InputFieldPlaceHolder = 'Required';
class InputField extends Component{
    render(){
        return(
            <Fragment>
                <div className="row">
                    <div className="col-12">
                        <InputLabel id={this.props.id} name={this.props.name} isValidProperty={this.props.isValidProperty}>
                        </InputLabel>
                        <div className ={`text-default form-group`}>
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className={this.props.fontAwesomeIcon}></i>
                                    </span>                                    
                                </div>
                                <input
                                type={this.props.type}
                                id={this.props.id}
                                name={this.props.id}
                                required
                                className="form-control"
                                placeholder={InputFieldPlaceHolder}
                                value={this.props.value}
                                onChange={this.props.onChange}
                                />
                                </div>
                                <InputFieldError errorMessage={this.props.errorMessage}></InputFieldError>
                                </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default InputField;