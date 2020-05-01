import React, {Component} from 'react'
import Axios from 'axios'
//import {REACT_APP_MIDDLEWARE} from 'react-native-dotenv'
import swal from 'sweetalert';
const MainHost = process.env.REACT_APP_MIDDLEWARE
class MiddlewareManager extends Component {
    PostData = async (data, method, callback) => {
        var response = {}
        var host = 'https://simplymeds-express.herokuapp.com';
        var host2 = 'http://10.0.2.2:8081'
        try {
            await Axios.post(MainHost+method, data)
                .then(res => {
                    //result = res;
                    callback(res)
                })
        } catch (error) {
            response.Error = error.message;
        }
        return response
    }

    Notification=async(...params)=>{
        swal({
            title: params.Title,
            text: params.Text,
            icon: params.Icon,
            button: {
              text: "Ok",
              closeModal: true,
            },
            dangerMode: params.DangerMode
          })
    }

}
export default MiddlewareManager