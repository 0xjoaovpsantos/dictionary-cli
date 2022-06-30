import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fetch from 'node-fetch';

const fetchApi = async (word) => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const data = await response.json();

  return data;
};

const formatArrayResponse = (array, description) => {
  if (Array.isArray(array) && array.length > 0) {
    console.log(`${description}: ${array.join(' ')} \n`);
  }
};

const formatResponse = (data) => {
  const { meanings } = data[0];

  console.log(`Word: ${data[0].word} \n`);

  for (const meaning of meanings) {
    console.log(`Part of speech: ${meaning.partOfSpeech} \n`);

    const { definitions, synonyms, antonyms } = meaning;

    const definitionsArray = [];

    for (const definition of definitions) {
      definitionsArray.push(definition.definition);
    }

    formatArrayResponse(definitionsArray, 'Definitions');
    formatArrayResponse(synonyms, 'Synonyms');
    formatArrayResponse(antonyms, 'Antonyms');
  }
};

const verifyIfInputIsValid = (argv) => {

}

export const execute = async () => {
  const { argv } = yargs(hideBin(process.argv));

  const word = argv._[0];

  const data = await fetchApi(word);

  formatResponse(data);
};

execute();