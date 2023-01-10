import { Link } from "react-router-dom"
import { AiOutlineHome, AiOutlinePhone, AiOutlineCalendar, AiOutlineProject } from "react-icons/ai"
import { BsFillKanbanFill } from "react-icons/bs"

import "./navbar.sass"


function NavBar() { 
    return (
        <aside id="aside"> 
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

            <nav>
                <ul id="button-list">
                    <li className="buttons">
                        <Link className="link" to="/">
                            <AiOutlineHome className="btn-icon"/>
                            <p>Home</p>
                        </Link>
                    </li>

                    <li className="buttons">
                        <Link className="link" to="/projects">
                            <AiOutlineProject className="btn-icon"/>
                            <p>Projects</p>
                        </Link>
                    </li>

                    <li className="buttons">
                        <Link className="link" to="/calendar">
                            <AiOutlineCalendar className="btn-icon"/>
                            <p>Calendar</p>
                        </Link>
                    </li>

                    <li className="buttons">
                        <Link className="link" to="/contact">
                            <AiOutlinePhone className="btn-icon"/>
                            <p>Contact</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default NavBar