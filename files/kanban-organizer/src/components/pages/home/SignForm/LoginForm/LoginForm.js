import "./loginform.sass"
import { AiOutlineMail, AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa"
import { useState } from "react"

function LoginForm() {

    const [email, setEmail] = useState("")
    const [inputType, setInputType] = useState("password")
    const [password, setPassword] = useState("")

    function changeInputType(e) {
        e.preventDefault()
        
        if (inputType === "login") {
            setInputType("password")
        } else {
            setInputType("login")
        }
    }

    /* only for not getting warnings */
    console.log(email, password)

    return (
        <form id="login-box">
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

            {/* password */}
            <div id="password-box">
                <p id="lock-icon">
                    <AiOutlineLock />
                </p>

                <input
                    type={`${inputType}`}
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />

                <button id="eye-icon" onClick={changeInputType}>
                    {(inputType === "password" ? (
                        <AiOutlineEye />
                    ) : (
                        <AiOutlineEyeInvisible />
                    ))}
                </button>
            </div>

            {/* remember me / forgot password? */}
            <div id="remember-me-box">
                <div id="remember-me">
                    <input type="checkbox" />
                    <p>Remember me</p>
                </div>

                <div>
                    <a href="/" id="forgot-password">
                        Forgot password?
                    </a>
                </div>
            </div>

            {/* login button */}
            <div id="login-button-box">
                <button id="login-button">
                    <p>Login</p>
                </button>
            </div>

            {/* other login options */}
            <div id="other-login-options-box">
                <p id="label">
                    Or login using
                </p>

                <div id="other-options">
                    <button id="facebook"><FaFacebookF /></button>
                    <button id="tt"><FaTwitter /></button>
                    <button id="google"><FaGoogle /></button>
                </div>
            </div>

        </form>
    )
}

export default LoginForm