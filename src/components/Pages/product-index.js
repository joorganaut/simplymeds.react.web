import React, {Component} from 'react'
import Index from '../master/index'
import Footer from '../master/footer'
import Body from '../product/product-index'
import { render } from '@testing-library/react'


class Home extends Component {
  constructor(props)
  {
    super(props)
    var cart = JSON.parse(localStorage.getItem(`${props.ID}:Cart`))
    var userID = new URLSearchParams(this.props.location.search).get("id");
    this.state = {
      UserID : userID,
      CartCount : cart !== null ? cart.Length : 0, 
      ReloadCart : false
    } 
    this.OnAddToCart = this.OnAddToCart.bind(this)
  }
  OnAddToCart=()=>{
    //this.setState({ReloadCart : true})
    this.state.ReloadCart = true
    this.render()
  }
  toggleState(){
    this.setState({ReloadCart : !this.state.ReloadCart})
  }
    render(){
      return (
        <div>
        <Index CartCount={this.state.CartCount} ReloadCart={this.state.ReloadCart} ></Index>
        <Body OnAddToCart={this.OnAddToCart} UserID = {this.state.UserID} Roles={['InventoryManager', 'Customer']}></Body>
        <Footer></Footer>
        </div>
    );
  }
}
  export default Home;