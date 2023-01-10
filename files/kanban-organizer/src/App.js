/* --- HOOKS --- */
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


/* --- PAGES --- */
import Home from "./components/pages/home/Home"
import Contact from "./components/pages/contact/Contact"
import Calendar from "./components/pages/calendar/Calendar"
import ProjectsPage from "./components/pages/projectsPage/ProjectsPage"


/* --- COMPONENTS --- */
import NavBar from "./components/layout/navbar/NavBar"


/* --- STYLES --- */
import "./styles/app.sass"



function App() {
  return (
    <div id = "App">
        <Router>
          
          <NavBar />

          <Routes>

            <Route path = "/" element = {<Home />} />

            <Route path = "/projects" element = {<ProjectsPage />} />

            <Route path = "/contact" element = {<Contact />} />

            <Route path = "/calendar" element = {<Calendar />} />

          </Routes>

          {/* footer */}


        </Router>
    </div>
  );
}

export default App;
