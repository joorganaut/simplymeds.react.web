import React, {Component} from 'react'
import Index from '../master/index'
import Footer from '../master/footer'
// import Body from '../master/test-date-picker'
import Body from '../patient/MedicalConditions'


class Home extends Component {
  constructor(props)
  {
    super(props)
    var cart = JSON.parse(localStorage.getItem(`${props.ID}:Cart`))
    var PatientID = new URLSearchParams(this.props.location.search).get("id");
    this.state = {
      PatientID : PatientID,
      CartCount : cart !== null ? cart.Length : 0
    } 
    
  }
    render(){
    return (
        <div>
        <Index CartCount={this.state.CartCount}></Index>
        <Body PatientID = {this.state.PatientID}></Body>
        <Footer></Footer>
        </div>
    );
  }
}
  export default Home;