// HOOKS
import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

// STYLE
import "./project.sass"

//COMPONENTS
import MyContext from "../../../context/MyContext"
import BackToHomeButton from "../../layout/back-to-home-button/BackToHomeButton"
import Loading from "../../layout/loading/Loading"
import StageForm from "../../layout/stage-form/StageForm"
import Stages from "./stages/Stages"
import ItemForm from "../../layout/item-form/ItemForm"


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

  //GETTING THE GLOBAL USER AND OTHER VARIABLES
  const { user }: any = useContext(MyContext)

  const [userData, setUserData] = useState<IuserData>()

  const [labelText, setLabelText] = useState<"New project" | "Update project">("New project")

  const [btnText, setBtnText] = useState<"Create" | "Update">("Create")

  const [formType, setFormType] = useState<"new" | "update">("new")

  const [stageOnEdit, setStageOnEdit] = useState<Istages>()

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

  }, [run])

  //---------------------------------------//

  //SET STAGE FORM VISIBILITY

  const [showForm, setShowForm] = useState<boolean>(false)

  function changeFormVisibility(type: "new" | "update" | "close", stageData?: Istages): void {

    if (type === "new") {
      setLabelText("New project")
      setBtnText("Create")
      setFormType("new")
    } else {
      setLabelText("Update project")
      setBtnText("Update")
      setFormType("update")
      setStageOnEdit(stageData)
    }

    setShowForm(!showForm)

  }

  //---------------------------------------//

  //CREATE NEW STAGE FUNCTION

  function createNewStage(stage: Istages): void {

    if (project && userData) {
      let localUserData: IuserData = userData

      let localProject: Iproject = project

      localUserData.projects = localUserData?.projects.filter(
        (filterProject) => filterProject.id !== localProject?.id
      )

      localProject?.stages.push(stage)


      localUserData?.projects.push(localProject)

      fetch(`http://localhost:5001/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(localUserData)
      })
        .then((resp) => resp.json())
        .then(() => {

          toast.success(`Stage created successfully!`, {
            toastId: '',
          })

          setRemoveLoading(false)
          setRun(true)

          changeFormVisibility("close")

        })
        .catch(err => {
          toast.error("Stage creation failed due to: " + err.message)
        })
    }

  }

  //---------------------------------------//

  //UPDATE STAGE FUNCTION

  function updateStage(stageData: Istages): void {

    if (project && userData) {

      let localProject: Iproject = project
      let localUserData: IuserData = userData
      let localStages: Istages[] = project.stages



      localStages = localStages.map((stage) => {
        if (stage.id === stageData.id) {
          return { ...stage, stageName: stageData.stageName, itens: stageData.itens }
        }
        return stage
      })

      localProject.stages = localStages

      localUserData.projects = localUserData.projects.map((project) => {

        if (project.id === localProject.id) {
          return { ...project, id: localProject.id, projectName: localProject.projectName, summary: localProject.summary, stages: localProject.stages }
        }

        return project
      })

      fetch(`http://localhost:5001/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(localUserData)
      })
        .then((resp) => resp.json())
        .then(() => {

          toast.success(`Stage updated successfully!`, {
            toastId: '',
          })

          setRemoveLoading(false)
          setRun(true)

          changeFormVisibility("close")

        })
        .catch(err => {
          toast.error("Stage update failed due to: " + err.message)
        })

    }

  }

  //---------------------------------------//

  //DELETE STAGE FUNCTION

  function deleteStage(stageId: number): void {

    if (project && userData) {

      let localProject: Iproject = project
      let localUserData: IuserData = userData

      localProject.stages = localProject.stages.filter(
        (stage: Istages) => stage.id !== stageId
      )

      localUserData.projects = localUserData.projects.map((project) => {

        if (project.id === localProject.id) {
          return { ...project, id: localProject.id, projectName: localProject.projectName, summary: localProject.summary, stages: localProject.stages }
        }

        return project
      })

      fetch(`http://localhost:5001/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(localUserData)
      })
        .then((resp) => resp.json())
        .then(() => {

          toast.success(`Stage deleted successfully!`, {
            toastId: '',
          })

          setRemoveLoading(false)
          setRun(true)

        })
        .catch(err => {
          toast.error("Stage delete failed due to: " + err.message)
        })

    }

  }

  //---------------------------------------//

  //SHOW ITEM FORM FUNCTION

  const [showItemForm, setShowItemForm] = useState<boolean>(false)
  function changeItemFormVisibility() {
    setShowItemForm(!showItemForm)
  }

  //---------------------------------------//

  //CREATE ITEM FUNCTION

  function createItem(item: Iitens) {
    if (project && userData) {

      let localUserData = userData
      let localProject = project
      let localStage = localProject.stages[0]

      localStage.itens.push(item)

      localProject.stages[0] = localStage

      localUserData.projects.map((project) => {

        if (project.id === localProject.id) {
          return { ...project, id: localProject.id, projectName: localProject.projectName, summary: localProject.summary, stages: localProject.stages }
        }

        return project
      })

      fetch(`http://localhost:5001/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(localUserData)
      })
        .then((resp) => resp.json())
        .then(() => {

          toast.success(`Item created successfully!`, {
            toastId: '',
          })

          setRemoveLoading(false)
          setRun(true)

          changeItemFormVisibility()

        })
        .catch(err => {
          toast.error("Item creation failed due to: " + err.message)
        })

    }
  }

  //---------------------------------------//

  //DELETE ITEM FUNCTION

  function deleteItem(stageId: number, itemId: number) {
    if (project && userData) {
      let localUserData = userData
      let localProject = project
      let localStage: Istages | undefined = localProject.stages.find(
        (stage: Istages) => stage.id === stageId
      )

      if (localStage) {

        localStage.itens = localStage.itens.filter(
          (item: Iitens) => item.id !== itemId
        )

        localProject.stages.map((stage: Istages) => {

          if (stage.id === stageId) {
            return { ...stage, stageName: localStage?.stageName, id: localStage?.id, itens: localStage?.itens }
          }

          return stage
        })

        localUserData.projects.map((project) => {

          if (project.id === localProject.id) {
            return { ...project, id: localProject.id, projectName: localProject.projectName, summary: localProject.summary, stages: localProject.stages }
          }

          return project
        })

        fetch(`http://localhost:5001/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(localUserData)
        })
          .then((resp) => resp.json())
          .then(() => {

            toast.success(`Item deleted successfully!`, {
              toastId: '',
            })

            setRemoveLoading(false)
            setRun(true)

          })
          .catch(err => {
            toast.error("Item delete failed due to: " + err.message)
          })

      }

    }
  }

  //---------------------------------------//

  //MOVING ITEM BY THE STAGES FUNCTION

  function moveItemOverTheStages(itemId: number, atualStageId: number, nextStageId: number): void {

    if (project && userData) {

      let localUserData: IuserData = userData
      let localProject: Iproject = project
      let itemOnChange: Iitens | undefined
      let atualStage: Istages | undefined = localProject.stages.find(
        (stage: Istages) => stage.id === atualStageId
      )
      let nextStage: Istages | undefined = localProject.stages.find(
        (stage: Istages) => stage.id === nextStageId
      )

      if (atualStage !== undefined && nextStage !== undefined) {

        itemOnChange = atualStage.itens.find(
          (item: Iitens) => item.id === itemId
        )

        if (itemOnChange !== undefined) {

          atualStage.itens = atualStage.itens.filter(
            (item: Iitens) => item.id !== itemId
          )

          nextStage.itens.push(itemOnChange)

          if (atualStage && nextStage) {

            localProject.stages = localProject.stages.map((stage: Istages) => {

              if (stage.id === atualStageId) {
                return { ...stage, id: atualStage!.id, stageName: atualStage!.stageName, itens: atualStage!.itens }
              }

              if (stage.id === nextStageId) {
                return { ...stage, id: nextStage!.id, stageName: nextStage!.stageName, itens: nextStage!.itens }
              }

              return stage
            })

            localUserData.projects.map((project) => {

              if (project.id === localProject.id) {
                return { ...project, id: localProject.id, projectName: localProject.projectName, summary: localProject.summary, stages: localProject.stages }
              }

              return project
            })

            fetch(`http://localhost:5001/users/${userId}`, {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(localUserData)
            })
              .then((resp) => resp.json())
              .then(() => {

                setUserData(localUserData)
                setProject(localProject)

                setRemoveLoading(false)
                setRun(true)

              })
              .catch(err => {
                toast.error("Item moving failed due to: " + err.message)
              })

          }

        }

      }

    }

  }

  //---------------------------------------//

  //MOVE ITEM UP FUNCTION

  function moveItemUp(itemId: number, stageId: number, index: number): void {
    if (project && userData) {

      let localUserData: IuserData = userData
      let localProject: Iproject = project
      let localStage: Istages | undefined = localProject.stages.find(
        (stage: Istages) => stage.id === stageId
      )

      if (localStage !== undefined) {

        let itemOnChange = localStage.itens.find(
          (item: Iitens) => item.id === itemId
        )

        localStage.itens = localStage.itens.filter(
          (item: Iitens) => item.id !== itemId
        )

        localStage.itens.splice(index - 1, 0, itemOnChange!)

        localProject.stages = localProject.stages.map((stage: Istages) => {

          if (stage.id === localStage!.id) {
            return { ...stage, id: localStage!.id, stageName: localStage!.stageName, itens: localStage!.itens }
          }

          return stage
        })

        localUserData.projects.map((project) => {

          if (project.id === localProject.id) {
            return { ...project, id: localProject.id, projectName: localProject.projectName, summary: localProject.summary, stages: localProject.stages }
          }

          return project
        })

        fetch(`http://localhost:5001/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(localUserData)
        })
          .then((resp) => resp.json())
          .then(() => {

            setUserData(localUserData)
            setProject(localProject)

            setRemoveLoading(false)
            setRun(true)

          })
          .catch(err => {
            toast.error("Item moving failed due to: " + err.message)
          })
      }
    }
  }

  //---------------------------------------//

  //MOVE ITEM DOWN FUNCTION

  function moveItemDown(itemId: number, stageId: number, index: number): void {
    if (project && userData) {

      let localUserData: IuserData = userData
      let localProject: Iproject = project
      let localStage: Istages | undefined = localProject.stages.find(
        (stage: Istages) => stage.id === stageId
      )

      if (localStage !== undefined) {

        let itemOnChange = localStage.itens.find(
          (item: Iitens) => item.id === itemId
        )

        localStage.itens = localStage.itens.filter(
          (item: Iitens) => item.id !== itemId
        )

        localStage.itens.splice(index + 1, 0, itemOnChange!)

        localProject.stages = localProject.stages.map((stage: Istages) => {

          if (stage.id === localStage!.id) {
            return { ...stage, id: localStage!.id, stageName: localStage!.stageName, itens: localStage!.itens }
          }

          return stage
        })

        localUserData.projects.map((project) => {

          if (project.id === localProject.id) {
            return { ...project, id: localProject.id, projectName: localProject.projectName, summary: localProject.summary, stages: localProject.stages }
          }

          return project
        })

        fetch(`http://localhost:5001/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(localUserData)
        })
          .then((resp) => resp.json())
          .then(() => {

            setUserData(localUserData)
            setProject(localProject)

            setRemoveLoading(false)
            setRun(true)

          })
          .catch(err => {
            toast.error("Item moving failed due to: " + err.message)
          })
      }
    }
  }
  //---------------------------------------//

  // ----- THE PAGE -----
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
                  stageData={stageOnEdit}
                  type={formType}
                  handleOnClose={changeFormVisibility}
                  createNewStage={createNewStage}
                  updateStage={updateStage}
                />
              }

              {showItemForm &&
                <ItemForm
                  handleOnClose={changeItemFormVisibility}
                  handleOnSubmit={createItem}
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

                    <button onClick={() => changeItemFormVisibility()}>
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
                            handleOnEdit={changeFormVisibility}
                            handleOnDelete={deleteStage}
                            handleOnDeleteItem={deleteItem}
                            moveItemOverTheStages={moveItemOverTheStages}
                            moveItemUp={moveItemUp}
                            moveItemDown={moveItemDown}
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