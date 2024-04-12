import { supabase } from "~core/supabase"

export const getSettings = async () => {
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

  const { data: existingData, error: existingError } = await supabase
    .from("settings")
    .select("settings")
    .eq("user_id", userId)

  if (existingError) {
    console.error("Error fetching existing data:", existingError)
    return
  }

  if (existingData && existingData.length > 0) {
    return existingData[0].settings
  } else {
    return {
        "bold": false,
        "cursive": false,
        "color": "#ff22ff",
        "card-prefer": "Definition"
      }
  }
}
