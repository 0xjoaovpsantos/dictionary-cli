'use strict';

var _nodeFetch = _interopRequireWildcard(require('node-fetch'));

var _dictionaryCli = require('./dictionary-cli');

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

jest.mock('node-fetch', () => {
  const originalModule = jest.requireActual('node-fetch');
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(),
  };
});
describe('Function: formatArray', () => {
  describe(`When input is { array: ['lorem', 'ipsum'], description: 'Lorem Ipsum'}`, () => {
    it("console.log must be called once and return 'Lorem Ipsum: lorem ipsum'", () => {
      console.log = jest.fn();
      (0, _dictionaryCli.formatArray)({
        array: ['lorem', 'ipsum'],
        description: 'Lorem Ipsum',
      });
      expect(console.log.mock.calls).toHaveLength(1);
      expect(console.log).toHaveBeenCalledWith('Lorem Ipsum: lorem ipsum \n');
    });
  });
});
describe('Function: fetchApi', () => {
  const word = 'Hello';
  const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  describe(`When input is '${word}'`, () => {
    _nodeFetch.default.mockClear();

    _nodeFetch.default.mockReturnValue(
      new _nodeFetch.Response(
        JSON.stringify({
          mock: true,
        })
      )
    );

    (0, _dictionaryCli.fetchApi)(word);
    it("fetch function from 'node-fetch' must be called once", () => {
      expect(_nodeFetch.default.mock.calls).toHaveLength(1);
    });
    it(`fetch function from 'node-fetch' must be called with '${apiUrl}${word}'`, () => {
      expect(_nodeFetch.default).toHaveBeenCalledWith(`${apiUrl}${word}`);
    });
  });
});
