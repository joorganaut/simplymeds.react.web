import React, {Component} from 'react'
import Index from '../master/index'
import Footer from '../master/footer'
import Body from '../product/product-preview'


class Home extends Component {
  constructor(props)
  {
    super(props)
    var userID = new URLSearchParams(this.props.location.search).get("id");
    //var state = this.props.location.state !== undefined ? this.props.location.state.Values : {};
    this.state = {
      UserID : userID,
      //Values : state
    } 
  }
  
    render(){
      return (
        <div>
        <Index ></Index>
        <Body  UserID = {this.state.UserID} Roles={['InventoryManager', 'Customer']} ></Body>
        <Footer></Footer>
        </div>
    );
  }
}
  export default Home;