/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */

import React, { Component } from 'react'
import Web3 from 'web3'
import MetroToken from '../artifacts_contracts/MetroToken.json'
import NomToken from '../artifacts_contracts/NomToken.json'
import NomTokenPool from '../artifacts_contracts/NomTokenPool.json'
import Navbar from '../components/Navbar'
import Main from './MetroNomMain'
import '../App.scss'
class MetroNom extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load MetroToken
    const metroTokenData = MetroToken.networks[networkId]
    if(metroTokenData) {
      const metroToken = new web3.eth.Contract(MetroToken.abi, metroTokenData.address)
      this.setState({ metroToken })
      let metroTokenBalance = await metroToken.methods.balanceOf(this.state.account).call()
      this.setState({ metroTokenBalance: metroTokenBalance.toString() })
    } else {
      window.alert('MetroToken contract not deployed to detected network.')
    }

    // Load NomToken
    const nomTokenData = NomToken.networks[networkId]
    if(nomTokenData) {
      const nomToken = new web3.eth.Contract(NomToken.abi, nomTokenData.address)
      this.setState({ nomToken })
      let nomTokenBalance = await nomToken.methods.balanceOf(this.state.account).call()
      this.setState({ nomTokenBalance: nomTokenBalance.toString() })
    } else {
      window.alert('NomToken contract not deployed to detected network.')
    }

    // Load NomTokenPool
    const nomTokenPoolData = NomTokenPool.networks[networkId]
    if(nomTokenPoolData) {
      const nomTokenPool = new web3.eth.Contract(NomTokenPool.abi, nomTokenPoolData.address)
      this.setState({ nomTokenPool })
      let stakingBalance = await nomTokenPool.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('NomTokenPool contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.metroToken.methods.approve(this.state.nomTokenPool._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.nomTokenPool.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.nomTokenPool.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      metroToken: {},
      nomToken: {},
      nomTokenPool: {},
      metroTokenBalance: '0',
      nomTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">LOADING. . .</p>
    } else {
      content = <Main
        metroTokenBalance={this.state.metroTokenBalance}
        nomTokenBalance={this.state.nomTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default MetroNom;

