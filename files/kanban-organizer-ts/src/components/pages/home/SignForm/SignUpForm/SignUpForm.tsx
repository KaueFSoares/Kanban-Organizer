import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa"
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

import { useState, useEffect } from "react"

import "./signupform.sass"
import { toast } from "react-toastify"

interface InewUser {
  id: string
  email: string
  password: string
  projects: Iproject
}

interface Iproject {
  id: number
  projectName: string
  summary: string
  stages: Istages[]
}


interface Istages {
  id: number
  stageName: string
  itens: Iitens[]
}

interface Iitens {
  id: number
  itemName: string
}


function SignUpForm() {

  var newUser: InewUser= { id: "", email: "", password: "", projects: {id: 0, projectName: "", summary: "", stages: []}}
  const [email, setEmail] = useState<string>("")
  const [id, setId] = useState<string>("")
  const [inputType, setInputType] = useState<string>("password")
  const [inputTypeConfirm, setInputTypeConfirm] = useState<string>("password")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirm, setPasswordConfirm] = useState<string>("")
  const [rightPassword, setRightPassord] = useState<boolean>(true)


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

  function validation() {
    let isValid: boolean = true

    if (
      email === "" || email === null ||
      id === "" || id === null ||
      password === "" || password === null ||
      passwordConfirm === "" || passwordConfirm === null
    ) {
      isValid = false
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
    } else if (rightPassword === false) {
      isValid = false
      toast.warn("The password confirmation most be equal to the password!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      newUser = { id: id, email: email, password: password, projects: {id: 0, projectName: "", summary: "", stages: []} }
    }

    return isValid

  }

  function signup(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (validation() === true) {

      fetch("http://localhost:5001/users/" + id)
        .then((res) => {
          return res.json()
        }).then((resp) => {
          if (Object.keys(resp).length !== 0) {
            toast.error("User name already in use, if you already have an account, log in!")
          } else {
            // after all the validations


            fetch("http://localhost:5001/users", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((resp) => resp.json())
              .then(() => {

                //redirect
                toast.success(`Signed up successfully, make login to proceed!`, {
                  toastId: '',
                })

              })

          }
        })
    }

  }



  return (
    <form id="signup-box">
      {/* Name */}
      <div id="name-box">
        <p>
          <AiOutlineUser />
        </p>

        <input
          name="id"
          maxLength={100}
          type="text"
          placeholder="User name"
          onChange={(e) => {
            setId(e.target.value)
          }}
        />
      </div>

      {/* E-mail */}
      <div id="email-box">
        <p>
          <AiOutlineMail />
        </p>

        <input
          name="userEmail"
          maxLength={100}
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
          name="password"
          maxLength={100}
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
          maxLength={100}
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
          onClick={signup}
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
          <button id="google" onClick={buttonClick} ><FaGoogle /></button>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm