import { getCards } from "~api/getCards";
import { isShowedCard } from "./isShowedCard";

export const getShowedCards = async () => {
    const cards = await getCards();
    const showedWords = await Promise.all(cards.map(async (card) => {
        const isShowed = await isShowedCard(card.word);
        if (isShowed) {
            return card;
        }
    }));
    return showedWords.filter(word => word)
}