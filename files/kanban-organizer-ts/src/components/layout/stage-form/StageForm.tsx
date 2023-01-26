import { useState } from "react"
import "./stageform.sass"

interface IStageFormProps {
    labelText: string
    btnText: string
    stageData: Istages | undefined
    type: "new" | "update"
    handleOnClose: (type: "new" | "update" | "close") => void
    createNewStage: (stage: Istages) => void
    updateStage: (stage: Istages) => void
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

function StageForm({ labelText, btnText, stageData, type, handleOnClose, createNewStage, updateStage }: IStageFormProps) {

    var stage: Istages = { id: 0, stageName: "", itens: [] }

    const [stageName, setStageName] = useState<{ stageName: string }>({ stageName: "" })

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStageName({ ...stageName, [e.target.name]: e.target.value })
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (type === "new") {
            //IF THE FORM IS FOR A NEW PROJECT

            stage.id = Math.random()
            stage.stageName = stageName.stageName
            stage.itens = []

            createNewStage(stage)

        } else {
            //IF THE FORM IS FOR UPDATING A PROJECT

            if (stageData) {
                stage = stageData
                stage.stageName = stageName.stageName

                updateStage(stage)
            }

        }

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