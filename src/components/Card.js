/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import "../App.scss";
import * as React from "react";
import { BrowserRouter, Route, Routes, Switch, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import lakhe from "../images/lakhe.png";
import baba from "../images/baba.png";
import dhar from "../images/dhar.png";
import nom from "../images/nom.png";
import metro from "../images/MetroLogo.png";


// <Link to="/metroYak">Enter Pool</Link>

// <button className="card__btn">
//         <Link to="/metroNom">Enter Pool</Link>
//       </button>

const Card = () => {
  return (
    <div className="wrapper">
      <CardStructure
        img={lakhe}
              title="Metro to Yak Pool"
               pic={lakhe}
        description="Stake metro token to earn yak token as incentives"
        path="/metroYak"
      />
      <CardStructure
        img={baba}
              title="Metro to Nom Pool"
              pic= {baba}
        description="Stake metro token to earn nom token as incentives"
        path="/metroNom"
      />
      <CardStructure
        img={dhar}
              title="Metro to DHAR Pool"
              pic={dhar}
        description="Stake metro token to earn dhar token as incentives"
        path="/metroDhar"
      />
      <CardStructure
        img={nom}
              title="Metro to BABA Pool"
              pic={nom}
        description="Stake metro token to earn baba token as incentives"
        path="/metroBaba"
      />
    </div>
  );
};

function CardStructure(props) {
  return (
    <div className="card">
      <div className="card__body">
        <img className="card__image" src={props.img} height="100" />
              <h2 className="card__title">{props.title}&nbsp;&nbsp;
                  <img src={ metro }  alt="" style={{ width: 40, height: 40, borderRadius: 40 / 2 }} /> -  &nbsp;
                  <img src={props.pic}  alt="" style={{ width: 40, height: 40, borderRadius: 40 / 2 }} />
              </h2>
              <p className="card_description" style={{ paddingLeft: 10 }}>{props.description}</p>
        <Link to={props.testvalue} />
      </div>
            <button className="card__btn">
                <a href={ props.path} >Enter Pool</a>
            </button>
    </div>
  );
}

export default Card;
