import { useState } from "react"
import LoginForm from "./LoginForm/LoginForm"


import "./signform.sass"
import SignUpForm from "./SignUpForm/SignUpForm"

function SignForm() {

    const [selected, setSelected] = useState("login")





    return (
        <div id="sign-box">

            {/* --- LABEL --- */}
            <header id={selected}>
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

                <div className="animation start-home"></div>
            </header>


            {(selected === "login") ? (
                <LoginForm />
            ) : (
                <SignUpForm />
            )}
        </div >
    )
}

export default SignForm