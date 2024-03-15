import "index.css"

import { useEffect, useState } from "react"

import { getWordDefinition } from "~api/getDefinition"
import { getWordPronunciation } from "~api/getPronunciation"
import { getWordContext } from "~api/getContext"


function IndexPopup() {
  const [value, setValue] = useState("")
  const [pronunciationUrl, setPronunciationUrl] = useState("")
  const [transcription, setTranscription] = useState("")
  const [definition, setDefinition] = useState("")
  const [context, setContext] = useState("")

  const handleGetInfo = async () => {

    let word = localStorage.getItem("word");
    if (value) {
      word = value;
    } else {
      word = word.trim().toLowerCase();
    }

    console.log(word);
    
    
    setPronunciationUrl("");
    setTranscription("");
    setContext("");
    setDefinition("");
    
    const url = await getWordPronunciation(word)
    setPronunciationUrl(url)

    const wordData = await getWordDefinition(word)
    setTranscription(wordData[0].phonetic)
    setDefinition(wordData[0].meanings[0].definitions[0].definition)

    const contextData = await getWordContext(word)
    setContext(contextData[0].source)
    
  }

  const onKeyDown = async (e) => {  
    if (e.key === 'Enter') {
      handleGetInfo()
    }
  }

  useEffect(()=>{
    const word = localStorage.getItem("word");
    if (word) {
      setValue(word.trim().toLowerCase());
      handleGetInfo();
    }

    
  }, [])

  const startAudio = () => {
    const audio = document.querySelector('.extension-audio-memorize') as HTMLAudioElement;
    audio.play()
  }

  return (
    <div className="visible block p-5 bg-white opacity-100" onKeyDown={onKeyDown}>
      <div className="flex gap-2 text-[20px] ">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.trim().toLowerCase())}
          className="w-64 px-2 text-white rounded-md bg-slate-700"
          placeholder="word"
        />
        <button onClick={handleGetInfo} className="text-black">Get</button>
      </div>

      <div className="mt-4">
        {pronunciationUrl && (
          <div className="block w-[24px] h-[24px]">
            {
              pronunciationUrl ? (
                <>
                  <audio className="absolute w-[104px] h-[24px] extension-audio-memorize" src={pronunciationUrl} />
                  <svg onClick={startAudio} className="absolute visible overflow-visible cursor-pointer" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15 23l-9.309-6h-5.691v-10h5.691l9.309-6v22zm-9-15.009v8.018l8 5.157v-18.332l-8 5.157zm14.228-4.219c2.327 1.989 3.772 4.942 3.772 8.229 0 3.288-1.445 6.241-3.77 8.229l-.708-.708c2.136-1.791 3.478-4.501 3.478-7.522s-1.342-5.731-3.478-7.522l.706-.706zm-2.929 2.929c1.521 1.257 2.476 3.167 2.476 5.299 0 2.132-.955 4.042-2.476 5.299l-.706-.706c1.331-1.063 2.182-2.729 2.182-4.591 0-1.863-.851-3.529-2.184-4.593l.708-.708zm-12.299 1.299h-4v8h4v-8z"/></svg>
                </>
               ) : ''
            }
            <p className="text-[18px] absolute left-[64px] w-56 text-black m-0">Phonetics: {transcription}</p>
          </div>

        )}
      </div>
      {definition ? (
        <div className="flex flex-col gap-2 mt-2 w-72">
          <p className="text-[18px] text-black m-0">Definition: {definition}</p>
          {context ? (  
            <p className="text-[18px] text-black m-0">Context: {context}</p>
          ): ''}
          <button className="p-2 w-72 text-black text-[18px] bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors m-0">Add to cards</button>
        </div>
      ) : (
        ""
      )}
      
    </div>
  )
}

export default IndexPopup
