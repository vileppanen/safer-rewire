#  safer-rewire

This micro-lib provides a wrapper for rewire, exposing additional functions that ensure the mocked functionality is replaced rather than added in to the tested module

## Motivation

Idea for this project arose when encountered this [issue](https://github.com/jhnns/rewire/issues/182) in `rewire` library. After opening discussion of it, out of curiosity whipped up this lib to experiment whether more safer rewiring could be easily achieved, by leveraging the functionality inside `rewire` library.

