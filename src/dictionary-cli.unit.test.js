import fetch, { Response } from 'node-fetch';
import { formatArray, fetchApi } from './dictionary-cli';

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

      formatArray({ array: ['lorem', 'ipsum'], description: 'Lorem Ipsum' });

      expect(console.log.mock.calls).toHaveLength(1);
      expect(console.log).toHaveBeenCalledWith('Lorem Ipsum: lorem ipsum \n');
    });
  });
});

describe('Function: fetchApi', () => {
  const word = 'Hello';
  const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  describe(`When input is '${word}'`, () => {
    fetch.mockClear();
    fetch.mockReturnValue(new Response(JSON.stringify({ mock: true })));
    fetchApi(word);

    it("fetch function from 'node-fetch' must be called once", () => {
      expect(fetch.mock.calls).toHaveLength(1);
    });

    it(`fetch function from 'node-fetch' must be called with '${apiUrl}${word}'`, () => {
      expect(fetch).toHaveBeenCalledWith(`${apiUrl}${word}`);
    });
  });
});
