
import "./projectspage.sass"
import BackToHomeButton from "../../layout/back-to-home-button/BackToHomeButton"
import { useContext } from "react"
import MyContext from "../../../context/MyContext"
import { toast } from "react-toastify"

function ProjectsPage() {

  const {user}: any = useContext(MyContext)

  return (
    <main id="projects-page-container">
      {user.logged ? (
        <div>
          {toast.success(`Hello, ${user.id}!`, {
            toastId: '',
          })}
        </div>
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