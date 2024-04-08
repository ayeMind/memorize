import { getMyWords } from "~api/getMyWords"

export {}

console.log("Hello!")

const highlightWord = (word: string) => {
  const page = document.querySelector("body")
  const text = page.innerHTML
  const regex = new RegExp(`\\b(${word})\\b`, 'g');
  if (regex.test(text)) {
    const newText = text.replace(
      regex,
      "<span class='extension-word-memorize'>$1</span>"
    )
    page.innerHTML = newText
  }
}

getMyWords().then(data => {
  console.log(data);
  data.words.forEach((word) => {
    console.log('highlight', word);
    highlightWord(word)
})
})


const style = `
    .extension-word-memorize {
        text-shadow: 0px 0px #e2e;
        cursor: pointer;
        font-weight: 400;
        font-style: italic;
    }
`

const styleElement = document.createElement("style")
styleElement.innerHTML = style
document.head.appendChild(styleElement)
