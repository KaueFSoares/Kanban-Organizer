
import "./projectspage.sass"
import BackToHomeButton from "../../layout/back-to-home-button/BackToHomeButton"
import { useContext, useEffect, useState } from "react"
import MyContext from "../../../context/MyContext"
import { toast } from "react-toastify"
import { useLocation } from "react-router-dom"
import Loading from "../../layout/loading/Loading"

function ProjectsPage() {

  const [removeLoading, setRemoveLoading] = useState<boolean>(false)

  const location = useLocation()

  var message = ""

  if (location.state) {
    message = location.state.message
  }

  const { user }: any = useContext(MyContext)

  useEffect(() => {
    setTimeout(() => {
      setRemoveLoading(true)


    }, 3000)
  }, [])

  return (
    <main id="projects-page-container">
      {user.logged ? (
        <>
          {removeLoading ? (
            <div id="container">
              {
                (message !== "" && message !== null) &&
                toast.success(`${message}`, {
                  toastId: '',
                })
              }





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