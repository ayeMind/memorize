export interface Context {
    id: number;
    source: string; // english
    target: string // russian translation
  }
  

export interface Card {
    word: string;
    translation: string;
    context: Context[];
    definition: string;
    transcription: string;
    pronunciationUrl: string;
    synonyms: string[];
  }