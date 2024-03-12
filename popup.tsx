import "index.css"

import { useState } from "react"

import { getWordDefinition } from "~api/getDefinition"
import { getWordPronunciation } from "~api/getPronunciation"
import { getWordContext } from "~api/getContext"


function IndexPopup() {
  const [value, setValue] = useState("")
  const [pronunciationUrl, setPronunciationUrl] = useState("")
  const [transcription, setTranscription] = useState("")
  const [definition, setDefinition] = useState("")
  const [context, setContext] = useState("")

  const handleGetInfo = async (e) => {
    setPronunciationUrl("");
    setTranscription("");
    setContext("");
    setDefinition("");
    
    const url = await getWordPronunciation(value)
    setPronunciationUrl(url)

    const wordData = await getWordDefinition(value)
    setTranscription(wordData[0].phonetic)
    setDefinition(wordData[0].meanings[0].definitions[0].definition)

    const contextData = await getWordContext(value)
    setContext(contextData[0].source)
  
  }

  const onKeyDown = async (e) => {  
    if (e.key === 'Enter') {
      handleGetInfo(value)
    }
  }

  return (
    <div className="p-5" onKeyDown={onKeyDown}>
      <div className="flex gap-2 text-[20px] ">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-2 text-white bg-slate-700"
          placeholder="word"
        />
        <button onClick={handleGetInfo}>Get</button>
      </div>

      <div className="mt-4">
        {pronunciationUrl && (
          <audio className="mt-2" controls src={pronunciationUrl} />
        )}
      </div>
      {definition ? (
        <div className="flex flex-col gap-2 mt-2">
          <p className="text-[18px]">Phonetics: {transcription}</p>
          <p className="text-[18px]">Definition: {definition}</p>
          {context ? (
            <p className="text-[18px]">Context: {context}</p>
          ): ''}
          <button className="p-2 text-[18px] bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors">Add to cards</button>
        </div>
      ) : (
        ""
      )}
      
    </div>
  )
}

export default IndexPopup
