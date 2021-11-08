/* eslint-disable no-undef */
/* eslint-disable jest/valid-describe */
const MetroToken = artifacts.require('MetroToken')
const YakToken = artifacts.require('YakToken')
const TokenPool = artifacts.require('YakTokenPool')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenPool', ([owner, investor]) => {
  let metroToken, yakToken, tokenPool

  before( async() => {
    // Load Contracts
    metroToken = await MetroToken.new()
    yakToken =  await YakToken.new()
    tokenPool =  await TokenPool.new(yakToken.address, metroToken.address)

    // Transfer all YAK tokens to Pool 
     await yakToken.transfer(tokenPool.address, tokens('1000000'))

    // Send tokens to investor
     await metroToken.transfer(investor, tokens('100'), { from: owner })
  })

  describe('Metro deployment', async () => {
    it('has a name', async () => {
      const name = await metroToken.name()
      assert.equal(name, 'Metro Token')
    })
  })

  describe('Yak Token deployment', async () => {
    it('has a name', async () => {
      const name = await yakToken.name()
      assert.equal(name, 'YAK Token')
    })
  })

  describe('Token Pool deployment', async () => {
    it('has a name', async () => {
      const name = await tokenPool.name()
      assert.equal(name, 'YAK Token Pool')
    })

    it('contract has tokens', async () => {
      let balance = await yakToken.balanceOf(tokenPool.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Pooling tokens', async () => {

    it('rewards investors for staking metro tokens', async () => {
      let result

      // Check investor balance before staking
      result = await metroToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock metro wallet balance correct before staking')

      // Stake Mock METRO Tokens
      await metroToken.approve(tokenPool.address, tokens('100'), { from: investor })
      await tokenPool.stakeTokens(tokens('100'), { from: investor })

      // Check staking result
      result = await metroToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('0'), 'investor Mock metro wallet balance correct after staking')

      result = await metroToken.balanceOf(tokenPool.address)
      assert.equal(result.toString(), tokens('100'), 'Token Pool Mock metro balance correct after staking')

      result = await tokenPool.stakingBalance(investor)
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

      result = await tokenPool.isStaking(investor)
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

      // Issue Tokens
      await tokenPool.issueTokens({ from: owner })

      // Check balances after issuance
      result = await yakToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor YAK Token wallet balance correct affter issuance')

      // Ensure that only onwer can issue tokens
      await tokenPool.issueTokens({ from: investor }).should.be.rejected;

      // Unstake tokens
      await tokenPool.unstakeTokens({ from: investor })

      // Check results after unstaking
      result = await metroToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock metro wallet balance correct after staking')

      result = await metroToken.balanceOf(tokenPool.address)
      assert.equal(result.toString(), tokens('0'), 'Token Pool Mock metro balance correct after staking')

      result = await tokenPool.stakingBalance(investor)
      assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')

      result = await tokenPool.isStaking(investor)
      assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
    })
  })

})
