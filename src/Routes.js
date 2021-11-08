/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import "./App.scss";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MetroYak from "./pages/MetroYak";
import MetroNom from "./pages/MetroNom";
import NotFound from "./pages/NotFound";
import Card from "./components/Card"
import { useNavigate } from "react-router-dom";
import { Redirect } from 'react-router';
import CardStructure from "./components/Card";
import Navbar from './components/Navbar'
import MetroYakMain from './pages/MetroYakMain'

// can use forceRefresh in browserrouter
// const App = () => {
class Routes extends Component {

  render() {
    return (
      <div>
        <BrowserRouter basename="/MetroStaking">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/metroYak" component={ MetroYak }  />
          <Route path="/metroNom" component={ MetroNom } exact />
          <Route component={ NotFound }/>
        </Switch>
      </BrowserRouter>

      </div>
      
    );
  }  
}

export default Routes;
