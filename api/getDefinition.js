export function getWordDefinition(word) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
    .then(response => response.json())
    .then(data => data[0].phonetics[0].text)
    .catch(error => console.error(error))
}