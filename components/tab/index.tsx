interface Props {
    title: string;
    active: string;
    onClick: () => void;
}

export const Tab = ({title, active, onClick}: Props) => {
  return (
    <button onClick={onClick}
        className={`${title === active ? 'bg-[#A99BFF]' : 'bg-[#F5EFFF]'} px-2 rounded-t-md text-[#040404]`}>
        <p className="font-[Quicksand]">{title}</p>
    </button>
  );
};
