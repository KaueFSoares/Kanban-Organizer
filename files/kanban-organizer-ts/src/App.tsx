/* --- STYLES --- */
import { Outlet } from "react-router-dom"
import NavBar from "./components/layout/navbar/NavBar"
import "./styles/app.sass"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <div id="App">
      <ToastContainer />
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App
