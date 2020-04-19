import React, {Component} from 'react';
import {Consumer} from '../store/providers/storeContextProvider'; 
class AddToCartButton extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            ID : props.ID,
            ProductID : this.props.ProductID,
            CartCount : 0
        }
    }
    // AddToCart=()=>{
    //     var cartItems = JSON.parse(localStorage.getItem(`${this.state.ID}:Cart`))
    //     if(cartItems === null)
    //     {
    //         cartItems = []            
    //     }
    //     cartItems.push({item : this.state.ProductID})
    //     localStorage.setItem(`${this.state.ID}:Cart`, JSON.stringify(cartItems))        
    //     this.setState({CartCount : cartItems.Length})
    // }
    render(){
        return(<>
        <Consumer>
            {(value) =>
                (<button className="btn btn-primary" onClick={()=>{value.actions.AddToCart(this.state.ID, this.state.ProductID)}}>Add</button>)
            }
        </Consumer>
        {/* <MContext> */}
            {/* <MContext.Subcriber></MContext.Subcriber> */}
            {/* {(context)=>( */}
                
            {/* )} */}
            {/* value.actions.AddToCart(this.state.ID, this.state.ProductID) */}
            {/* context.actions.AddToCart(this.state.ID, this.state.ProductID) */}
        {/* </MContext> */}
              
        </>
        )
    }
}
// AddToCartButton = connect()(AddToCartButton)
export default AddToCartButton