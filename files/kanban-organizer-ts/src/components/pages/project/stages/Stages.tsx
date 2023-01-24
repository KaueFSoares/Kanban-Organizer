import { useState } from 'react'


import "./stages.sass"

//interfaces
interface IstagesProps {
    stagesData: Istages[]
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

function Stages({ stagesData }: IstagesProps) {

    //SETTING THE STAGES DATA

    const [stages, setStages] = useState<Istages[]>(stagesData)

    //-------------------------


    return (
        <div id="stages-component-box">
            <div id='other-box'>
                {stages.map(
                    (stage) =>
                        <div className="single-stage-box">
                            <header>{stage.stageName}</header>
                            <section></section>
                        </div>
                )}
            </div>
        </div>
    )
}

export default Stages