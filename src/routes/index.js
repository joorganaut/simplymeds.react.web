import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signin from '../components/Pages/home-sign'
import Signup from '../components/Pages/home-signup'
import Index from '../components/Pages/home-index'
import PatientIndex from '../components/Pages/patient-index'
import PatientMedicals from '../components/Pages/patient-medicals'
import ProductIndex from '../components/Pages/product-index'
import ProductAll from '../components/Pages/product-all'
import ProductPreview from '../components/Pages/product-preview'
let getUserRoles=(id)=>{

}

export default function Routes (){
    var user = JSON.parse(localStorage.getItem('User'))
    var roles;
    if(user !== null)
    {
        roles = getUserRoles(user.ID)
    }
    else
    {
        user = {
            IsAuthenticated : false
        }
    }
    return(
    <BrowserRouter>
    <Switch>
        <Route path='/' exact component={Index}/>
        <Route path='/signin' component={Signin}/>
        <Route path='/signup' component={Signup}/>
        {/* <AuthenticatedRoute User={user} Roles={roles}/> */}
        <Route path='/patient-details/*' component={PatientIndex}/>
        <Route path='/patient-medicals/*' component={PatientMedicals}/>
        <Route path='/product-details/*' component={ProductIndex}/>
        <Route path='/product-preview/*' component={ProductPreview}/>
        <Route path='/product-all/*' component={ProductAll}/>
        <Route component={Index} />
    </Switch>
    </BrowserRouter>
    );
}