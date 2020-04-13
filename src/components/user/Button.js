import React, {Component} from 'react';

class Button extends Component{
    render(){
        return(
            <div className="row">
<div className="col-12">
<button
type={this.props.type}
id={this.props.id}
className="btn btn-success btn-block"
disabled={this.props.disabled}>
{this.props.text}
</button>
</div>
            </div>
        )
    }
}
export default Button;