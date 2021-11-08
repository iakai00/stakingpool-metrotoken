/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import "./App.scss";
import React, { Component } from "react";
import Navbar from './components/Navbar'
import Routes from "./Routes";
import Card from "./components/Card"



// can use forceRefresh in browserrouter
// const App = () => {
class App extends Component {

  render() {
    return (
      <div className="pt-5">
        <Navbar />
        <Card />
        <Routes />
      </div>
      
    );
  }  
}

export default App;
