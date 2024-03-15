import "index.css"

import type { Provider, User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

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

  useEffect(() => {
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
      }
    } catch (error) {
      console.log("error", error)
      alert(error.error_description || error)
    }
  }

  const handleOAuthLogin = async (provider: Provider, scopes = "email") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: location.href
      }
    })
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4 p-8 bg-gray-200 rounded-lg w-[350px]">
        {(user && user.confirmed_at) && (
          <>
            <h3>
              {user.email} - {user.id}
            </h3>
            <button
              onClick={() => {
                supabase.auth.signOut()
                setUser(null)
              }}
              className="px-4 py-2 text-white bg-red-500 rounded btn hover:bg-red-600">
              Logout
            </button>
          </>
        )}
        {(user && !user.confirmed_at) && (
          <>
            <h3>
              Please confirm your email to continue. Confirmation mail should be
              sent soon!
            </h3>
            <button
              onClick={() => {
                supabase.auth.signOut()
                setUser(null)
              }}
              className="px-4 py-2 text-white bg-red-500 rounded btn hover:bg-red-600">
              Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-2"
              />
            </div>

            <button
              onClick={(e) => {
                handleEmailLogin("SIGNUP", username, password)
              }}
              className="px-4 py-2 text-white bg-blue-500 rounded btn hover:bg-blue-600">
              Sign up
            </button>
            <button
              onClick={(e) => {
                handleEmailLogin("LOGIN", username, password)
              }}
              className="px-4 py-2 text-white bg-green-500 rounded btn hover:bg-green-600">
              Login
            </button>

            <button
              onClick={(e) => {
                handleOAuthLogin("github")
              }}
              className="px-4 py-2 text-white bg-gray-800 rounded btn hover:bg-gray-900">
              Sign in with GitHub
            </button>
          </>
        )}
      </div>
    </main>
  )
}

export default IndexOptions
