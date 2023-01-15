import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { BsFillKanbanFill } from "react-icons/bs"
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import ERRORIMG from "../../../img/error-img.jpeg"

import "./home.sass"
import SignForm from "./SignForm/SignForm"

function Home() {

  const imgPath: string = "../../../img/error-img.jpeg"

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function backToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }



  return (
    <main id="home-container">

      {/* ----- FIRST SECTION ----- */}
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

          <div id="text-box">
            <p>Streamline your workflow with <span>Kanban</span> - </p>
            <p>Organized, efficient and user-friendly.</p>
          </div>
        </div>

        <SignForm />

      </section>



      {/* ----- SECCOND SECTION ----- */}
      <section id="seccond-box">

        <div id="first-content">
          <div id="img-box">
            <img src={ERRORIMG} alt="features" />
          </div>

          <div id="text">
            <h3>Creating-boards</h3>
            <ul>
              <li>Make your <span>own Kanban</span> Boards</li>
              <li>Make as much work states as <span>you want</span></li>
              <li>Set <span>coworkers</span> to work in your board</li>
            </ul>
          </div>
        </div>


        <div id="seccond-content">
          <div id="text">
            <h3>Projects</h3>
            <ul>
              <li>Make your as many tables <span>as you want</span></li>
              <li><span>Drag and drop</span> cards into the tables</li>
              <li>Set a <span>limit of works</span> in progress</li>
            </ul>
          </div>

          <div id="img-box">
            <img src={ERRORIMG} alt="features" />
          </div>
        </div>

        <div id="third-content">
          <div id="img-box">
            <img src = {ERRORIMG} alt="features" />
          </div>

          <div id="text">
            <h3>Calendar</h3>
            <ul>
              <li>Make your <span>own Calendar</span></li>
              <li>Save all the appointments <span>you need</span></li>
              <li><span>Share you calendar</span> with the team</li>
            </ul>
          </div>
        </div>

      </section>



      {/* ----- BACK TO TOP SECTION ----- */}
      <section id="back-to-top-box">
        <h2>Did you like it?</h2>
        <button onClick={backToTop}>Sign up!</button>
      </section>



      {/* ----- FOOTER ----- */}
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

      <div id="back-to-buttons">
        <button id="to-top-button" className="btn" onClick={backToTop}>
          <AiOutlineArrowUp className="icon" />
        </button>

        <button id="to-bottom-button" className="btn" onClick={backToBottom}>
          <AiOutlineArrowDown className="icon" />
        </button>
      </div>
    </main>
  )
}

export default Home