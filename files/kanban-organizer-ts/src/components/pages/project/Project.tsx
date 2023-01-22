import { useLocation } from "react-router-dom"

import {useEffect} from "react"

import "./project.sass"

function Project() {

  const location = useLocation()

  var projectId = 0
  var userId = ""

  if (location.state){
    projectId = location.state.id
    userId = location.state.userId
  }
  
  

  return (
    <div id = "project-page-container">
      
    </div>
  )
}

export default Project