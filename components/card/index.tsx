import { IconCircleX, IconSquareRoundedPlus } from "@tabler/icons-react";
import { useState } from "react";
import { removeCard } from "~api/removeCard";
import { editCard } from "~api/editCard";
import { CardItemBlock } from "~components/card-item-block";
import type { Card } from "~interfaces";
import { SynonymItem } from "~components/synonym-item";

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

    const [card, setCard] = useState<Card>(props.card)

    const handleChange = (value: string, type: "transcription" | "definition" | "translation") => {
        setCard({
            ...card,
            [type]: value
        })
    }

    const handleRemoveSynonym = (synonym: string) => {
        setDisplayedSynonyms({
            ...displayedSynonyms,
            synonyms: displayedSynonyms.synonyms.filter(syn => syn.synonym !== synonym)
        })
        setCard({
            ...card,
            synonyms: card.synonyms.filter(syn => syn.synonym !== synonym)
        })
    }

    const [displayedSynonyms, setDisplayedSynonyms] = useState(props.card)

    const handleAddSynonymItem = () => {

        const maxId = Math.max(...displayedSynonyms.synonyms.map(syn => syn.id));

        setDisplayedSynonyms({
            ...displayedSynonyms,
            synonyms: [...displayedSynonyms.synonyms, {id: maxId + 1, synonym: ""}]
        })
        setCard({
            ...card,
            synonyms: [...card.synonyms, {id: maxId + 1, synonym: ""}]
        })
    }

    const handleChangeSynonym = (value: string, id: number) => {
        setDisplayedSynonyms({
            ...displayedSynonyms,
            synonyms: displayedSynonyms.synonyms.map(syn => syn.id === id ? {id: syn.id, synonym: value} : syn)
        })
        setCard({
            ...card,
            synonyms: displayedSynonyms.synonyms.map(syn => syn.id === id ? {id: syn.id, synonym: value} : syn)
        })
    }

    const handleSave = () => {
        const filteredCard = {
            ...card,
            synonyms: card.synonyms.filter(data => data.synonym)
        }
        editCard(filteredCard).then(() => {
            alert("Changes saved");
        })
    }


  return (
       <details className="memorize-details w-[500px] bg-[#232323] memorize shadow mt-[13px] rounded text-[16px]">
        <summary className="font-[Quicksand] text-[18px] text-[#E8E4FF] p-2 m-0 flex items-center justify-between hover:opacity-90 cursor-pointer">
            <p className="m-0">{props.card.word}</p>
            <button className="p-0 bg-transparent border-0 btn-reset hover:opacity-90" onClick={handleRemove}>
                <IconCircleX color="#fff" />
            </button>
        </summary>
        
        <div className="memorize bg-[#EFE5FF] px-2 pt-4 pb-2 flex flex-col items-center">

            <CardItemBlock card={props.card} type="Transcription" onChange={(value) => handleChange(value, "transcription")} />
            <CardItemBlock card={props.card} type="Definition" onChange={(value) => handleChange(value, "definition")} />
            <CardItemBlock card={props.card} type="Translation" onChange={(value) => handleChange(value, "translation")} />

            <div className="relative flex flex-col items-center mt-2 text-center memorize">
                <div className="flex items-center justify-center w-full gap-1 memorize">
                    <h2 className="mx-0 mb-0 mt-1 font-[Quicksand] text-[#400092] text-[16px]">Synonyms</h2>
                    <button className="p-0 mt-2 bg-transparent border-0 btn-reset hover:opacity-90" onClick={() => handleAddSynonymItem()}>
                        <IconSquareRoundedPlus color="#000" width={16} stroke={1} /> 
                    </button>
                </div>
                {displayedSynonyms.synonyms.map((synonym, index) => (
                    <SynonymItem key={synonym.id} synonym={synonym.synonym} 
                                 onChange={(value) => handleChangeSynonym(value, synonym.id)} removeSynonym={(synonym) => {handleRemoveSynonym(synonym)}} />
                ))}  
            </div>

            <button className="bg-[#5000D2] rounded btn-reset p-2 border-0 flex gap-2 hover:opacity-80 mt-4" onClick={handleSave}>
                <p className="m-0 text-[18px] text-[#EFE5FF]">Save changes</p>
            </button>
        </div>
        
        
      </details>
  );
};

