export async function getWordSynonyms(word: string) {
    return fetch(`http://localhost:3000/synonyms/${word}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}