const rewire = require('../src/safer-rewire')(require('rewire'))
const { rewiredModule, __replaceWith__ } = rewire('../tested-modules/foo')

describe('safer-rewire module', () => {
  describe('#__replaceWith__', () => {
    let mocks
    const foo = rewiredModule.__get__('foo')
    beforeEach(() => {
      mocks = {
        bar: sinon.stub().returns('bar'),
        zoo: sinon.stub().returns('xoo')
      }
    })
    it('should throw error for non-existing bar function', () => {
      return __replaceWith__({ ...mocks })(() => {
        expect(() => foo()).to.throw('bar is not defined')
      })
    })
    it('should call for existing mocked zoo function function', () => {
      return __replaceWith__({ ...mocks })(() => {
        expect(() => foo()).to.throw('bar is not defined')
        expect(mocks.zoo).to.have.been.called()
      })
    })
  })
})
