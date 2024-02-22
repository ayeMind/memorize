import "index.css"
import { useState } from "react"
import { getWordPronunciation } from "~api/getPronunciation";

function IndexPopup() {

  const [value, setValue] = useState("");
  const [pronunciationUrl, setPronunciationUrl] = useState("");


  return (
    <div className="p-5">
      <div className="flex gap-2 text-[20px] ">
        <input value={value} onChange={(e) => setValue(e.target.value)}
        className='px-2 text-white bg-slate-700'
        placeholder="word" />
        <button onClick={async () => {
          const url = await getWordPronunciation(value);
          setPronunciationUrl(url);
        }}>Get</button>

      </div>

      {pronunciationUrl && <audio className="mt-2" controls src={pronunciationUrl} />}

    </div>
  ) 
}

export default IndexPopup