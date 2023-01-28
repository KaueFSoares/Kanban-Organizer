/* --- STYLES --- */
import { Outlet } from "react-router-dom"
import NavBar from "./components/layout/navbar/NavBar"
import "./styles/app.sass"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import MyContext from "./context/MyContext"
import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

interface IUser {
  logged: boolean
  id: string
  msgCounter: number
  userData: IuserData
}

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

function App() {

  const [user, setUser] = useState<IUser>({ logged: false, id: "", msgCounter: 0, userData: { id: "", userEmail: "", password: "", projects: [{ id: 0, projectName: "", summary: "", stages: [{ id: 0, stageName: "", itens: [{ id: 0, itemName: "" }] }] }] } })

  return (
    <DndProvider backend={HTML5Backend}>
      <div id="App">
        <ToastContainer />
        <NavBar />
        <MyContext.Provider value={{ user, setUser }}>
          <Outlet />
        </MyContext.Provider>
      </div>
    </DndProvider>
  )
}

export default App
