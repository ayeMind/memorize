import "../index.css"
import { getShowedCards } from "~utils/getShowedCards";
import { useEffect, useState } from 'react';

// @ts-ignore
import image from "../assets/background.png";
import { CardPopup } from "~components/card-popup";

const Play = () => {
    const [showedCards, setShowedCards] = useState([]);
    const [nextWords, setNextWords] = useState([]);

    useEffect(() => {
        const fetchShowedCards = async () => {
            const cards = await getShowedCards();
            setShowedCards(cards);
            setNextWords(cards.slice(1));
        };
        
        fetchShowedCards();
    }, []);

    if (!showedCards.length) {
      return(
      <div
        className="relative flex items-center justify-center w-screen h-screen bg-fixed bg-no-repeat bg-cover memorize play-page"
        style={{ backgroundImage: `url(${image}` }}>
      </div>
    )
    }

    return (
        <div
        className="relative flex items-center justify-center w-screen h-screen bg-fixed bg-no-repeat bg-cover memorize play-page"
        style={{ backgroundImage: `url(${image}` }}>
            <CardPopup {...showedCards[0]} nextWords={nextWords} />
        </div>
    );
};

export default Play;