import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"

import "./home.sass"
import SignForm from "./SignForm/SignForm"

function Home() {




  return (
    <main id="home-container">
      <section id="top">
        <div id="content-box">

        </div>

        <SignForm />

      </section>

      <section id="seccond-box">

      </section>

      <section id="back-to-top-box">

      </section>

      <footer>
        <ul id = "icon-list">
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