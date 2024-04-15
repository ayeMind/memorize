import { useEffect, useState } from "react";
import { getSettings } from "~api/getSettings";
import { CardInfoBlock } from "~components/card-info-block";
import { Tab } from "~components/tab";
import type { Card } from "~interfaces";

export const CardPopup = (props: Card) => {

  const [selectedTab, setSelectedTab] = useState("Definition")

  useEffect(() => {
    getSettings().then(data => {
      setSelectedTab(data["card-prefer"])
    })
  }, [])

  const [showAnswer, setShowAnswer] = useState(false)

  const getText = () => {
    if (selectedTab === "Definition") {
      return props.definition
    } else if (selectedTab === "Examples") {
      return props.context[0].source
    } else {
      return props.synonyms.join(", ")
    }
  }
  
  return (
    <div className="memorize card-popup flex flex-col items-center visible px-8 py-5 w-[420px] bg-[#232323] opacity-100">
       <p className="memorize text-[#fff] text-[32px] font-[Quicksand]">{props.word[0].toUpperCase() + props.word.slice(1)}</p>
       <div className="memorize flex justify-between w-full px-5 mt-5 mb-0">
          <Tab title="Definition" active={selectedTab} onClick={() => setSelectedTab("Definition")} />
          <Tab title="Examples" active={selectedTab} onClick={() => setSelectedTab("Examples")} />
          <Tab title="Synonyms" active={selectedTab} onClick={() => setSelectedTab("Synonyms")} />
       </div>
       <CardInfoBlock text={getText()} pronunciationUrl={props.pronunciationUrl} transcription={props.transcription} />
       {
        !showAnswer ? (
          <button onClick={(e) => {
            e.stopPropagation()
            setShowAnswer(true)
          }} className="text-[#fff] mt-5 underline font-[Quicksand] text-[20px]">show answer</button>
        ) : (
          <p className="text-[#fff] mt-5 font-[Quicksand] text-[20px]">{props.translation}</p>
        )
       }
       <div className="memorize flex justify-between w-full mt-5">
        <button className="memorize btn-reset font-[Quicksand] text-[#FBF8FF] bg-[#C8ABF8] w-[106px] h-[36px] rounded-md">easy</button>
        <button className="memorize btn-reset font-[Quicksand] text-[#FBF8FF] bg-[#9E66F9] w-[106px] h-[36px] rounded-md">medium</button>
        <button className="memorize btn-reset font-[Quicksand] text-[#F8F3FF] bg-[#4521D6] w-[106px] h-[36px] rounded-md">hard</button>
       </div>
    </div>
  );
};
