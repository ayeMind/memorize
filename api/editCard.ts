import { supabase } from "~core/supabase"

export const editCard = async (props) => {
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error(error)
      return error;
    }

    if (!data.session) {
      return "data.session is not defined"
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
  return existingError;
}

if (existingData && existingData.length > 0) {

  // Меняем карточку
  const updatedWords = existingData[0].words.map(wordInfo => {
    if (wordInfo.word === props.word) {
      return props
    }
    return wordInfo
  })

  const { data: updateData, error: updateError } = await supabase
    .from('words')
    .update({ words: updatedWords })
    .eq('user_id', userId)

  if (updateError) {
    console.error('Error updating words:', updateError)
    return updateData;
  } 

} else {
  // Если строчки нет
  const { data: insertData, error: insertError } = await supabase
    .from('words')
    .insert({ user_id: userId, words: [props] })

  if (insertError) {
    console.error('Error inserting new row:', insertError)
    return insertError;
  }
}
}