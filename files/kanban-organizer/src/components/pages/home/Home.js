import { useEffect, useState } from "react"

import "./home.sass"

function Home() {

  const [selected, setSelected] = useState("login-selected")

  useEffect(() => {
    console.log(selected)
  }, [selected])



  return (
    <main id="home-container">
      <div id="content-box">

      </div>

      <div id="sign-box">
        <header>
          <button
            className="btn"
            id="login"
            onClick={() => setSelected("login")}
          >
            <p>Login</p>
          </button>

          <button
            className="btn"
            id="signup"
            onClick={() => setSelected("signup")}
          >
            <p>Sign up</p>
          </button>

          <div className = "animation start-home"></div>
        </header>
      </div>
    </main>
  )
}

export default Home