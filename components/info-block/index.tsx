interface Props {
    title: string;
    text: string;
}

export const InfoBlock = ({title, text}: Props) => {
  return (
    <div className="w-full h-auto text-center">
        <p className="text-[14px] text-[#A99BFF]">{title}</p>
        <div className="bg-[#6013DD] px-2 h-1 rounded-t-md" />
        <div className="bg-[#414141] px-3 py-2 text-[18px]">
            <p className="text-[#f3f3f3] text-[16px]">{text}</p>
        </div>
    </div>
  );
};

