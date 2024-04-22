import { IconTrash } from "@tabler/icons-react";
import ReactTextareaAutosize from "react-textarea-autosize";

interface Props {
  synonym: string;
  removeSynonym: (synonym: string) => void;
  onChange: (value: string) => void;
}

export const SynonymItem = (props: Props) => {
  return (  
    <div className="flex gap-2 ml-[112px] justify-center">
        <button className="p-0 bg-transparent border-0 btn-reset hover:opacity-90" onClick={() => props.removeSynonym(props.synonym)}>
          <IconTrash color="#000" width={16} stroke={1} />
        </button>
       <ReactTextareaAutosize onChange={(e) => props.onChange(e.target.value)}
        className="resize-none text-[16px] m-0 p-1 bg-transparent border-[#EFE5FF] border-2 rounded hover:border-[#9E66F9] focus:outline-none memorize input-reset " defaultValue={props.synonym} />
    </div>  
  );
};
  