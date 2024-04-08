export const CardPopup = ({word}: {word: string}) => {
  return (
    <div className="card-popup visible block p-5 w-[340px] bg-[#232323] opacity-100">
       <div>{word}</div>
    </div>
  );
};
