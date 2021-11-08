/* eslint-disable no-undef */
// const TokenFarm = artifacts.require('TokenPool')
const YakTokenPool = artifacts.require('YakTokenPool')

module.exports = async function(callback) {
  let ytokenPool = await YakTokenPool.deployed()
  await ytokenPool.issueTokens()
  // Code goes here...
  console.log("Tokens issued!")
  callback()

  // let tokenFarm = await TokenFarm.deployed()
  // await tokenFarm.issueTokens()
  // // Code goes here...
  // console.log("Tokens issued!")
  // callback()
}
