import "./logo.sass"
import { BsFillKanbanFill } from "react-icons/bs"


function Logo() {
  return (
    <div id="main">
      <div id="iconBox">
        <p>
          <BsFillKanbanFill />
        </p>
      </div>

      <div id="textBox">
        <h1 id="text">Kanban <br />Organizer</h1>
      </div>
    </div>
  )
}

export default Logo