import "./projectcard.sass"

interface IprojectInfo {
    projectName: string
    summary: string
}

function ProjectCard(projectInfo: IprojectInfo) {
  return (
    <div id="project-card-box">
        <header>
            <h3>{projectInfo.projectName}</h3>
        </header>
        <section>
            <p>{projectInfo.summary}</p>
        </section>
        <footer>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <button>Go to</button>
        </footer>
    </div>
  )
}

export default ProjectCard