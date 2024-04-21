import "index.css"
// @ts-ignore
import classes from "popup.module.css"
import { useEffect, useState } from "react"
import { getWordContext } from "~api/getContext"
import { getWordDefinition } from "~api/getDefinition"
import { getWordPronunciation } from "~api/getPronunciation"
import { AudioBlock } from "~components/audio-block"
import { InfoBlock } from "~components/info-block"
import { addCard } from "~api/addCard"
import { getWordTranslation } from "~api/getTranslation"
import { getWordSynonyms } from "~api/getSynonyms"
import { NavigateIcons } from "~components/navigate-icons"


function IndexPopup() {
  const [value, setValue] = useState("")
  const [pronunciationUrl, setPronunciationUrl] = useState("")
  const [transcription, setTranscription] = useState("")
  const [definition, setDefinition] = useState("")
  const [translation, setTranslation] = useState("")
  const [context, setContext] = useState("")
  const [contextList, setContextList] = useState([])
  const [synonyms, setSynonums] = useState([])

  const [showTranslation, setShowTranslation] = useState(false)


  const handleGetInfo = async () => {
    let word = localStorage.getItem("word")
    if (value) {
      word = value
    } else {
      word = word.trim().toLowerCase()
    }

    console.log(word)

    setPronunciationUrl("")
    setTranscription("")
    setContext("")
    setDefinition("")
    setTranslation("")
    setSynonums([])

    const translateData = await getWordTranslation(word)
    setTranslation(translateData)    
    
    const url = await getWordPronunciation(word)
    setPronunciationUrl(url)

    const wordData = await getWordDefinition(word)
    setTranscription(wordData[0].phonetic)
    setDefinition(wordData[0].meanings[0].definitions[0].definition)

    const contextData = await getWordContext(word)
    setContext(contextData[0].source)
    setContextList(contextData)
    
    const synonymsData = await getWordSynonyms(word)
    setSynonums(synonymsData.map(data => data.synonym))    
  }

  const handleAddToCards = async () => {
    const data = {
      word: value,
      definition: definition,
      transcription: transcription,
      translation: translation,
      pronunciationUrl: pronunciationUrl,
      context: contextList,
      synonyms: synonyms
    }
    console.log("DATA!", data);
    
    addCard(data).then(data => console.log(data));
    document.querySelector(".popup-extension").remove();
  }

  const onKeyDown = async (e) => {
    if (e.key === "Enter") {
      handleGetInfo()
    }
  }

  useEffect(() => {
    const word = localStorage.getItem("word")
    if (word) {
      setValue(word.trim().toLowerCase())
      handleGetInfo()
    }
  }, [])

  const toggleShow = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowTranslation(prev => !prev)
  }

  const scrollbarStyles = classes["memorize"]

  return (
    <div
      className={`memorize border-0 m-0 z-[1000] popup-extension visible block p-5 w-[340px] bg-[#232323] opacity-100 ${scrollbarStyles}`}
      onKeyDown={onKeyDown}>
      <div className="memorize flex gap-2 text-[20px] mb-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.trim().toLowerCase())}
          className="memorize input-reset w-52 h-auto px-2 py-1 text-[16px] font-[100] text-[#f5f5f5] rounded-md bg-[#414141]"
          placeholder="word"
        />
        <button onClick={handleGetInfo} className="memorize btn-reset text-[#ffffff] font-[100] bg-[#7e7e7e] h-auto rounded-md px-2 py-1 text-[16px] hover:opacity-80">
          Get
        </button>
        
      </div>

      <div className="my-4">
        {pronunciationUrl && (
          <div className="block">
            {pronunciationUrl ? (
              <AudioBlock audioLink={pronunciationUrl} transcription={transcription} />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      {definition ? (
        <div className="memorize flex flex-col gap-[12px] relative w-full items-center">
          <InfoBlock title="Definition" text={definition} />
          {context ? (
          <InfoBlock title="Example" text={context} />
          ) : (
            ""
          )}
         
        </div>
      ) : (
        ""
      )}
        <div className="flex flex-col items-center w-full memorize">
          {!showTranslation && translation && (
            <button type="button" onClick={toggleShow} className="memorize btn-reset mt-4 text-[#A99BFF]">Show translation</button>
          )}
          {showTranslation && translation && (
            <p className="mt-4 text-[#f5f5f5] font-[Quicksand] text-[18px]">{translation}</p>
          )}
          {translation && (
            <button className="memorize btn-reset py-2 px-4 text-[#f5f5f5] text-[18px] bg-[#6013DD] rounded-lg hover:opacity-80 transition-colors mt-4 mx-0"
                    onClick={handleAddToCards}>
              Add to cards
            </button>
          )}
        </div>
  

      {chrome.runtime ? (
        <NavigateIcons />
      ) : (
        ""
      )}

    </div>
  )
}

export default IndexPopup
