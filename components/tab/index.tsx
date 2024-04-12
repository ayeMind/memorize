interface Props {
    title: string;
    active: string;
    onClick: () => void;
}

export const Tab = ({title, active, onClick}: Props) => {
  return (
    <button onClick={onClick}
        className={`${title === active ? 'bg-[#A99BFF]' : 'bg-[#F5EFFF]'} px-2 rounded-t-md text-[#040404]`}>
        <h2 className="font-[Quicksand] font-[400]">{title}</h2>
    </button>
  );
};
