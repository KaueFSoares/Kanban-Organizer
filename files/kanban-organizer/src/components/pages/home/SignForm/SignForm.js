import { useEffect, useState } from "react"
import LoginForm from "./LoginForm/LoginForm"


import "./signform.sass"

function SignForm() {

    const [selected, setSelected] = useState("login")


    useEffect(() => {
        console.log(selected)
    }, [selected])



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
                <div>
                    {/* --- SIGN UP BOX --- */}


                </div>
            )}
        </div >
    )
}

export default SignForm