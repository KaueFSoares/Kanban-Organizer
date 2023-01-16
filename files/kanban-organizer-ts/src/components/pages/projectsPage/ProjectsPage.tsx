import { useLocation } from "react-router-dom"
import "./projectspage.sass"
import { TbFaceIdError } from "react-icons/tb"

function ProjectsPage() {
  
  const location = useLocation()

  var logged: boolean = false

  if (location.state) {
      logged = location.state.logged
  }
  
  return (
    <main id="projects-page-container">
      <h1>Work in <br />progress</h1>
      <TbFaceIdError id = "icon" />
    </main>
  )
}

export default ProjectsPage