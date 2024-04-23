interface Props {
    title: string;
    active: string;
    onClick: () => void;
}

export const Tab = ({title, active, onClick}: Props) => {
  return (
    <button onClick={onClick}
        className={`${title === active ? 'bg-[#A99BFF]' : 'bg-[#F5EFFF]'} px-2 py-1 rounded-t-md border-0 btn-reset text-[#040404]`}>
        <h2 className="font-[Quicksand] font-[400] text-[16px] m-0">{title}</h2>
    </button>
  );
};
