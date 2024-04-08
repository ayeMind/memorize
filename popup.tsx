import "index.css"
import { useEffect, useState } from "react"
import { IconSettings } from "@tabler/icons-react"
import { getWordContext } from "~api/getContext"
import { getWordDefinition } from "~api/getDefinition"
import { getWordPronunciation } from "~api/getPronunciation"
import { AudioBlock } from "~components/audio-block"
import { InfoBlock } from "~components/info-block"
import { addCard } from "~api/addCard"


function IndexPopup() {
  const [value, setValue] = useState("")
  const [pronunciationUrl, setPronunciationUrl] = useState("")
  const [transcription, setTranscription] = useState("")
  const [definition, setDefinition] = useState("")
  const [context, setContext] = useState("")
  const [contextList, setContextList] = useState([])


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

    const url = await getWordPronunciation(word)
    setPronunciationUrl(url)

    const wordData = await getWordDefinition(word)
    setTranscription(wordData[0].phonetic)
    setDefinition(wordData[0].meanings[0].definitions[0].definition)

    const contextData = await getWordContext(word)
    setContext(contextData[0].source)
    setContextList(contextData)
  }


  const handleAddToCards = async () => {
    console.log("add card ", value);
    
    addCard(value).then(data => console.log(data));
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

  return (
    <div
      className="visible block p-5 w-[340px] bg-[#232323] opacity-100"
      onKeyDown={onKeyDown}>
      <div className="flex gap-2 text-[20px] mb-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.trim().toLowerCase())}
          className="w-64 px-2 text-[#f5f5f5] rounded-md bg-[#414141]"
          placeholder="word"
        />
        <button onClick={handleGetInfo} className="text-[#ffffff] bg-[#7e7e7e] rounded-md px-2 py-1 text-[16px] hover:opacity-80">
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
        <div className="flex flex-col gap-[12px] relative w-full items-center">
          <InfoBlock title="Definition" text={definition} />
          {context ? (
          <InfoBlock title="Example" text={context} />
          ) : (
            ""
          )}
          <button className="py-2 px-4 text-[#f5f5f5] text-[18px] bg-[#6013DD] rounded-lg hover:opacity-80 transition-colors mt-4 mx-0"
                  onClick={handleAddToCards}>
            Add to cards
          </button>
        </div>
      ) : (
        ""
      )}

  

      {chrome.runtime.openOptionsPage ? (
        <button
          className="absolute cursor-pointer right-5 bottom-2"
          onClick={() => chrome.runtime.openOptionsPage()}>
            <IconSettings color="white" />
        </button>
      ) : (
        ""
      )}
    </div>
  )
}

export default IndexPopup
