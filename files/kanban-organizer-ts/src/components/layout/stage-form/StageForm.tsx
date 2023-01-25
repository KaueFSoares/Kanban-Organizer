import { useState } from "react"
import "./stageform.sass"

interface IStageFormProps {
    labelText: string
    btnText: string
    projectId: number | undefined
    handleOnClose: () => void
    createNewStage: (stageName: {stageName: string}) => void
    updateStage: (stageName: {stageName: string}, projectId: number) => void
}

function StageForm({ labelText, btnText, projectId, handleOnClose, createNewStage, updateStage }: IStageFormProps) {

    const [stageName, setStageName] = useState<{ stageName: string }>({ stageName: "" })

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStageName({ ...stageName, [e.target.name]: e.target.value })
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (projectId === undefined){
            //NEW STAGE

            createNewStage(stageName)

        } else {
            //UPDATE STAGE

            updateStage(stageName, projectId)

        }

    }

    return (
        <div id="overlay">
            <div id="stage-form-box">
                <header>
                    <h3>{labelText}</h3>
                    <button onClick={handleOnClose}><p>X</p></button>
                </header>

                <form id="form" onSubmit={submit} >
                    <div>
                        <label>Stage name</label>
                        <input type="text" name="stageName" onChange={handleOnChange} placeholder="Insert the stage name" />
                    </div>

                    <input type="submit" value={btnText} id="submit" />
                </form>
            </div>
        </div>
    )
}

export default StageForm