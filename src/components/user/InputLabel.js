import React, {Component} from 'react';
import InputLabelValidationIcon from './InputLabelValidationIcon'
class InputLabel extends Component{
    render(){
        return (
        <label htmlFor={this.props.id} className="control-label">
            {this.props.name}{this.renderValidationIcon(this.props.isValidProperty)}
        </label>)
    }
    renderValidationIcon(isValidProperty)
    {
        if(isValidProperty)
        {
            return <InputLabelValidationIcon fontAwesomeIcon={"fa-check"} textColour={"text-success"}></InputLabelValidationIcon>
        }
        else
        {
            return <InputLabelValidationIcon fontAwesomeIcon={"fa-times"} textColour={"text-danger"}></InputLabelValidationIcon>
        }
    }
}
export default InputLabel;