import { supabase } from "~core/supabase"

export const addHistory = async (props) => {
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

  // Проверяем, есть ли уже строчка с таким user_id в таблице history
  const { data: existingData, error: existingError } = await supabase
    .from("history")
    .select("history")
    .eq("user_id", userId)

  if (existingError) {
    console.error("Error fetching existing data:", existingError)
    return
  }

  if (existingData && existingData.length > 0) {
    // Если строчка уже существует

    const updatedHistory = [...existingData[0].history, props]

    const { data: updateData, error: updateError } = await supabase
      .from("history")
      .update({ history: updatedHistory })
      .eq("user_id", userId)

    if (updateError) {
      console.error("Error updating history:", updateError)
      return
    }
  } else {
    // Если строчки нет
    const { data: insertData, error: insertError } = await supabase
      .from("history")
      .insert({ user_id: userId, history: [props] })

    if (insertError) {
      console.error("Error inserting new row:", insertError)
      return
    }
  }
}
