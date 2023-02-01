import { useState } from 'react'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"


import "./stages.sass"
import SectionComp from './SectionComp'

//interfaces
interface IstagesProps {
    stagesData: Istages[]
    handleOnEdit: (type: "new" | "update" | "close", stageData?: Istages) => void
    handleOnDelete: (stageId: number) => void
    handleOnDeleteItem: (stageId: number, itemId: number) => void
    moveItemOverTheStages: (itemId: number, atualStageId: number, nextStageId: number) => void
    moveItemUp: (itemId: number, stageId: number, index: number) => void
    moveItemDown: (itemId: number, stageId: number, index: number) => void
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

function Stages({ stagesData, handleOnEdit, handleOnDelete, handleOnDeleteItem, moveItemOverTheStages, moveItemUp, moveItemDown }: IstagesProps) {

    //SETTING THE STAGES DATA

    const [stages, setStages] = useState<Istages[]>(stagesData)

    //-------------------------




    return (
        <div id="stages-component-box">
            <div id='other-box'>
                {stages.map(
                    (stage) =>
                        <div className="single-stage-box" key={stage.id}>
                            <header>
                                <p>{stage.stageName}</p>
                                <div>
                                    <button onClick={() => handleOnEdit("update", stage)}><AiOutlineEdit className='icon' /></button>
                                    <button onClick={() => handleOnDelete(stage.id)}><AiOutlineDelete className='icon' /></button>
                                </div>
                            </header>
                            <SectionComp
                                stageData={stage}
                                handleOnDeleteItem={handleOnDeleteItem}
                                moveItemOverTheStages={moveItemOverTheStages}
                                moveItemUp={moveItemUp}
                                moveItemDown={moveItemDown}
                            />
                        </div>
                )}
            </div>
        </div>
    )
}

export default Stages