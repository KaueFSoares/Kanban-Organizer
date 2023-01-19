import "./projectcard.sass"


interface IprojectCardProps {
    projectName: string
    summary: string
    handleOnRemove: (projectId: number) => void
    projectId: number
}

function ProjectCard({ projectName, summary, handleOnRemove, projectId }: IprojectCardProps) {

    function remove(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault()

        handleOnRemove(projectId)
    }


    return (
        <div id="project-card-box">
            <header>
                <h3>{projectName}</h3>
            </header>
            <section>
                <p>{summary}</p>
            </section>
            <footer>
                <div>
                    <button>Edit</button>
                    <button onClick={remove}>Delete</button>
                </div>
                <button>Go to</button>
            </footer>
        </div>
    )
}

export default ProjectCard