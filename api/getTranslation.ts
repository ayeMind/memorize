export async function getWordTranslation(word: string): Promise<string> {
    const sourceLang = 'en';
    const targetLang = 'ru';
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(word)}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        return data[0][0][0];
      } else {
        throw new Error('Неверный формат ответа от API');
      }
    } catch (error) {
      console.error('Ошибка при переводе слова:', error);
      throw error;
    }
  }