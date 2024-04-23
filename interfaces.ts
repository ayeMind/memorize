export interface Context {
    id: number;
    source: string; // english
    target: string // russian translation
  }

export interface Synonym {
  id: number;
  synonym: string;
}
  

export interface Card {
    word: string;
    translation: string;
    context: Context[];
    definition: string;
    transcription: string;
    pronunciationUrl: string;
    synonyms: Synonym[];
    nextWords?: Card[];
  }