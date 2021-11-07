/* eslint-disable no-unused-vars */
import "../App.scss";
import React from "react";
import { BrowserRouter, Route, Routes, Switch, Link } from "react-router-dom";


const Header = () => {
  return (
    <div>
          <h1> This is just the test</h1>
          <ul className="nav">
              <li>
                  <Link to ="/"> Home </Link>
              </li>
              <li>
                  <Link to ="/metroYak"> MetroYak </Link>
              </li>
              <li>
                  <Link to ="/metroNom"> MetroNom </Link>
              </li>
          </ul>
    </div>
  );
};

export default Header;
