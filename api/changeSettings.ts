import { supabase } from "~core/supabase"

export const changeSettings = async (props) => {
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
  .from('settings')
  .select('settings')
  .eq('user_id', userId)

if (existingError) {
  console.error('Error fetching existing data:', existingError)
  return
}

if (existingData && existingData.length > 0) {

  const { data: updateData, error: updateError } = await supabase
    .from('settings')
    .update({ settings: props })
    .eq('user_id', userId)

  if (updateError) {
    console.error('Error updating settings:', updateError)
    return
  }

} else {

  const { data: insertData, error: insertError } = await supabase
    .from('settings')
    .insert({ user_id: userId, settings: props })

  if (insertError) {
    console.error('Error inserting new row:', insertError)
    return
  }
}
}