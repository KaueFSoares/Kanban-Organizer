import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Home from "./components/pages/Home"
import Contact from "./components/pages/Contact"
import Calendar from "./components/pages/Calendar"
import ProjectsPage from "./components/pages/ProjectsPage"




import "./styles/app.sass"

import "./styles/app.sass"

function App() {
  return (
    <div id = "App">
        <Router>
          
          {/* navbar */}

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
