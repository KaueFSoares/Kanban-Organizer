import { toast } from "react-toastify"
import "./newprojectform.sass"
import { useState } from "react"

interface INewProjectFormProps {
    handleOnClose: () => void
    btnText: string
    handleSubmit: (project: Iproject, isNew: boolean, projectId?: number) => void
    labelText: string
    projectId: number | undefined
}

interface Iproject {
    id: number
    projectName: string
    summary: string
    stages: Istages[]
}


interface Istages {
    id: number
    stageName: string
    itens: Iitens[]
}

interface Iitens {
    id: number
    itemName: string
}

function NewProjectForm({ handleOnClose, btnText, handleSubmit, labelText, projectId }: INewProjectFormProps) {

    const [project, setProject] = useState<Iproject>({ id: 0, projectName: "", summary: "", stages: [] })

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (project.projectName !== "" && project.projectName !== null && project.summary !== "" && project.summary !== null) {
            if (labelText === "New project"){
                handleSubmit(project, true) 
            } else {
                handleSubmit(project, false, projectId) 
            }
        } else {
            toast.warn("Please fill out all fields before proceeding!")
        }


    }

    return (
        <div id="overlay">
            <div id="new-project-box">
                <header>
                    <h3>{labelText}</h3>
                    <button onClick={handleOnClose}><p>X</p></button>
                </header>
                <form id="form" onSubmit={submit}>
                    <div>
                        <label>Project name</label>
                        <input type="text" placeholder="Insert the project name" name="projectName" onChange={handleOnChange} />
                    </div>

                    <div>
                        <label>Project summary</label>
                        <input type="text" placeholder="Insert the project summary" name="summary" onChange={handleOnChange} />
                    </div>

                    <input type="submit" value={btnText} id="submit" />
                </form>
            </div>
        </div>
    )
}

export default NewProjectForm