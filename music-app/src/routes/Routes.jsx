import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// Pages & Components
import Login from '../pages/Login'
import Menu from '../pages/Menu'
import Bands from '../components/Bands'
import '../css/Routes.css'

function Routes() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/menu/:id" component={Bands}></Route>
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/menu" component={Menu}></Route>
    </Switch>
    </BrowserRouter>    
  );
}

export default Routes;
