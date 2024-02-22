import "index.css"
import { useState } from "react"
import { getWordPronunciation } from "~api/getPronunciation";

function IndexPopup() {

  const [value, setValue] = useState("");
  const [pronunciationUrl, setPronunciationUrl] = useState("");


  return (
    <div className="">
      <input value={value} onChange={(e) => setValue(e.target.value)}
      className='px-2 bg-slate-700'
      placeholder="word" />
      <button onClick={async () => {
        const url = await getWordPronunciation(value);
        setPronunciationUrl(url);
      }}>Get Pronunciation</button>

      {pronunciationUrl && <audio controls src={pronunciationUrl} />}
    </div>
  ) 
}

export default IndexPopup