import "index.css"

import { useEffect, useState } from "react"

import { getWordContext } from "~api/getContext"
import { getWordDefinition } from "~api/getDefinition"
import { getWordPronunciation } from "~api/getPronunciation"
import { supabase } from "~core/supabase"


function IndexPopup() {
  const [value, setValue] = useState("")
  const [pronunciationUrl, setPronunciationUrl] = useState("")
  const [transcription, setTranscription] = useState("")
  const [definition, setDefinition] = useState("")
  const [context, setContext] = useState("")


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
  }


  const handleAddToCards = async () => {
    if (!value) {
      return
    }
    
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

  const startAudio = () => {
    const audio = document.querySelector(
      ".extension-audio-memorize"
    ) as HTMLAudioElement
    audio.play()
  }

  return (
    <div
      className="visible block p-5 bg-white opacity-100"
      onKeyDown={onKeyDown}>
      <div className="flex gap-2 text-[20px] ">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.trim().toLowerCase())}
          className="w-64 px-2 text-white rounded-md bg-slate-700"
          placeholder="word"
        />
        <button onClick={handleGetInfo} className="text-black">
          Get
        </button>
      </div>

      <div className="mt-4">
        {pronunciationUrl && (
          <div className="block w-[24px] h-[24px]">
            {pronunciationUrl ? (
              <>
                <audio
                  className="absolute w-[104px] h-[24px] extension-audio-memorize"
                  src={pronunciationUrl}
                />
                <svg
                  onClick={startAudio}
                  className="absolute visible overflow-visible cursor-pointer"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd">
                  <path d="M15 23l-9.309-6h-5.691v-10h5.691l9.309-6v22zm-9-15.009v8.018l8 5.157v-18.332l-8 5.157zm14.228-4.219c2.327 1.989 3.772 4.942 3.772 8.229 0 3.288-1.445 6.241-3.77 8.229l-.708-.708c2.136-1.791 3.478-4.501 3.478-7.522s-1.342-5.731-3.478-7.522l.706-.706zm-2.929 2.929c1.521 1.257 2.476 3.167 2.476 5.299 0 2.132-.955 4.042-2.476 5.299l-.706-.706c1.331-1.063 2.182-2.729 2.182-4.591 0-1.863-.851-3.529-2.184-4.593l.708-.708zm-12.299 1.299h-4v8h4v-8z" />
                </svg>
              </>
            ) : (
              ""
            )}
            <p className="text-[18px] absolute left-[64px] w-56 text-black m-0">
              Phonetics: {transcription}
            </p>
          </div>
        )}
      </div>
      {definition ? (
        <div className="flex flex-col gap-2 mt-2 w-72">
          <p className="text-[18px] text-black m-0">Definition: {definition}</p>
          {context ? (
            <p className="text-[18px] text-black m-0">Context: {context}</p>
          ) : (
            ""
          )}
          <button className="p-2 w-72 text-black text-[18px] bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors m-0"
                  onClick={handleAddToCards}>
            Add to cards
          </button>
        </div>
      ) : (
        ""
      )}

      {chrome.runtime.openOptionsPage ? (
        <button
          className="absolute cursor-pointer right-2 bottom-2"
          onClick={() => chrome.runtime.openOptionsPage()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="15px"
            height="15px">
            {" "}
            <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z" />
          </svg>
        </button>
      ) : (
        ""
      )}
    </div>
  )
}

export default IndexPopup
