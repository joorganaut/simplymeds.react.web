import React, {Component} from 'react'
import Index from '../master/index'
import Footer from '../master/footer'
import Body from '../patient/addpatient'


class Home extends Component {
  constructor(props)
  {
    super(props)
    var userID = new URLSearchParams(this.props.location.search).get("id");
    this.state = {
      UserID : userID,
    } 
    
  }
    render(){
    return (
        <div>
        <Index></Index>
        <Body UserID = {this.state.UserID}></Body>
        <Footer></Footer>
        </div>
    );
  }
}
  export default Home;