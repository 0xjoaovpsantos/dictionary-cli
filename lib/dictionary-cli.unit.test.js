'use strict';

var _dictionaryCli = require('./dictionary-cli');

var _nodeFetch = _interopRequireDefault(require('node-fetch'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

jest.mock('node-fetch', () => {
  return jest.fn();
});
describe('Function: formatArray', () => {
  describe(`When input is { array: ['lorem', 'ipsum'], description: 'Lorem Ipsum'}`, () => {
    it("console.log must be called once and return 'Lorem Ipsum: lorem ipsum'", () => {
      console.log = jest.fn();
      (0, _dictionaryCli.formatArray)({
        array: ['lorem', 'ipsum'],
        description: 'Lorem Ipsum',
      });
      expect(console.log.mock.calls.length).toBe(1);
      expect(console.log).toHaveBeenCalledWith('Lorem Ipsum: lorem ipsum \n');
    });
  });
});
describe('Function: fetchApi', () => {
  const word = 'Hello';
  const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  describe(`When input is '${word}'`, () => {
    _nodeFetch.default.mockReturnValue({
      example: 'test',
    });

    (0, _dictionaryCli.fetchApi)(word);
    it("fetch function from 'node-fetch' must be called once", () => {
      expect(_nodeFetch.default.mock.calls.length).toBe(1);
    });
    it(`fetch function from 'node-fetch' must be called with '${apiUrl}${word}'`, () => {
      expect(_nodeFetch.default).toHaveBeenCalledWith(`${apiUrl}${word}`);
    });
  });
});
