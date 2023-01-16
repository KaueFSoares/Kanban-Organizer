import "./calendar.sass"
import BackToHomeButton from "../../layout/back-to-home-button/BackToHomeButton"
import { useLocation } from "react-router-dom"


function Calendar() {
  const location = useLocation()

  var logged: boolean = false

  if (location.state) {
      logged = location.state.logged
  }
  
  return (
    <main id="projects-page-container">
      {logged ? (
        <></>
      ) : (
        <div id = "back-to-home-box">
          <h1>You are not <span>logged in!</span></h1>
          <p>Please log in to acess your calendar!</p>
          <BackToHomeButton />
        </div>
      )}
    </main>
  )
}

export default Calendar