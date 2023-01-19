import "./loginform.sass"
import { AiOutlineUser, AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa"
import { useContext, useState } from "react"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import MyContext from "../../../../../context/MyContext"


function LoginForm() {

    const navigate = useNavigate()

    const { user, setUser }: any = useContext(MyContext)

    const [name, setName] = useState<string>("")
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
            fetch("http://localhost:5001/users/" + name)
                .then((res) => {
                    return res.json()
                }).then((resp) => {
                    if (Object.keys(resp).length === 0) {
                        toast.error("Incorrect e-mail, if you don't have an account, sign up!")
                    } else if (resp.password === password) {
                        setUser({ ...user, logged: true, id: resp.id})
                        navigate("/projects", {state: {message: `Hello, ${resp.id}!`}})
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

        if (name === "" || password === "" || name === null || password === null) {
            isNull = true
            toast.warn("Please fill out all fields before proceeding!")
        }

        return isNull

    }

    return (
        <form id="login-box">
            {/* --- LOGIN BOX --- */}

            {/* email */}
            <div id="email-box">
                <p>
                    <AiOutlineUser />
                </p>

                <input
                    type="text"
                    maxLength={100}
                    name="userName"
                    placeholder="User name"
                    onChange={(e) => {
                        setName(e.target.value)
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
                    maxLength={100}
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