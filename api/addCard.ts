import { supabase } from "~core/supabase"
import type { Card } from "~interfaces"

export const addCard = async (props: Card) => {
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error(error)
      return
    }

    if (!data.session) {
      return
    }

    const { user } = data.session
    const userId = user.id

    // Проверяем, есть ли уже строчка с таким user_id в таблице words
    const { data: existingData, error: existingError } = await supabase
  .from('words')
  .select('words')
  .eq('user_id', userId)

if (existingError) {
  console.error('Error fetching existing data:', existingError)
  return
}

const filledWord = {
  word: props.word,
  translation: props.translation ? props.translation : 'Translation not found',
  context: props.context ? props.context : [],
  definition: props.definition ? props.definition : 'Definition not found',
  transcription: props.transcription ? props.transcription : 'Transcription not found',
  synonyms: props.synonyms ? props.synonyms : [],
  pronunciationUrl: props.pronunciationUrl ? props.pronunciationUrl : '',
}


if (existingData && existingData.length > 0) {
  // Если строчка уже существует

  const existingWords = existingData[0].words.map(elem => elem.word)
  if (existingWords.includes(props.word)) {
    return
  }

  const updatedWords = [...existingData[0].words, filledWord]

  const { data: updateData, error: updateError } = await supabase
    .from('words')
    .update({ words: updatedWords })
    .eq('user_id', userId)

  if (updateError) {
    console.error('Error updating words:', updateError)
    return
  }

} else {
  // Если строчки нет
  const { data: insertData, error: insertError } = await supabase
    .from('words')
    .insert({ user_id: userId, words: [filledWord] })

  if (insertError) {
    console.error('Error inserting new row:', insertError)
    return
  }
}
}