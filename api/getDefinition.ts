export function getWordDefinition(word: string) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}