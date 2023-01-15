import "./loginform.sass"
import { AiOutlineMail, AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa"
import { useState } from "react"

function LoginForm() {

    const [email, setEmail] = useState<string>("")
    const [inputType, setInputType] = useState<string>("password")
    const [password, setPassword] = useState<string>("")

    function changeInputType(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        if (inputType === "text") {
            setInputType("password")
        } else {
            setInputType("text")
        }
    }

    function buttonClick(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
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
                <button
                    id="login-button"
                    onClick={buttonClick}
                >
                    <p>Login</p>
                </button>
            </div>

            {/* other login options */}
            <div id="other-login-options-box">
                <p id="label">
                    Or login using
                </p>

                <div id="other-options">
                    <button id="facebook" onClick={buttonClick}><FaFacebookF /></button>
                    <button id="tt" onClick={buttonClick}><FaTwitter /></button>
                    <button id="google" onClick={buttonClick}><FaGoogle /></button>
                </div>
            </div>

        </form>
    )
}

export default LoginForm