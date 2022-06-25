import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fetch from 'node-fetch';

const argv = yargs(hideBin(process.argv)).argv;

const word = argv._[0];

const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
const data = await response.json();

const { meanings } = data[0];

console.log(`Word: ${data[0].word}`);

for (const meaning of meanings) {
    console.log("------------------------");
    console.log(`part of speech: ${meaning.partOfSpeech}`);
    console.log('');

    const { definitions, synonyms, antonyms } = meaning;

    for (const definition of definitions) {
        console.log(`definition: ${definition.definition}`)
        console.log('');
    }

    for (const synonym of synonyms) {
        console.log(`synonym: ${synonym}`)
        console.log('');
    }

    for (const antonym of antonyms) {
        console.log(`antonym: ${antonym}`)
        console.log('');
    }
}