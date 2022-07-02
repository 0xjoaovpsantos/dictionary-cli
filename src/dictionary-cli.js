// // @flow

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fetch from 'node-fetch';
import type { typeApiResponse, typeFormatArray } from './types';

const fetchApi = async (word: string): Promise<typeApiResponse[]> => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const data = await response.json();

  return data;
};

const formatArray = ({ array, description }: typeFormatArray) => {
  if (Array.isArray(array) && array.length > 0) {
    console.log(`${description}: ${array.join(' ')} \n`);
  }
};

const showFormattedResponse = (data: typeApiResponse[]) => {
  const { meanings } = data[0];

  console.log(`Word: ${data[0].word} \n`);

  meanings.forEach((meaning) => {
    console.log(`Part of speech: ${meaning.partOfSpeech} \n`);

    const { definitions, synonyms, antonyms } = meaning;

    const definitionsArray: Array<string> = [];

    definitions.forEach((definition) => {
      definitionsArray.push(definition.definition);
    });

    formatArray({ array: definitionsArray, description: 'Definitions' });
    formatArray({ array: synonyms, description: 'Synonyms' });
    formatArray({ array: antonyms, description: 'Antonyms' });
  });
};

const execute = async () => {
  try {
    const { argv } = yargs(hideBin(process.argv));

    const word: string = argv._[0];

    const data: typeApiResponse[] = await fetchApi(word);

    showFormattedResponse(data);
  } catch (error) {
    console.log(
      'Oops, something went wrong, check your internet connection and try again in a few minutes.'
    );
  }
};

execute();
