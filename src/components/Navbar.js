import React, { Component } from 'react'
import Metro from '../images/MetroLogo.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark text-warning flex-md-nowrap p-0 shadow margin pt-2">        
          <img src={Metro} width="30" height="30" className="d-inline-block align-top px-1" alt="" />
          &nbsp;&nbsp; METRO TOKEN STAKING POOL
        <ul className="navbar-nav">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block ">
            <small className="text-secondary">
              <b className="text-white-50">Wallet Address: </b>
              <small id="account" className="text-info">{this.props.account}</small>
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
