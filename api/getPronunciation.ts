export function getWordPronunciation(word: string) {
    return fetch(`http://localhost:3000/pronunciation/${word}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error))
}