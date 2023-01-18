import "./newprojectform.sass"

interface INewProjectFormProps {
    handleOnClose: () => void;
}

function NewProjectForm({handleOnClose}: INewProjectFormProps) {
    return (
        <div id="overlay">
            <div id="new-project-box">
                <header>
                    <h3>New Project</h3>
                    <button onClick={handleOnClose}><p>X</p></button>
                </header>
                <form id="form">NewProjectForm</form>
            </div>
        </div>
    )
}

export default NewProjectForm