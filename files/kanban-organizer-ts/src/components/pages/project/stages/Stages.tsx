import { useState } from 'react'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"


import "./stages.sass"

//interfaces
interface IstagesProps {
    stagesData: Istages[]
    handleOnEdit: (type: "new" | "update" | "close", stageData?: Istages) => void
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

function Stages({ stagesData, handleOnEdit }: IstagesProps) {

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
                                    <button><AiOutlineDelete className='icon' /></button>
                                </div>
                            </header>
                            <section>

                            </section>
                        </div>
                )}
            </div>
        </div>
    )
}

export default Stages