import React, { Component } from "react";
import nom from "../images/baba.png";
import metro from "../images/MetroLogo.png";
import "../App.scss";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class MetroNomMain extends Component {
  render() {
    return (
      <div id="content" className="mt-3 row-border grid-container">
        <div>
          <h2 class="center">STAKE FOR NOM TOKEN &nbsp;&nbsp;<img src={ nom } height="32" alt="" style={{width: 50, height: 50, borderRadius: 50/ 2}}/></h2>
          <p className="row-border">Here you can stake metro tokens to gain nom tokens as rewards.</p>
          <table className="table table-borderless text-muted text-center row-border">
            <thead>
              <tr>
                <th scope="col">APY</th>
                <th scope="col">
                  20
                  %
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <th scope="col">Estimated Reward</th>
              <th scope="col">
                {window.web3.utils.fromWei(
                  this.props.stakingBalance,
                  "Ether"
                )}{" "}                
              </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="table table-borderless text-muted text-center">
            <thead>
              <tr>
                <th scope="col">Staking Balance</th>
                <th scope="col">Reward Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {window.web3.utils.fromWei(
                    this.props.stakingBalance,
                    "Ether"
                  )}{" "}
                  METRO
                </td>
                <td>
                  {window.web3.utils.fromWei(
                    this.props.nomTokenBalance,
                    "Ether"
                  )}{" "}
                  NOM
                </td>
              </tr>
            </tbody>
          </table>

          <div className="card mb-4">
            <div className="card-body">
              <form
                className="mb-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  let amount;
                  amount = this.input.value.toString();
                  amount = window.web3.utils.toWei(amount, "Ether");
                  this.props.stakeTokens(amount);
                }}
              >
                <div>
                  <label className="float-left">
                    <b>Stake Tokens</b>
                  </label>
                  <span className="float-right text-muted">
                    Balance:{" "}
                    {window.web3.utils.fromWei(
                      this.props.metroTokenBalance,
                      "Ether"
                    )}
                  </span>
                </div>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    ref={(input) => {
                      this.input = input;
                    }}
                    className="form-control form-control-lg"
                    placeholder="0"
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <img src={metro} height="32" alt="" />
                      &nbsp;&nbsp;&nbsp; METRO
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                >
                  STAKE!
                </button>
              </form>
              <button
                type="submit"
                className="btn btn-link btn-block btn-sm"
                onClick={(event) => {
                  event.preventDefault();
                  this.props.unstakeTokens();
                }}
              >
                UN-STAKE...
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MetroNomMain;
