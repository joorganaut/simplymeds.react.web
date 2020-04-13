import React, {Component} from 'react';
class InputFieldError extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-12 mt-2 mb-1">
        <small className="text-danger">{this.props.errorMessage}</small>
                </div>
            </div>
        )
    }
}
export default InputFieldError;