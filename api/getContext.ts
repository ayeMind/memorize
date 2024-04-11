export async function getWordContext(word: string) {
    return fetch(`http://localhost:3000/context/${word}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}