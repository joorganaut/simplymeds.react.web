import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Signin from '../components/Pages/home-sign'
import Signup from '../components/Pages/home-signup'
import Index from '../components/Pages/home-index'
import PatientIndex from '../components/Pages/patient-index'

export default function Routes(){
    return(
    <Switch>
        <Route path='/' exact component={Index}/>
        <Route path='/signin' component={Signin}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/patient-details/*' component={PatientIndex}/>
        <Route component={Index} />
    </Switch>
    );
}