// HOOKS
import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

// STYLE
import "./project.sass"

//COMPONENTS
import MyContext from "../../../context/MyContext"
import BackToHomeButton from "../../layout/back-to-home-button/BackToHomeButton"
import Loading from "../../layout/loading/Loading"
import StageForm from "../../layout/stage-form/StageForm"
import { toast } from "react-toastify"
import Stages from "./stages/Stages"


// INTERFACES
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


function Project() {

  //GETTING THE GLOBAL USER
  const { user, setUser }: any = useContext(MyContext)

  const [userData, setUserData] = useState<IuserData>()

  var varStageId: number | undefined

  var labelText: "New project" | "Update project" = "New project"

  var btnText: "Create" | "Update" = "Create"

  var formType: "new" | "update" = "new"
  
  const [run, setRun] = useState<boolean>(true)

  //---------------------------------------//

  //GETTING THE INFO FROM THE LAST PAGE
  const location = useLocation()

  var projectId = 0
  var userId = ""

  if (location.state) {
    projectId = location.state.id
    userId = location.state.userId
  }

  //---------------------------------------//

  //LOADING AND FILTERING THE PROJECT
  const [removeLoading, setRemoveLoading] = useState<boolean>(false)

  const [project, setProject] = useState<Iproject>()

  useEffect(() => {
    setTimeout(() => {

      console.log(removeLoading)
      setRemoveLoading(true)

      if (user.logged === true && run === true) {

        setRun(false)

        fetch(`http://localhost:5001/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        })
          .then(resp => resp.json())
          .then(data => {

            //AFTER FETCH

            let localProjects = data.projects

            setProject(localProjects.find(
              (project: Iproject) => project.id === projectId
            ))

            setUserData(data)

          })
          .catch(err => toast.error("Could not load the project due to " + err))

      }

    }, 500)
  }, [userData])

  //---------------------------------------//

  //SET STAGE FORM VISIBILITY

  const [showForm, setShowForm] = useState<boolean>(false)

  function changeFormVisibility(type: "new" | "update" | "close"): void {

    if (type === "new"){
      labelText = "New project"
      btnText = "Create"
      formType = "new"
    } else {
      labelText = "Update project"
      btnText = "Update"
      formType = "update"
    }

    setShowForm(!showForm)

  }

  //---------------------------------------//

  //CREATE NEW STAGE FUNCTION

  function createNewStage(): void {

  }

  //---------------------------------------//

  //UPDATE STAGE FUNCTION

  function updateStage(): void {

  }

  //---------------------------------------//


  return (
    <div id="project-page-container">
      {user.logged ? (
        <>
          {removeLoading ? (
            <>
              {/* FORM */}
              {showForm &&
                <StageForm
                  labelText={labelText}
                  btnText={btnText}
                  projectId={varStageId}
                  handleOnClose={changeFormVisibility}
                />
              }

              {/* HERE IS THE PAGE AFTER THE LOAD */}
              <div id="container">

                <header id="project-page-header">
                  <h1>{project ? project.projectName : "No projects"}</h1>
                  <div>
                    <button onClick={() => changeFormVisibility("new")}>
                      New<br />stage
                    </button>

                    <button>
                      New<br />item
                    </button>
                  </div>
                </header>

                <div id="stages-box">
                  {project &&
                    <>
                      {project.stages.length > 0 ? (
                        <>
                          {/* PROJECTS */}
                          <Stages
                            stagesData={project.stages}
                          />
                        </>
                      ) : (
                        <>
                          <p id="nostages">No stages yet</p>
                        </>
                      )}
                    </>
                  }
                </div>
              </div>
            </>
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
    </div>
  )
}

export default Project