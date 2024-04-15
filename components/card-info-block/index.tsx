interface Props {
    text: string;
    pronunciationUrl: string;
    transcription: string;
}

export const CardInfoBlock = (props: Props) => {
    console.log(props);
    const startAudio = () => {
        const audio = document.querySelector(
          ".extension-audio-card-memorize"
        ) as HTMLAudioElement
        audio.play()
      }

  return (
    <div className="memorize bg-[#F5EFFF] flex flex-col items-center justify-center gap-4 p-4 w-full rounded-md">
       <div className="relative flex justify-center w-full gap-2 mt-4 memorize">
                <svg
                    onClick={startAudio}
                    className="visible overflow-visible cursor-pointer memorize"
                    width="24"
                    height="24"
                    fill="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd">
                    <path d="M15 23l-9.309-6h-5.691v-10h5.691l9.309-6v22zm-9-15.009v8.018l8 5.157v-18.332l-8 5.157zm14.228-4.219c2.327 1.989 3.772 4.942 3.772 8.229 0 3.288-1.445 6.241-3.77 8.229l-.708-.708c2.136-1.791 3.478-4.501 3.478-7.522s-1.342-5.731-3.478-7.522l.706-.706zm-2.929 2.929c1.521 1.257 2.476 3.167 2.476 5.299 0 2.132-.955 4.042-2.476 5.299l-.706-.706c1.331-1.063 2.182-2.729 2.182-4.591 0-1.863-.851-3.529-2.184-4.593l.708-.708zm-12.299 1.299h-4v8h4v-8z" />
                    <foreignObject className="w-[24px] h-[24px]">
                        <audio
                            className="block w-[24px] h-[24px] extension-audio-card-memorize"
                                src={props.pronunciationUrl} />
                   </foreignObject>
                </svg>
            <p className="text-[#040404]">{props.transcription}</p>
       </div>
       <p className="text-[#040404] text-center">
        {props.text ? props.text : "Not found"}
       </p>
    </div>
  );
};
