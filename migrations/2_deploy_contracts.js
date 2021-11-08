/* eslint-disable no-undef */
const YakToken = artifacts.require('YakToken')
const MetroToken = artifacts.require('MetroToken')
const NomToken = artifacts.require('NomToken')
// const TokenPool = artifacts.require('TokenPool')
const YakTokenPool = artifacts.require('YakTokenPool')
const NomTokenPool = artifacts.require('NomTokenPool')



module.exports = async function(deployer, network, accounts) {
  // Deploy Metro Token
  await deployer.deploy(MetroToken)
  const metroToken = await MetroToken.deployed()

  // Deploy Yak Token
  await deployer.deploy(YakToken)
  const yakToken = await YakToken.deployed()

  // Deploy NomToken
  await deployer.deploy(NomToken)
  const nomToken = await NomToken.deployed()

  // // Deploy TokenPool
  // await deployer.deploy(TokenPool, yakToken.address, metroToken.address, nomToken.address)
  // const tokenPool = await TokenPool.deployed()

  // Deploy YakTokenPool
  await deployer.deploy(YakTokenPool, yakToken.address, metroToken.address)
  const yaktokenPool = await YakTokenPool.deployed()

  // Deploy NomTokenPool
  await deployer.deploy(NomTokenPool, metroToken.address, nomToken.address)
  const nomtokenPool = await NomTokenPool.deployed()

  // Transfer all tokens to NomTokenPool 
  await nomToken.transfer(nomtokenPool.address, '500000000000000000000000000')

  // Transfer all tokens to YakTokenPool (1 million)
  await yakToken.transfer(yaktokenPool.address, '1000000000000000000000000')

  // Transfer 100 Metro tokens to investor
  await metroToken.transfer(accounts[1], '100000000000000000000')

  // Transfer 500 Metro tokens to investor
  await metroToken.transfer(accounts[2], '500000000000000000000')

  
}
