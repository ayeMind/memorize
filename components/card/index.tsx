import { IconCircleX } from "@tabler/icons-react";
import type { Card } from "~interfaces";

interface Props {
    card: Card;
}

export const CardItem = (props: Props) => {
  return (
       <details className="w-[500px] bg-[#232323] memorize shadow mt-[26px] rounded cursor-pointer text-[16px]">
        <summary className="font-[Quicksand] text-[18px] text-[#E8E4FF] p-2 m-0 flex justify-between">
            <p className="m-0">{props.card.word}</p>
            <button className="bg-transparent border-0 btn-reset">
                <IconCircleX color="#fff" />
            </button>
        </summary>
        
        <div className="memorize bg-[#EFE5FF] mt-4 p-2">
            <div className="text-center memorize">
                <h2 className="mx-0 mb-0 mt-1 font-[Quicksand] text-[#400092] text-[16px]">Definition</h2>
                <p className="mx-0 mt-1 mb-0">{props.card.definition ? props.card.definition : "Not found"}</p>
            </div>

            <div className="mt-2 text-center memorize">
                <h2 className="mx-0 mb-0 mt-1 font-[Quicksand] text-[#400092] text-[16px]">Translation</h2>
                <p className="mx-0 mt-1 mb-0">{props.card.translation ? props.card.translation : "Not found"}</p>
            </div>
        </div>
        
      </details>
  );
};

