import "./calendar.sass"
import BackToHomeButton from "../../layout/back-to-home-button/BackToHomeButton"

import { useContext } from "react"
import MyContext from "../../../context/MyContext"
import { TbFaceIdError } from "react-icons/tb"



function Calendar() {
  const { user }: any = useContext(MyContext)

  return (
    <main id="calendar-container">
      {user.logged ? (
        <>
          <h1 id = "h1-logged">Work in <br />progress</h1>
          <TbFaceIdError id="icon" />
        </>
      ) : (
        <div id="back-to-home-calendar-box">
          <h1>You are not <span>logged in!</span></h1>
          <p>Please log in to acess your calendar!</p>
          <BackToHomeButton />
        </div>
      )}
    </main>
  )
}

export default Calendar