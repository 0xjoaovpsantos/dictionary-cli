import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fetch from 'node-fetch';

const argv = yargs(hideBin(process.argv)).argv;

const word = argv._[0];

const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
const data = await response.json();

const { meanings } = data[0];

console.log(``)
console.log(`Word: ${data[0].word}`);
console.log(``)

for (const meaning of meanings) {
    console.log(`Part of speech: ${meaning.partOfSpeech}`);
    console.log('');

    const { definitions, synonyms, antonyms } = meaning;

    let definitionsArray = [];

    for (const definition of definitions) {
        definitionsArray.push(definition.definition);
    }

    if (definitions) {
        console.log(`Definitions: ${definitionsArray.join(" ")}`)
        console.log(``) 
    }

    if (synonyms.length > 0) {
        console.log(`Synonyms: ${synonyms.join(", ")}`)
        console.log(``)
    }

    if (antonyms.length > 0) {
        console.log(`Antonyms: ${antonyms.join(", ")}`)
        console.log(``)
    }
}