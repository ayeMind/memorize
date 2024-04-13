import { getMyWords } from "~api/getMyWords"
import { CardPopup } from "~components/card-popup"
import { createRoot } from "react-dom/client"
import { getWord } from "~api/getWord"
import type { Card } from "~interfaces"
import { getSettings } from "../api/getSettings"

document.addEventListener("click", (e) => {
  const target = e.target as Node
  const popupContainer = document.querySelector(
    ".memorize-card-popup"
  )

  if (target == popupContainer || popupContainer && popupContainer.contains(target)) {
    return
  } else if (popupContainer) {
    popupContainer.remove()
  }
})


async function handleClick(e) {

  e.stopPropagation()
  const popups = document.querySelectorAll(".memorize-card-popup")
  popups.forEach((popup) => {
    popup.remove()
  })

  const word = e.target.textContent

  const left = (window.innerWidth - e.clientX < 400) ? window.innerWidth - 400 : e.clientX
  const top =  (window.innerHeight - e.clientY < 512) ? window.innerHeight - 512 : e.clientY

  const popup = document.createElement("div")
  popup.className = "fixed memorize-card-popup"
  popup.style.left = `${left}px`
  popup.style.top = `${top}px`
  document.body.appendChild(popup)
  const wordInfo = await getWord(word) as Card
  console.log("wordinfo", wordInfo);
  
  createRoot(popup).render(<CardPopup {...wordInfo} />)
}

const highlightWord = (word: string) => {
  const page = document.querySelector("body")
  const text = page.innerHTML
  const regex = new RegExp(`\\b(${word})\\b`, 'gi');
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

getSettings().then(data => {
  const bold = data.bold
  const cursive = data.cursive 
  const color = data.color 

  const style = `
    .extension-word-memorize {
        text-shadow: 0px 0px 5px ${color};
        cursor: pointer;
        ${cursive && "font-style: italic;"}
        ${bold && "font-weight: 700;"}
    }
`
  const styleElement = document.createElement("style")
  styleElement.innerHTML = style
  document.head.appendChild(styleElement)
})



getMyWords().then(data => {
  (data as string[]).forEach((word) => {
    highlightWord(word)
})
})

export {}