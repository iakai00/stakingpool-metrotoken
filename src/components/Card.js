/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import "../App.scss";
import * as React from "react";
import { BrowserRouter, Route, Routes, Switch, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import lakhe from "../images/lakhe.png"
import baba from "../images/baba.png"
import dhar from "../images/dhar.png"
import nom from "../images/nom.png"


const Card = () => {
    const history = useHistory();
    const goLogin = () => history.push('login');
    return (
        <div className="wrapper">
          <CardStructure img={lakhe} title="Metro to Yak Pool" description="Stake metro token to earn yak token as incentives" />
          <CardStructure img={baba} title="Metro to Yak Pool" description="Stake metro token to earn yak token as incentives" />
          <CardStructure img={dhar} title="Metro to Yak Pool" description="Stake metro token to earn yak token as incentives" />
          <CardStructure img={nom} title="Metro to Yak Pool" description="Stake metro token to earn yak token as incentives" />
        </div>
       
    )
}

function CardStructure(props) {
    return (
        <div className="card">
        <div className="card__body">
            <img className= "card__image" src={ props.img } height="100" />
            <h2 className="card__title">{ props.title }</h2>
            <p className="card_description">{props.description}</p>
        </div>
        <button className="card__btn"><Link to ="/metroNom">Enter Pool </Link></button>

    </div>
    )
}

export default Card;