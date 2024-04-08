interface Props {
  audioLink: string
  transcription: string
}

export const AudioBlock = ({ audioLink, transcription }: Props) => {
  const startAudio = () => {
    const audio = document.querySelector(
      ".extension-audio-memorize"
    ) as HTMLAudioElement
    audio.play()
  }

  return (
    <div className="w-full text-center">
      <p className="text-[14px] text-[#A99BFF]">Pronunciation</p>
      <div className="bg-[#6013DD] px-2 h-1 rounded-t-md" />
      <div className="bg-[#414141] px-3 py-2 text-[18px] h-[48px] flex justify-center items-center relative">
          <audio
            className="absolute left-4 w-[104px] h-[24px] extension-audio-memorize"
            src={audioLink}
          />
          <svg
            onClick={startAudio}
            className="absolute visible overflow-visible cursor-pointer left-4"
            width="24"
            height="24"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd">
            <path d="M15 23l-9.309-6h-5.691v-10h5.691l9.309-6v22zm-9-15.009v8.018l8 5.157v-18.332l-8 5.157zm14.228-4.219c2.327 1.989 3.772 4.942 3.772 8.229 0 3.288-1.445 6.241-3.77 8.229l-.708-.708c2.136-1.791 3.478-4.501 3.478-7.522s-1.342-5.731-3.478-7.522l.706-.706zm-2.929 2.929c1.521 1.257 2.476 3.167 2.476 5.299 0 2.132-.955 4.042-2.476 5.299l-.706-.706c1.331-1.063 2.182-2.729 2.182-4.591 0-1.863-.851-3.529-2.184-4.593l.708-.708zm-12.299 1.299h-4v8h4v-8z" />
          </svg>
          <p className="text-[#f3f3f3]">{transcription}</p>
      </div>
    </div>
  )
}