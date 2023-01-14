import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { BsFillKanbanFill } from "react-icons/bs"

import "./home.sass"
import SignForm from "./SignForm/SignForm"

function Home() {

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }



  return (
    <main id="home-container">
      <section id="top">
        <div id="content-box">
          {/* logo */}
          <div id="logo-container">
            <div id="iconBox">
              <p>
                <BsFillKanbanFill />
              </p>
            </div>

            <div id="textBox">
              <h1 id="text">Kanban <br />Organizer</h1>
            </div>
          </div>

          <div id = "text-box">
            <p>Streamline your workflow with <span>Kanban</span> - </p>
            <p>Organized, efficient and user-friendly.</p>
          </div>
        </div>

        <SignForm />

      </section>

      <section id="seccond-box">

      </section>

      <section id="back-to-top-box">
        <h2>Did you like it?</h2>
        <button onClick={backToTop}>Sign up!</button>
      </section>

      <footer>
        <ul id="icon-list">
          <li className="icon-box">
            <FaFacebook className="icon" />
          </li>

          <li className="icon-box">
            <FaInstagram className="icon" />
          </li>

          <li className="icon-box">
            <FaLinkedin className="icon" />
          </li>
        </ul>

        <p id="copyright">
          <span>Kanban Organizer</span> &copy; 2023
        </p> 
      </footer> 
    </main>
  )
}

export default Home