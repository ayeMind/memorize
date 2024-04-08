import { getMyWords } from "~api/getMyWords"
import { CardPopup } from "~components/card-popup"
import { createRoot } from "react-dom/client"

console.log("Hello!")

document.addEventListener("click", (e) => {
  const target = e.target as Node
  const popupContainer = document.querySelector(
    ".memorize-card-popup"
  )

  console.log(popupContainer);

  if (target == popupContainer || popupContainer && popupContainer.contains(target)) {
    return
  } else if (popupContainer) {
    popupContainer.remove()
  }
})


function handleClick(e) {

  e.stopPropagation()
  const popups = document.querySelectorAll(".memorize-card-popup")
  popups.forEach((popup) => {
    popup.remove()
  })

  // depending on which is closer

  const word = e.target.textContent
  // card popup should be displayed near the word
  const left = (window.innerWidth - e.clientX < 400) ? window.innerWidth - 400 : e.clientX
  const top =  (window.innerHeight - e.clientY < 512) ? window.innerHeight - 512 : e.clientY
  console.log(left, top)

  const popup = document.createElement("div")
  popup.className = "fixed memorize-card-popup"
  popup.style.left = `${left}px`
  popup.style.top = `${top}px`
  document.body.appendChild(popup)
  createRoot(popup).render(<CardPopup word={word} />)
}

const highlightWord = (word: string) => {
  const page = document.querySelector("body")
  const text = page.innerHTML
  const regex = new RegExp(`\\b(${word})\\b`, 'g');
  if (regex.test(text)) {
    const newText = text.replace(
      regex,
      `<span class='extension-word-memorize'>$1</span>`
    )
    page.innerHTML = newText
  }
  const highlightedWords = document.querySelectorAll(".extension-word-memorize")
  highlightedWords.forEach((word) => {
    word.addEventListener("click", handleClick)
  })
}

interface Data {
  words: string[]
}

getMyWords().then(data => {
  console.log(data);
  (data as Data).words.forEach((word) => {
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

export {}