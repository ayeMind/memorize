import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { addHistory } from "~api/addHistory"
import { getSettings } from "~api/getSettings"
import { CardInfoBlock } from "~components/card-info-block"
import { NavigateIcons } from "~components/navigate-icons"
import { Tab } from "~components/tab"
import type { Card } from "~interfaces"

export const CardPopup = (props: Card) => {
  const [selectedTab, setSelectedTab] = useState("Definition")

  useEffect(() => {
    getSettings().then((data) => {
      setSelectedTab(data["card-prefer"])
    })
  }, [])

  const [showAnswer, setShowAnswer] = useState(false)

  const getText = () => {
    if (selectedTab === "Definition") {
      return props.definition ? props.definition : "Not found"
    } else if (selectedTab === "Examples") {
      // random example
      const randomIndex =
        props.context.length > 0
          ? Math.floor(Math.random() * props.context.length)
          : -1
      return randomIndex !== -1 && props.context[randomIndex]
        ? props.context[randomIndex].source
        : "Not found"
    } else {
      return props.synonyms ? props.synonyms.map(data => data.synonym).join(", ") : "Not found"
    }
  }

  const handleClose = (difficult: string) => {
    addHistory({
      word: props.word,
      difficult: difficult,
      time: new Date().toISOString()
    }).then(() => {
      const popupContainer = document.querySelector(".card-popup")
      popupContainer.remove()
      if (Array.isArray(props.nextWords)) {
        if (props.nextWords.length > 0) {
          const popupContainer = document.querySelector(".play-page")
          const popup = document.createElement("div")
          popupContainer.appendChild(popup)

          const next = props.nextWords.slice(1)

          createRoot(popup).render(
            <CardPopup {...props.nextWords[0]} nextWords={next} />
          )
        } else if (chrome.runtime) {
          chrome.runtime.sendMessage("showCards")
        }
      }
    })
  }

  return (
    <div className="memorize relative card-popup flex flex-col items-center w-auto visible px-8 py-5 bg-[#232323] opacity-100 font-[Quicksand]">
      <p className="memorize text-[#fff] text-[32px] m-0 font-[Quicksand]">
        {props.word[0].toUpperCase() + props.word.slice(1)}
      </p>
      <div className="flex gap-[24px] justify-center w-full px-5 mt-5 mb-0 memorize">
        <Tab
          title="Definition"
          active={selectedTab}
          onClick={() => setSelectedTab("Definition")}
        />
        <Tab
          title="Examples"
          active={selectedTab}
          onClick={() => setSelectedTab("Examples")}
        />
        <Tab
          title="Synonyms"
          active={selectedTab}
          onClick={() => setSelectedTab("Synonyms")}
        />
      </div>
      <CardInfoBlock
        text={getText()}
        pronunciationUrl={props.pronunciationUrl}
        transcription={props.transcription}
      />
      {!showAnswer ? (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowAnswer(true)
          }}
          className="text-[#fff] mt-5 mb-0 underline font-[Quicksand] text-[20px] bg-transparent border-0">
          show answer
        </button>
      ) : (
        <p className="text-[#fff] mt-5 mb-0 font-[Quicksand] text-[20px]">
          {props.translation}
        </p>
      )}
      <div className="flex justify-center w-full gap-4 mt-5 mb-0 memorize">
        <button
          className="memorize btn-reset text-[20px] font-[Quicksand] text-[#FBF8FF] m-0 bg-[#C8ABF8] w-[106px] h-[36px] rounded-md"
          onClick={() => handleClose("easy")}>
          easy
        </button>
        <button
          className="memorize btn-reset text-[20px] font-[Quicksand] text-[#FBF8FF] m-0 bg-[#9E66F9] w-[106px] h-[36px] rounded-md"
          onClick={() => handleClose("medium")}>
          medium
        </button>
        <button
          className="memorize btn-reset text-[20px] font-[Quicksand] text-[#F8F3FF] m-0 bg-[#4521D6] w-[106px] h-[36px] rounded-md"
          onClick={() => handleClose("hard")}>
          hard
        </button>
      </div>

      {chrome.runtime ? <NavigateIcons /> : ""}
    </div>
  )
}
