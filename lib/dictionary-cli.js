'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.formatArray = exports.fetchApi = void 0;

var _yargs = _interopRequireDefault(require('yargs'));

var _helpers = require('yargs/helpers');

var _nodeFetch = _interopRequireDefault(require('node-fetch'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// //
const fetchApi = async (word) => {
  const response = await (0, _nodeFetch.default)(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  console.log(response);
  const data = await response.json();
  return data;
};

exports.fetchApi = fetchApi;

const formatArray = ({ array, description }) => {
  if (Array.isArray(array) && array.length > 0) {
    console.log(`${description}: ${array.join(' ')} \n`);
  }
};

exports.formatArray = formatArray;

const showFormattedResponse = (data) => {
  const { meanings } = data[0];
  console.log(`Word: ${data[0].word} \n`);
  meanings.forEach((meaning) => {
    console.log(`Part of speech: ${meaning.partOfSpeech} \n`);
    const { definitions, synonyms, antonyms } = meaning;
    const definitionsArray = [];
    definitions.forEach((definition) => {
      definitionsArray.push(definition.definition);
    });
    formatArray({
      array: definitionsArray,
      description: 'Definitions',
    });
    formatArray({
      array: synonyms,
      description: 'Synonyms',
    });
    formatArray({
      array: antonyms,
      description: 'Antonyms',
    });
  });
};

const execute = async () => {
  try {
    const { argv } = (0, _yargs.default)((0, _helpers.hideBin)(process.argv));
    const word = argv._[0];
    const data = await fetchApi(word);
    showFormattedResponse(data);
  } catch (error) {
    console.log(
      'Oops, something went wrong, check your internet connection and try again in a few minutes.'
    );
  }
};

execute();
