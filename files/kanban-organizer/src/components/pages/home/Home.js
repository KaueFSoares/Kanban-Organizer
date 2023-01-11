import { useState } from "react"

import "./home.sass"

function Home() {

  const [selected, setSelected] = useState("login")

  function changeToLogin() {
    setSelected("login")
    console.log(selected)
  }

  function changeToSignup(){
    setSelected("signup")
    console.log(selected)
  }



  return (
    <main id="home-container">
      <div id="content-box">

      </div>

      <div id="sign-box">
        <header>
          <button
            className="button"
            id="login-button"
            onClick={changeToLogin}
          >
            <p>Login</p>
          </button>

          <button
            className="button"
            id="signup-button"
            onClick={changeToSignup}
          >
            <p>Sign up</p>
          </button>
        </header>
      </div>
    </main>
  )
}

export default Home