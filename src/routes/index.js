import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Signin from '../components/Pages/home-sign'
import Signup from '../components/Pages/home-signup'
import Index from '../components/Pages/home-index'

export default function Routes(){
    return(
    <Switch>
        <Route path='/' exact component={Index}/>
        <Route path='/signin' component={Signin}/>
        <Route path='/signup' component={Signup}/>
        <Route component={Index} />
    </Switch>
    );
}