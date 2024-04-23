import { getHistory } from "~api/getHistory";

export const isShowedCard = async (word: string) => {
    const now = new Date();
    const history = await getHistory();
    const filteredHistory = history.filter(item => item.word === word);

    if (filteredHistory.length === 0) {
        return true;
    }

    const easyCount = filteredHistory.filter(item => item.difficult === 'easy').length;
    const mediumCount = filteredHistory.filter(item => item.difficult === 'medium').length;
    const hardCount = filteredHistory.filter(item => item.difficult === 'hard').length;

    let delay;
    
    if (filteredHistory.length < 3 || easyCount === 0) {
        const lastDifficult = filteredHistory[filteredHistory.length - 1].difficult;
        if (lastDifficult === 'easy') {
            delay = 2;
        } else if (lastDifficult === 'medium') {
            delay = 1;
        } else if (lastDifficult === 'hard') {
            delay = 0;
        }

    } else if (easyCount > mediumCount && easyCount > hardCount) {
        delay = easyCount * 2; // if 'easy' is the most common choice, delay for 2 days for each 'easy'
    } else if (mediumCount > hardCount) {
        delay = mediumCount; // if 'medium' is the most common choice, delay for 1 day for each 'medium'
    } else {
        delay = hardCount / 4; // if 'hard' is the most common choice, delay for 0.25 day for each 'hard'
    }

    const lastSeen = new Date(filteredHistory[filteredHistory.length - 1].time);
    lastSeen.setDate(lastSeen.getDate() + delay);

    console.log('lastSeen', lastSeen, 'now', now, 'delay', delay);
    console.log('isShowedCard', now >= lastSeen, word);

    return now >= lastSeen;
}