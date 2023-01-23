import "./stageform.sass"

interface IStageFormProps {
    labelText: string
    btnText: string
    projectId?: number
    handleOnClose: () => void
}

function StageForm({labelText, btnText, projectId, handleOnClose}: IStageFormProps) {
  return (
    <div id = "overlay">
        <div id = "stage-form-box">
            <header>
                <h3>{labelText}</h3>
                <button onClick={handleOnClose}><p>X</p></button>
            </header>

            <form id = "form">
                <div>
                    <label>Stage name</label>
                    <input type="text" placeholder="Insert the stage name"/>
                </div>

                <input type="submit" value={btnText} id="submit" />
            </form>
        </div>
    </div>
  )
}

export default StageForm