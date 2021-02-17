const expect = require('chai').expect
const helpers = require('../../lib/helpers')
const validImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
const invalidImage = 'base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg='
const corruptedImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAAggg=='


describe('Base64 Image Validation', () => {

  it('Should return true if valid Base64 Image Is provided', async () => {
    expect(await helpers.checkValidImageOrNot(validImage)).to.equal(true)
  })

  it('Should return false if invalid Base64 Image Is provided', async () => {
    expect(await helpers.checkValidImageOrNot(invalidImage)).to.equal(false)
  })

  it('Should return false if empty Image Is provided', async () => {
    expect(await helpers.checkValidImageOrNot(invalidImage)).to.equal(false)
  })

  it('Should return false if object Is provided', async () => {
    expect(await helpers.checkValidImageOrNot({})).to.equal(false)
  })

  it('Should return false if null Is provided', async () => {
    expect(await helpers.checkValidImageOrNot(null)).to.equal(false)
  })

  it('Should return false if invalidType Is provided', async () => {
    expect(await helpers.checkValidImageOrNot(19.0)).to.equal(false)
  })
  it('Should return false if corruptedImage Is provided', async () => {
    expect(await helpers.checkValidImageOrNot(corruptedImage)).to.equal(false)
  })


})
