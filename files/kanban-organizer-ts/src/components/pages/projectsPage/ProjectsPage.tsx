
import "./projectspage.sass"
import BackToHomeButton from "../../layout/back-to-home-button/BackToHomeButton"
import { useContext, useEffect, useState } from "react"
import MyContext from "../../../context/MyContext"
import { toast } from "react-toastify"
import { useLocation } from "react-router-dom"
import Loading from "../../layout/loading/Loading"
import NewProjectForm from "../../layout/new-project-form/NewProjectForm"

interface Iprojects {
  id: number
  projectName: string
  summary: string
}

interface InewProject {
  projectName: string
  summary: string
}

function ProjectsPage() {

  const [removeLoading, setRemoveLoading] = useState<boolean>(false)
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false)

  var allProjects = []

  const [projects, setProjects] = useState<Iprojects[]>([])

  var run: boolean = false

  const location = useLocation()

  var message = ""

  if (location.state) {
    message = location.state.message
  }

  const { user, setUser }: any = useContext(MyContext) // chega "logado" e ID




  //LOAD PROJECTS FUNCTION
  useEffect(() => {
    setTimeout(() => {
      setRemoveLoading(true)

      if (run === false) {
        run = true
        // where the get request begins

        fetch(`http://localhost:5001/users/${user.id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        })
          .then(resp => resp.json())
          .then(data => {

            // after fetch


            allProjects = data.projects


            console.log(allProjects)


          })
          .catch(err => {
            console.log(err)
          })
      }

    }, 1000)
  }, [])


  //CHANGE NEW PROJECT FORM VISIBILITY FUNCION
  function changeNewProjectFormVisibility(): void {

    setShowProjectForm(!showProjectForm)

    setUser({logged: user.logged, name: user.name, msgCounter: (user.msgCounter + 1)})

  }


  //CREATE NEW PROJECT FUNCTION
  function createProject(project: InewProject): void{
    console.log(project)
  }

  return (
    <main id="projects-page-container">
      {user.logged ? (
        <>
          {removeLoading ? (
            <div id="container">
              {/* MESSAGES */}
              {
                (message !== "" && message !== null && user.msgCounter === 0) &&
                toast.success(`${message}`, {
                  toastId: '',
                })
              }


              {/* FORMS */}
              {
                showProjectForm &&
                <NewProjectForm 
                  handleOnClose={changeNewProjectFormVisibility}
                  btnText = "Create"
                  handleSubmit = {createProject}
                />
              }



              {/* PAGE */}
              <header id="projects-page-header">
                <h1>Projects</h1>
                <button onClick={changeNewProjectFormVisibility}>
                  New <br /> Project
                </button>
              </header>

              <section id="projects-page-body">

              </section>



            </div>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <div id="back-to-home-box">
          <h1>You are not <span>logged in!</span></h1>
          <p>Please log in to acess your projects!</p>
          <BackToHomeButton />
        </div>
      )}
    </main>
  )
}

export default ProjectsPage