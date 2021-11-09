/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */

import React, { Component } from 'react'
import Web3 from 'web3'
import MetroToken from '../artifacts_contracts/MetroToken.json'
import BabaToken from '../artifacts_contracts/BabaToken.json'
import BabaTokenPool from '../artifacts_contracts/BabaTokenPool.json'
import Navbar from '../components/Navbar'
import Main from './MetroBabaMain'
import '../App.scss'
import MetroBabaMain from './MetroBabaMain'

class MetroBaba extends Component {

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

    // Load BabaToken
    const babaTokenData = BabaToken.networks[networkId]
    if(babaTokenData) {
      const babaToken = new web3.eth.Contract(BabaToken.abi, babaTokenData.address)
      this.setState({ babaToken })
      let babaTokenBalance = await babaToken.methods.balanceOf(this.state.account).call()
      this.setState({ babaTokenBalance: babaTokenBalance.toString() })
    } else {
      window.alert('BabaToken contract not deployed to detected network.')
    }

    // Load BabaTokenPool
    const babaTokenPoolData = BabaTokenPool.networks[networkId]
    if(babaTokenPoolData) {
      const babaTokenPool = new web3.eth.Contract(BabaTokenPool.abi, babaTokenPoolData.address)
      this.setState({ babaTokenPool })
      let stakingBalance = await babaTokenPool.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('BabaTokenPool contract not deployed to detected network.')
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
    this.state.metroToken.methods.approve(this.state.babaTokenPool._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.babaTokenPool.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.babaTokenPool.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      metroToken: {},
      babaToken: {},
      babaTokenPool: {},
      metroTokenBalance: '0',
      babaTokenBalance: '0',
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
        babaTokenBalance={this.state.babaTokenBalance}
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

export default MetroBaba;

