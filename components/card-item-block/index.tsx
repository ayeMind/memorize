import type { Card } from "~interfaces"
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  card: Card;
  type: "Transcription" | "Definition" | "Translation";
  onChange: (value: string) => void;
}

export const CardItemBlock = (props: Props) => {

  const getInfo = () => {
    switch (props.type) {
      case "Transcription":
        return props.card.transcription
      case "Definition":
        return props.card.definition
      case "Translation":
        return props.card.translation
    }}
    
    const info = getInfo()

  return (
    <div className="relative w-full text-center memorize">
      <h2 className="mx-0 mb-0 mt-1 font-[Quicksand] text-[#400092] text-[16px]">
        {props.type}
      </h2>
      <div
        className="flex items-center justify-center w-full gap-1 cursor-pointer memorize relative
                               border-[#efe5ff] border-2 rounded hover:border-[#9E66F9]">
       
            <TextareaAutosize onChange={(e) => props.onChange(e.target.value)}
                 className="resize-none h-max m-0 w-full text-[16px] p-1 focus:outline-none 
                            border-0 text-center bg-transparent memorize input-reset" 
                            defaultValue={info ? info : "Not found"} />
      </div>
    </div>
  )
}
