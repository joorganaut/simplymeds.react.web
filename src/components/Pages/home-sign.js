import React, {Component} from 'react'
import Index from '../master/index'
import Footer from '../master/footer'
import Body from '../user/login'

class HomeSignIn extends Component {
    render(){
    return (
        <div>
        <Index></Index>
        <Body></Body>
        <Footer></Footer>
        </div>
    );
  }
}
  export default HomeSignIn;