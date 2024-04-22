import "../index.css"
import { IconPlayerPlay, IconSettings } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { getCards } from "~api/getCards"
import { CardItem } from "~components/card"

// @ts-ignore
import image from "../assets/background.png"

const Cards = () => {

  const [words, setWords] = useState([]);

  useEffect(() => {
    getCards().then(data => {
      console.log(data);
      setWords(data)
    })
  }, [])
  
  return (
    <div
      className="flex flex-col items-center w-screen min-h-screen bg-fixed bg-no-repeat bg-cover memorize"
      style={{ backgroundImage: `url(${image}` }}>
      <div className="memorize bg-[#232323] rounded-b h-[50px] px-6 py-3 flex justify-center items-center">
        <div className="flex gap-3 memorize">
          <button className="bg-[#5000D2] rounded btn-reset p-2 border-0 flex gap-2 hover:opacity-80">
            <p className="m-0 text-[18px] text-[#EFE5FF]">Play cards</p>
            <IconPlayerPlay color="white" />
          </button>
          <button
            className="cursor-pointer memorize btn-reset"
            onClick={() => chrome.runtime.sendMessage("showOptions")}>
            <IconSettings
              size={32}
              color="#F5EFFF"
              className="border-0 svg-reset fill-none hover:opacity-80"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {words.map((word, index) => (
          <CardItem words={words} setWords={setWords} key={index} card={word} />
        ))}
      </div>
      {/* <div className="memorize w-[500px] bg-[#EFE5FF]">
        
      </div> */}
    </div>
  )
}

export default Cards
