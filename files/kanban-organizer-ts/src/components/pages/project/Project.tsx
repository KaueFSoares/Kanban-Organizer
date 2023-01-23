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

  useEffect(() => {
    setTimeout(() => {

      setRemoveLoading(true)



    }, 500)
  }, [])

  //---------------------------------------//

  //SET STAGE FORM VISIBILITY

  const [showForm, setShowForm] = useState<boolean>(false)

  function changeFormVisibility(stageId?: number): void {

    setShowForm(!showForm)

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
                  labelText="New stage"
                  btnText="Create"
                  handleOnClose={changeFormVisibility}
                />
              }

              {/* HERE IS THE PAGE AFTER THE LOAD */}
              <div id="container">

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