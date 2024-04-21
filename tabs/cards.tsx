import "../index.css"
// @ts-ignore
import image from "../assets/background.png"

const Cards = () => {
  return (
    <div className="flex justify-center w-screen h-screen bg-fixed bg-no-repeat bg-cover memorize" 
         style={{backgroundImage: `url(${image}`}}> 
           <div className="bg-[#232323] rounded-b w-[192px] h-[64px]">
            
           </div>
    </div>
  );
};

export default Cards;

