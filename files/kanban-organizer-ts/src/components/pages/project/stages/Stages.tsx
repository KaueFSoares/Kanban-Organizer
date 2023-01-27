import { useState } from 'react'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"


import "./stages.sass"
import ItemCard from './item-card/ItemCard'

//interfaces
interface IstagesProps {
    stagesData: Istages[]
    handleOnEdit: (type: "new" | "update" | "close", stageData?: Istages) => void
    handleOnDelete: (stageId: number) => void
    handleOnDeleteItem: (stageId: number, itemId: number) => void
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

function Stages({ stagesData, handleOnEdit, handleOnDelete, handleOnDeleteItem }: IstagesProps) {

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
                            <section>
                                {stage.itens.length > 0 ? (
                                    <>
                                        {stage.itens.map(
                                            (item) => <ItemCard itemId={item.id} itemName={item.itemName} stageId={stage.id} handleOnDelete={handleOnDeleteItem} key={item.id}/>
                                        )}
                                    </>
                                ) : (
                                    <p id="ppp">No itens yet</p>
                                )}
                            </section>
                        </div>
                )}
            </div>
        </div>
    )
}

export default Stages