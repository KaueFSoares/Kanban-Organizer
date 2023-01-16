import "./loginform.sass"
import { AiOutlineMail, AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa"
import { useState } from "react"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"


function LoginForm() {

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>("")
    const [inputType, setInputType] = useState<string>("password")
    const [password, setPassword] = useState<string>("")

    function changeInputType(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault()

        if (inputType === "text") {
            setInputType("password")
        } else {
            setInputType("text")
        }
    }

    function buttonClick(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault()
    }

    /* THE FOLLOWING METHOD IS UNSAFE AND NOT RECOMMENDED, IT WAS ONLY USED FOR FRONT-END DEVELOPMENT PURPOSES */
    function login(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault()

        if (checkNull() === false) {
            fetch("http://localhost:5001/users/" + email).then((res) => {
                return res.json()
            }).then((resp) => {
                if(Object.keys(resp).length === 0){
                    toast.error("Incorrect e-mail, if you don't have an account, sign up!")
                } else if (resp.password === password) {
                    navigate("/projects", { state: {logged: true }})
                } else {
                    toast.error("Incorrect password!")
                }


            }).catch((err) => {
                toast.error("Login failed due to: " + err.message)
            })
        }

    }

    function checkNull(): boolean {
        let isNull: boolean = false

        if (email === "" || password === "" || email === null || password === null) {
            isNull = true
            toast.warn("Please fill out all fields before proceeding!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        return isNull

    }

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
                    name="userEmail"
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
                    name="password"
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
                    onClick={login}
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