
import "./projectspage.sass"
import BackToHomeButton from "../../layout/back-to-home-button/BackToHomeButton"
import { useContext, useEffect, useState } from "react"
import MyContext from "../../../context/MyContext"
import { toast } from "react-toastify"
import { useLocation } from "react-router-dom"
import Loading from "../../layout/loading/Loading"
import NewProjectForm from "../../layout/new-project-form/NewProjectForm"

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

interface IuserData {
  id: string
  userEmail: string
  password: string
  projects: Iproject[]
}

function ProjectsPage() {

  //variable for set if the loading is visible or not (used on LOAD PROJECTS FUNCTION)
  const [removeLoading, setRemoveLoading] = useState<boolean>(false)

  //variable for set if the form for creating or editing project is visible (used on the CHANGE PROJECT FORM VISIBILITY FUNCION)
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false)

  //variable for storage all the logged user data
  var localUserData: IuserData = { id: "batata", userEmail: "", password: "", projects: [{ id: 0, projectName: "", summary: "", stages: [{ id: 0, stageName: "", itens: [{ id: 0, itemName: "" }] }] }] }


  //const [projects, setProjects] = useState<Iproject[]>([])

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

            setUser({ ...user, userData: data })




          })
          .catch(err => {
            console.log(err)
          })
      }

    }, 1000)
  }, [])


  //CHANGE PROJECT FORM VISIBILITY FUNCION
  function changeNewProjectFormVisibility(): void {

    setShowProjectForm(!showProjectForm)

    setUser({ ...user, msgCounter: (user.msgCounter + 1) })

  }


  //CREATE NEW PROJECT FUNCTION
  function createProject(project: Iproject): void {

    localUserData = user.userData

    project.id = user.userData.projects.length + 1

    localUserData.projects.push(project)

    fetch(`http://localhost:5001/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(localUserData)
    })
      .then((resp) => resp.json())
      .then(() => {
        setUser({ ...user, userData: localUserData })

        toast.success(`Projected successfully`, {
          toastId: '',
        })

        changeNewProjectFormVisibility()
      })
      .catch(err => {
        toast.error("Project criation failed due to: " + err.message)
      })

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
                  btnText="Create"
                  handleSubmit={createProject}
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