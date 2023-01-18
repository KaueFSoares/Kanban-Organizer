import "./newprojectform.sass"
import {useState} from "react"

interface INewProjectFormProps {
    handleOnClose: () => void
    btnText: string
    handleSubmit: () => void
}

interface InewProject {
    projectName: string
    summary: string
  }

function NewProjectForm({ handleOnClose, btnText, handleSubmit }: INewProjectFormProps) {

    const [project, setProject] = useState<InewProject>({projectName: "", summary: ""})

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        handleSubmit(project)
    }

    return (
        <div id="overlay">
            <div id="new-project-box">
                <header>
                    <h3>New Project</h3>
                    <button onClick={handleOnClose}><p>X</p></button>
                </header>
                <form id="form" onSubmit={submit}>
                    <div>
                        <label>Project name</label>
                        <input type="text" placeholder="Insert the project name" name="projectName" onChange={handleOnChange}/>
                    </div>

                    <div>
                        <label>Project summary</label>
                        <input type="text" placeholder="Insert the project summary" name="summary" onChange={handleOnChange}/>
                    </div>

                    <input type="submit" value = {btnText} id="submit"/>
                </form>
            </div>
        </div>
    )
}

export default NewProjectForm