import React from 'react';
import {Route} from 'react-router-dom';
import Axios from 'axios'
import Index from '../components/Pages/home-index'
import PatientIndex from '../components/Pages/patient-index'
import PatientMedicals from '../components/Pages/patient-medicals'
import ProductIndex from '../components/Pages/product-index'

export default function AuthenticatedRoute(params)
{
    let GetMenuOptions=()=>{
        /**/
        var result;
        var data = {
            ID : params.User.ID
        }
        result = async()=>await Axios.post(process.env.REACT_APP_MIDDLEWARE+'/api/RetrieveMenuByUser', data)
        
        return result;
    }
    if(params.User.IsLoggedIn)
    {
        return (<>
        <Route path='/patient-details/*' component={PatientIndex}/>
        <Route path='/patient-medicals/*' component={PatientMedicals}/>
        <Route path='/product-details/*' component={ProductIndex}/> 
        </>)
        
    }
    else
    {
        return <Route path='/' component={Index}/>
    }
}