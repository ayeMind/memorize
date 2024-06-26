import { supabase } from "~core/supabase"

export const getWord = async (word: string) => {
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

  // Проверяем, есть ли строчка с таким user_id в таблице words
  const { data: existingData, error: existingError } = await supabase
    .from("words")
    .select("words")
    .eq("user_id", userId)

  if (existingError) {
    console.error("Error fetching existing data:", existingError)
    return
  }

  if (existingData && existingData.length > 0) {
    const wordInfo = existingData[0].words.filter(wordInfo => wordInfo.word == word)[0]
    return wordInfo
  } else {
    return {}
  }
}
