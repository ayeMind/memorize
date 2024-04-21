import { IconCircleX } from "@tabler/icons-react";
import { removeCard } from "~api/removeCard";
import type { Card } from "~interfaces";

interface Props {
    card: Card;
    words: Card[];
    setWords: (words: Card[]) => void;
}

export const CardItem = (props: Props) => {

    const handleRemove = () => {
        removeCard(props.card).then((data) => {
            console.log(data);
        });
        props.setWords(props.words.filter(word => word.word !== props.card.word));
    }

  return (
       <details className="w-[500px] bg-[#232323] memorize shadow mt-[26px] rounded cursor-pointer text-[16px]">
        <summary className="font-[Quicksand] text-[18px] text-[#E8E4FF] p-2 m-0 flex justify-between">
            <p className="m-0">{props.card.word}</p>
            <button className="bg-transparent border-0 btn-reset hover:opacity-80" onClick={handleRemove}>
                <IconCircleX color="#fff" />
            </button>
        </summary>
        
        <div className="memorize bg-[#EFE5FF] px-2 pt-4 pb-2">

            <div className="text-center memorize">
                <h2 className="mx-0 mb-0 mt-1 font-[Quicksand] text-[#400092] text-[16px]">Transcription</h2>
                <p className="mx-0 mt-1 mb-0">{props.card.transcription ? props.card.transcription : "Not found"}</p>
            </div>

            <div className="mt-2 text-center memorize">
                <h2 className="mx-0 mb-0 mt-1 font-[Quicksand] text-[#400092] text-[16px]">Definition</h2>
                <p className="mx-0 mt-1 mb-0">{props.card.definition ? props.card.definition : "Not found"}</p>
            </div>

            <div className="mt-2 text-center memorize">
                <h2 className="mx-0 mb-0 mt-1 font-[Quicksand] text-[#400092] text-[16px]">Translation</h2>
                <p className="mx-0 mt-1 mb-0">{props.card.translation ? props.card.translation : "Not found"}</p>
            </div>

            <div className="mt-2 text-center memorize">
                <h2 className="mx-0 mb-0 mt-1 font-[Quicksand] text-[#400092] text-[16px]">Synonyms</h2>
                {props.card.synonyms.map((synonym, index) => (
                    <p key={index} className="mx-0 mt-1 mb-0">{synonym}</p>
                ))}
            </div>
        </div>
        
      </details>
  );
};

