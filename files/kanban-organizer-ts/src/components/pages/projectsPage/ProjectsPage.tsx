import { useLocation } from "react-router-dom"
import "./projectspage.sass"
import BackToHomeButton from "../../layout/back-to-home-button/BackToHomeButton"

function ProjectsPage() {
  
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
          <p>Please log in to acess your projects!</p>
          <BackToHomeButton />
        </div>
      )}
    </main>
  )
}

export default ProjectsPage