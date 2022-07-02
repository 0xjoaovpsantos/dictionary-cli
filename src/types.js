// @flow

type definition = {
  definition: string,
};

type meaning = {
  partOfSpeech: string,
  definitions: definition[],
  synonyms: string[],
  antonyms: string[],
};

export type typeApiResponse = {
  word: string,
  meanings: meaning[],
  title?: string,
};

export type typeFormatArray = {
  array: Array<string>,
  description: string,
};
