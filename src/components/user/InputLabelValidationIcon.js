import React, {Component} from 'react';
class InputLabelValidationIcon extends Component{
    render(){
        return <span>
            &nbsp;
            <i className={`fa ${this.props.fontAwesomeIcon} ${this.props.textColour}`} aria-hidden="true"></i>
        </span>
    }
}
export default InputLabelValidationIcon;