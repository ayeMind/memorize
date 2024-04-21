import "index.css"

import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { changeSettings } from "~api/changeSettings"
import { getSettings } from "~api/getSettings"
import { Switch } from "~components/switch"
import { supabase } from "~core/supabase"


function IndexOptions() {
  const [user, setUser] = useStorage<User>({
    key: "user",
    instance: new Storage({
      area: "local"
    })
  })

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [bold, setBold] = useState(false)
  const [cursive, setCursive] = useState(false)
  const [color, setColor] = useState("#ff22ff")
  const [cardPrefer, setCardPrefer] = useState("Definition")

  useEffect(() => {
    getSettings()
      .then((data) => {
        if (data.bold) {
          setBold(true)
        }
        if (data.cursive) {
          setCursive(true)
        }
        if (data.color) {
          setColor(data.color)
        }
        if (data["card-prefer"]) {
          setCardPrefer(data["card-prefer"])
        }
      })
      .catch((err) => console.error(err))

    async function init() {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        return
      }
      if (!!data.session) {
        setUser(data.session.user)

        sendToBackground({
          name: "init-session",
          body: {
            refresh_token: data.session.refresh_token,
            access_token: data.session.access_token
          }
        })
      }
    }

    init()
  }, [])

  const handleEmailLogin = async (
    type: "LOGIN" | "SIGNUP",
    username: string,
    password: string
  ) => {
    try {
      const {
        error,
        data: { user }
      } =
        type === "LOGIN"
          ? await supabase.auth.signInWithPassword({
              email: username,
              password
            })
          : await supabase.auth.signUp({ email: username, password })

      if (error) {
        alert("Error with auth: " + error.message)
      } else if (!user) {
        alert("Signup successful, confirmation mail should be sent soon!")
      } else {
        setUser(user)
        const { data, error } = await supabase
          .from("words")
          .insert({ user_id: user.id, words: [] })
      }      
      window.location.reload()
    } catch (error) {
      console.log("error", error)
      alert(error.error_description || error)
    }
  }

  const handleSaveOptions = (e) => {
    const form = document.querySelector(
      ".settings-extension"
    ) as HTMLFormElement

    e.preventDefault()

    const fields = []
    const data = new FormData(form)
    for (let [key, value] of data.entries()) {
      fields.push({ key: key, value: value })
    }

    const request = {
      bold: fields.some((data) => data.key === "bold"),
      cursive: fields.some((data) => data.key === "cursive"),
      color: fields.find((data) => data.key === "color").value,
      "card-prefer": fields.find((data) => data.key === "card-prefer").value
    }

    changeSettings(request).catch((error) => console.error(error)).then(data => window.location.reload())
  }

  return (
    <main className="memorize m-0 p-0 flex justify-center h-screen font-[Quicksand] text-[20px] bg-[#100e17] text-[#f2f2f2]">
      {user && user.confirmed_at && (
        <div className="relative flex flex-col items-center memorize">
          <form
            className="flex flex-col items-center gap-4 p-8 settings-extension"
            onSubmit={handleSaveOptions}>
            <h1 className="text-[32px] m-0">Settings</h1>
            <div className="memorize w-[512px] p-4 bg-[#232323] rounded text-[#f2f2f2]">
              <h2 className="font-[200] text-[24px]">Highlighting words on a page</h2>
              <div className="flex flex-col gap-4 mt-4 memorize">
                <Switch
                  value={bold}
                  name="bold"
                  text="Bold"
                  onChange={(e) => setBold((prev) => !prev)}
                />
                <Switch
                  value={cursive}
                  name="cursive"
                  text="Cursive"
                  onChange={(e) => setCursive((prev) => !prev)}
                />
                <div className="flex gap-2 memorize">
                  <input
                    name="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="memorize input-reset rounded-xl p-1 w-[60px] h-[34px] bg-[#ccc]"
                    type="color"
                  />
                  <label>Text shadow color</label>
                </div>
              </div>
            </div>

            <div className="memorize w-[512px] p-4 bg-[#232323] rounded text-[#f2f2f2]">
              <h2 className="font-[200] text-[24px]">What do you want to see on the card first?</h2>
              <select
                value={cardPrefer}
                onChange={(e) => setCardPrefer(e.target.value)}
                name="card-prefer"
                className="memorize bg-[#ccc] text-black px-2 rounded-[1px] h-8 text-[18px]">
                <option value="Definition" className="p-2">Definition</option>
                <option value="Examples" className="p-2">Examples</option>
                <option value="Synonyms" className="p-2">Synonyms</option>
              </select>
            </div>

            <div className="flex gap-12 mt-2 memorize">
              <button className="memorize p-2 bg-blue-600 text-[#f2f2f2] rounded btn btn-reset hover:bg-blue-700">
                Save changes
              </button>
              <button
                type="button"
                onClick={() =>
                  changeSettings({
                    bold: false,
                    cursive: false,
                    color: "#ff22ff",
                    "card-prefer": "Definition"
                  }).then(data => window.location.reload())
                }
                className="memorize p-2 bg-blue-600 text-[#f2f2f2] rounded btn btn-reset hover:bg-blue-700">
                Reset settings
              </button>
            </div>
          </form>

          <button
            onClick={() => {
              supabase.auth.signOut()
              setUser(null)
            }}
            className="fixed px-4 py-2 text-white bg-red-500 rounded memorize bottom-6 btn btn-reset hover:bg-red-600">
            Logout
          </button>
        </div>
      )}
      {user && !user.confirmed_at && (
        <div className="memorize flex flex-col items-center gap-4 p-8 bg-[#232323] rounded-lg w-[350px]">
          <h3>
            Please confirm your email to continue. Confirmation mail should be
            sent soon!
          </h3>
          <button
            onClick={() => {
              supabase.auth.signOut()
              setUser(null)
            }}
            className="px-4 py-2 text-white bg-red-500 rounded memorize btn hover:bg-red-600">
            Logout
          </button>
        </div>
      )}
      {!user && (
        <div className="memorize flex flex-col items-center gap-4 p-8 bg-[#232323] rounded-lg w-[350px]">
          <div className="flex flex-col gap-1 memorize">
            <label>Email</label>
            <input
              type="text"
              placeholder="Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-reset px-2 text-[#232323]"
            />
          </div>

          <div className="flex flex-col gap-1 memorize">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="memorize input-reset px-2 text-[#232323]"
            />
          </div>

          <button
            onClick={(e) => {
              handleEmailLogin("SIGNUP", username, password)
            }}
            className="px-4 py-2 text-white bg-blue-500 rounded memorize btn btn-reset hover:bg-blue-600">
            Sign up
          </button>
          <button
            onClick={(e) => {
              handleEmailLogin("LOGIN", username, password)
            }}
            className="px-4 py-2 text-white bg-green-500 rounded memorize btn btn-reset hover:bg-green-600">
            Login
          </button>
        </div>
      )}
    </main>
  )
}

export default IndexOptions
