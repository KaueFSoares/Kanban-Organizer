import { useEffect, useState } from "react"
import { AiOutlineMail, AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

import "./signform.sass"

function SignForm() {

    const [selected, setSelected] = useState("login")
    const [email, setEmail] = useState("")
    const [inputType, setInputType] = useState("password")
    const [password, setPassword] = useState("")

    useEffect(() => {
        console.log(selected)
    }, [selected])

    function changeInputType(){
        if (inputType === "login"){
            setInputType("password")
        } else {
            setInputType("login")
        }
    }

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
                <div id="login-box">
                    {/* --- LOGIN BOX --- */}

                    {/* email */}
                    <div id="email-box">
                        <p>
                            <AiOutlineMail />
                        </p>

                        <input
                            type="email"
                            placeholder="E-mail"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>

                    {/* senha */}
                    <div id="password-box">
                        <p id = "lock-icon">
                            <AiOutlineLock />
                        </p>

                        <input
                            type={`${inputType}`}
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />

                        <p id = "eye-icon"onClick = {changeInputType}>
                            {(inputType === "password" ? (
                                <AiOutlineEye />
                            ) : (
                                <AiOutlineEyeInvisible />
                            ))}
                        </p>
                    </div>
                    {/* remember me / forgot password? */}

                    {/* login button */}

                    {/* other login options */}

                </div>
            ) : (
                <div>
                    {/* --- SIGN UP BOX --- */}


                </div>
            )}
        </div >
    )
}

export default SignForm