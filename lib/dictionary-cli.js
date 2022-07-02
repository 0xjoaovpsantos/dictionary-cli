'use strict';

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
  const data = await response.json();
  return data;
};

const formatArray = ({ array, description }) => {
  if (Array.isArray(array) && array.length > 0) {
    console.log(`${description}: ${array.join(' ')} \n`);
  }
};

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
  const { argv } = (0, _yargs.default)((0, _helpers.hideBin)(process.argv));
  const word = argv._[0];
  const data = await fetchApi(word);
  showFormattedResponse(data);
};

execute();
