/* --- STYLES --- */
import { Outlet } from "react-router-dom"
import NavBar from "./components/layout/navbar/NavBar"
import "./styles/app.sass"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import MyContext from "./context/MyContext"
import { useState } from "react"

interface IUser {
  logged: boolean
  name: string
  id: string
}

function App() {

  const [user, setUser] = useState<IUser>({logged: false, name: "", id: ""})

  return (
    <div id="App">
      <ToastContainer />
      <NavBar />
      <MyContext.Provider value = {{user, setUser}}>
        <Outlet />
      </MyContext.Provider>
    </div>
  )
}

export default App
