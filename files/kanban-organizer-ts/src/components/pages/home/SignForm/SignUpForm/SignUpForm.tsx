import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa"
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

import { useState, useEffect } from "react"

import "./signupform.sass"


function SignUpForm() {

  const [email, setEmail] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [inputType, setInputType] = useState<string>("password")
  const [inputTypeConfirm, setInputTypeConfirm] = useState<string>("password")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")
  const [rightPassword, setRightPassord] = useState<boolean>(true)
  console.log(name, email)

  function changeInputType(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (inputType === "text") {
      setInputType("password")
    } else {
      setInputType("text")
    }
  }

  function changeInputTypeConfirm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (inputTypeConfirm === "text") {
      setInputTypeConfirm("password")
    } else {
      setInputTypeConfirm("text")
    }
  }

  useEffect(() => {
    if (password !== passwordConfirm) {
      setRightPassord(false)
    } else {
      setRightPassord(true)
    }
  }, [password, passwordConfirm, rightPassword])


  function buttonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
  }




  return (
    <form id="signup-box">
      {/* Name */}
      <div id="name-box">
        <p>
          <AiOutlineUser />
        </p>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </div>

      {/* E-mail */}
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

      {/* Password */}
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

        <button className="eye-icon" onClick={changeInputType}>
          {(inputType === "password") ? (
            <AiOutlineEye />
          ) : (
            <AiOutlineEyeInvisible />
          )}
        </button>
      </div>


      {/* Confirm Password */}
      <div id="passwordConfirm-box">
        <p id="lock-icon">
          <AiOutlineLock />
        </p>

        <input
          type={`${inputTypeConfirm}`}
          placeholder="Confirm password"
          onChange={(e) => {
            setPasswordConfirm(e.target.value)
          }}
        />

        <button className="eye-icon" onClick={changeInputTypeConfirm}>
          {(inputTypeConfirm === "password") ? (
            <AiOutlineEye />
          ) : (
            <AiOutlineEyeInvisible />
          )}
        </button>
      </div>

      {/* Password test answer */}

      <div id="answer-box">
        {!rightPassword && (
          <p>The passwords doesn't match</p>
        )}
      </div>


      {/* Sign up button */}
      <div id="signup-button-box">
        <button
          id="signup-button"
          onClick={buttonClick}
        >
          <p>Sign Up</p>
        </button>
      </div>

      {/* Other options */}
      <div id="other-signup-options-box">
        <p id="label">
          Or sign up using
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

export default SignUpForm