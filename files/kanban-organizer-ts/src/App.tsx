/* --- STYLES --- */
import { Outlet } from "react-router-dom"
import NavBar from "./components/layout/navbar/NavBar"
import "./styles/app.sass"

function App() {

  return (
    <div id="App">
      <NavBar />
      <Outlet  />
    </div>
  )
}

export default App
