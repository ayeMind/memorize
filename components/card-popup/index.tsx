import { useState } from "react";
import { CardInfoBlock } from "~components/card-info-block";
import { Tab } from "~components/tab";
import type { Card } from "~interfaces";

export const CardPopup = (props: Card) => {

  const [selectedTab, setSelectedTab] = useState("Definition")

  const getText = () => {
    if (selectedTab === "Definition") {
      return props.definition
    } else if (selectedTab === "Examples") {
      return props.context[0].source
    } else {
      return props.synonyms // Изменить потом!
    }
  }
  
  return (
    <div className="card-popup flex flex-col items-center visible p-5 w-[420px] bg-[#232323] opacity-100">
       <p className="text-[#FFFFFF] text-[32px]">{props.word[0].toUpperCase() + props.word.slice(1)}</p>
       <div className="flex justify-between w-full px-5 mt-5 mb-0">
          <Tab title="Definition" active={selectedTab} onClick={() => setSelectedTab("Definition")} />
          <Tab title="Examples" active={selectedTab} onClick={() => setSelectedTab("Examples")} />
          <Tab title="Synonyms" active={selectedTab} onClick={() => setSelectedTab("Synonyms")} />
       </div>
       <CardInfoBlock text={getText()} pronunciationUrl={props.pronunciationUrl} transcription={props.transcription} />
    </div>
  );
};
