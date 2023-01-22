import "./projectcard.sass"


interface IprojectCardProps {
    projectName: string
    summary: string
    handleOnRemove: (projectId: number) => void
    projectId: number
    handleOnEdit: (projectId: number) => void
    handleOnGoTo: (projectId: number) => void
}

function ProjectCard({ projectName, summary, handleOnRemove, projectId, handleOnEdit, handleOnGoTo }: IprojectCardProps) {

    function remove(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault()

        handleOnRemove(projectId)
    }


    return (
        <div id="project-card-box">
            <header>
                <h3>{projectName}</h3>
            </header>
            <section id = "projectcardsection">
                <p id = "batata">{summary}</p>
            </section>
            <footer>
                <div>
                    <button onClick={() => handleOnEdit(projectId)}>Edit</button>
                    <button onClick={remove}>Delete</button>
                </div>
                <button onClick={() => handleOnGoTo(projectId)}>Go to</button>
            </footer>
        </div>
    )
}

export default ProjectCard