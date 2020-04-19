import React, {Component} from 'react'
import Index from '../master/index'
import Footer from '../master/footer'
import Body from '../patient/addpatient'


class Home extends Component {
  constructor(props)
  {
    super(props)
    var cart = JSON.parse(localStorage.getItem(`${props.ID}:Cart`))
    var userID = new URLSearchParams(this.props.location.search).get("id");
    this.state = {
      UserID : userID,
      CartCount : cart !== null ? cart.Length : 0
    } 
    
  }
    render(){
    return (
        <div>
        <Index CartCount={this.state.CartCount}></Index>
        <Body UserID = {this.state.UserID}></Body>
        <Footer></Footer>
        </div>
    );
  }
}
  export default Home;