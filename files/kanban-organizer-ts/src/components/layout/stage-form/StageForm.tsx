import { useState } from "react"
import "./stageform.sass"

interface IStageFormProps {
    labelText: string
    btnText: string
    projectId: number | undefined
    handleOnClose: (type: "new" | "update" | "close") => void
}

function StageForm({ labelText, btnText, projectId, handleOnClose }: IStageFormProps) {

    const [stageName, setStageName] = useState<{ stageName: string }>({ stageName: "" })

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStageName({ ...stageName, [e.target.name]: e.target.value })
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        

    }

    return (
        <div id="overlay">
            <div id="stage-form-box">
                <header>
                    <h3>{labelText}</h3>
                    <button onClick={() => handleOnClose("close")}><p>X</p></button>
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