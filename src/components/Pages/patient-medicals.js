import React, {Component} from 'react'
import Index from '../master/index'
import Footer from '../master/footer'
// import Body from '../master/test-date-picker'
import Body from '../patient/MedicalConditions'


class Home extends Component {
  constructor(props)
  {
    super(props)
    var PatientID = new URLSearchParams(this.props.location.search).get("id");
    this.state = {
        PatientID : PatientID,
    } 
    
  }
    render(){
    return (
        <div>
        <Index></Index>
        <Body PatientID = {this.state.PatientID}></Body>
        <Footer></Footer>
        </div>
    );
  }
}
  export default Home;