#  safer-rewire

This micro-lib provides a wrapper for rewire, exposing additional functions that ensure the mocked functionality is replaced rather than added in to the tested module

## Motivation

Idea for this project arose when encountered this [issue](https://github.com/jhnns/rewire/issues/182) in `rewire` library. After opening discussion of it, out of curiosity whipped up this lib to experiment whether more safer rewiring could be easily achieved, by leveraging the functionality inside `rewire` library.

## Usage

Module exports a wrapper function, that accepts actual `rewire` function as parameter, and returns an object which exposes following properties:


Property | Type | Description
---------|----------|---------
 rewiredModule | object | The original rewired module returned by `rewire`, for convenience
 \_\_replaceWith\_\_ | function | Same as `__with__`, but strips out properties from passed argument object, that do not exist in the tested module

### Example
```js
const rewire = require('rewire')
const saferRewire = require('safer-rewire')(rewire)
const { rewiredModule, __replaceWith__ } = saferRewire('foo.js')

describe('foo', () => {
  describe('#hello SAFE', () => {
    let mocks
    const hello = rewiredModule.__get__('hello')
    beforeEach(() => {
      mocks = {
        bar: sinon.stub().returns('bar message') // `bar` is not defined anywhere in foo.js
      }
    });
    it('should throw error from missing definition', () => {
      return __replaceWith__({ ...mocks })(() => {
        expect(() => hello()).to.throw('bar is not a function')
      })
    });
  });
});

```
