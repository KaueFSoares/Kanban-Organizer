
import "./projectspage.sass"
import BackToHomeButton from "../../layout/back-to-home-button/BackToHomeButton"
import { useContext, useEffect, useState } from "react"
import MyContext from "../../../context/MyContext"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"
import Loading from "../../layout/loading/Loading"
import NewProjectForm from "../../layout/new-project-form/NewProjectForm"
import ProjectCard from "./project-card/ProjectCard"

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

  const [btnText, setBtnText] = useState<string>("Create")

  const [labelText, setLabelText] = useState<string>("New project")

  const [updateProjectId, setUpdateProjectId] = useState<number | undefined>(undefined)

  const [projects, setProjects] = useState<Iproject[]>([])

  const [run, setRun] = useState<boolean>(false)

  const location = useLocation()

  var message = ""

  if (location.state) {
    message = location.state.message
  }

  const { user, setUser }: any = useContext(MyContext) // chega "logado" e ID

  const navigate = useNavigate()


  //LOAD PROJECTS FUNCTION
  useEffect(() => {
    setTimeout(() => {
      setRemoveLoading(true)

      if (!run && user.logged === true) {
        setRun(true)
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

            setUser({ ...user, userData: data, logged: true })
            setProjects(data.projects)
            localUserData = data


          })
          .catch(err => {
            console.log(err)
          })
      }

    }, 500)
  }, [user]) /* SE BOTAR USER AQUI FUNCIONA MAS FICA EM LOOP INFINITO */


  //CHANGE PROJECT FORM VISIBILITY FUNCION
  function changeProjectFormVisibility(projectId?: number): void {

    if (projectId === undefined) {
      setShowProjectForm(!showProjectForm)

      setUser({ ...user, msgCounter: (user.msgCounter + 1) })

      setBtnText("Create")

      setLabelText("New project")
    } else {
      setShowProjectForm(!showProjectForm)

      setUser({ ...user, msgCounter: (user.msgCounter + 1) }) // aqui o stages ainda est?? salvo

      setBtnText("Update")

      setLabelText("Edit project")

      setUpdateProjectId(projectId)
    }

  }


  //CREATE AND UPDATE PROJECT FUNCTION
  function createProject(project: Iproject, isNew: boolean, projectId?: number): void {

    localUserData = user.userData

    if (isNew === true) {
      project.id = Math.random()
      project.stages = []

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

          toast.success(`Project created successfully`, {
            toastId: '',
          })

          changeProjectFormVisibility()
        })
        .catch(err => {
          toast.error("Project criation failed due to: " + err.message)
        })
    } else {

      //UPDATE FETCH

      project.id = projectId || 0

      let localProject = project

      localUserData = user.userData

      localUserData.projects = localUserData.projects.map((project: Iproject) => {

        if (project.id === projectId) {
          return { ...project, id: localProject.id, projectName: localProject.projectName, summary: localProject.summary, stages: localProject.stages }
        }

        return project
      })

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

          toast.success(`Project updated successfully!`, {
            toastId: '',
          })

          setRun(false)
          setRemoveLoading(false)

          changeProjectFormVisibility()
        })
        .catch(err => {
          toast.error("Project update failed due to: " + err.message)
        })

    }

  }

  //REMOVE PROJECT FUNCTION
  function removeProject(projectId: number): void {

    user.userData.projects = user.userData.projects.filter(
      (project: Iproject) => project.id !== projectId
    )

    localUserData = user.userData

    fetch(`http://localhost:5001/users/${user.userData.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(localUserData)
    })
      .then((resp) => resp.json())
      .then(() => {
        toast.success(`Project removed successfully`, {
          toastId: '',
        })
      })
      .catch(err => {
        toast.error("Project criation failed due to: " + err.message)
      })

    setProjects(localUserData.projects)
  }


  //GO TO PROJECT FUNCTION

  function goToProject(projectId: number): void {

    navigate("/project", { state: { id: projectId, userId: user.id } })

  }



  //PAGE
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


              {/* FORM */}
              {
                showProjectForm &&
                <NewProjectForm
                  projectId={updateProjectId}
                  labelText={labelText}
                  handleOnClose={changeProjectFormVisibility}
                  btnText={btnText}
                  handleSubmit={createProject}
                />
              }



              {/* PAGE */}
              <header id="projects-page-header">
                <h1>Projects</h1>
                <button onClick={() => changeProjectFormVisibility()}>
                  New<br /> Project
                </button>
              </header>

              <section id="projects-page-body">

                {
                  projects &&
                    projects.length > 0 ? (
                    projects.map((project) => (
                      <ProjectCard
                        projectName={project.projectName}
                        summary={project.summary}
                        key={project.id}
                        handleOnRemove={removeProject}
                        projectId={project.id}
                        handleOnEdit={changeProjectFormVisibility}
                        handleOnGoTo={goToProject}
                      />
                    ))
                  ) : (
                    <><p id="noprojects">No projects yet</p></>
                  )

                }

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