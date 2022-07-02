// @flow

type meaning = {
  partOfSpeech: string,
};

type definition = {
  definition: string,
};

export type typeApiResponse = {
  word: string,
  meanings: meaning[],
  definitions: definition[],
  synonyms: string[],
  antonyms: string[],
};

export type typeFormatArray = {
  array: Array<string>,
  description: string,
};
