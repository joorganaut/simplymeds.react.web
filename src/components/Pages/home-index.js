import React, {Component} from 'react'
import Index from '../master/index'
import Footer from '../master/footer'
import Body from '../master/landing'
var GetRoles=()=>{
  return this !== undefined ?this.props.location.state.Roles : []
}
class HomeIndex extends Component {
  
  constructor(props)
  {
    super(props)
    var cart = JSON.parse(localStorage.getItem(`${props.ID}:Cart`))
    var userID = new URLSearchParams(this.props.location.search).get("id");
    this.state = {
      Roles : GetRoles(),//props.Roles,
      UserID : userID,
      CartCount : cart !== null ? cart.Length : 0
    } 
    
  }
    render(){
    return (
        <div>
        <Index CartCount={this.state.CartCount}></Index>
        <Body UserID = {this.state.UserID} Roles={this.state.Roles}></Body>
        <Footer></Footer>
        </div>
    );
  }
}
  export default HomeIndex;