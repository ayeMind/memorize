async function textToSpeech(word: string) {
    const url = `http://api.voicerss.org/?key=9f4b13d24ecd4ebf9be43cd3a1a16b8e&hl=en-us&c=MP3&v=Clara&src=${word}`;
    const options = {
	    method: 'GET',
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result, "aboba");
        return await response.json()
    } catch (error) {
        console.error(error);
    }
}

export function getWordPronunciation(word: string) {
    return fetch(`http://localhost:3000/pronunciation/${word}`)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return textToSpeech(word)
        }
    })
    .then(data => data)
    
    .catch((error) => {
            console.error(error)
    })
}