import "./sectioncomp.sass"
import ItemCard from "./item-card/ItemCard"
import { useDrop } from "react-dnd/dist/hooks"
import { useState } from "react"

interface ISectionCompProps {
    stageData: Istages
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

function SectionComp({ stageData, handleOnDeleteItem }: ISectionCompProps) {

    var nextStageId: number = 0

    const [, dropRef] = useDrop(() => ({
        accept: "item",

        drop: (item: { itemId: number, itemName: string, atualStageId: number }) => moveItem(item.itemId, item.itemName, item.atualStageId, nextStageId),

        hover() {
            nextStageId = stageData.id
        }
    }))

    function moveItem(itemId: number, itemName: string, atualStageId: number, nextStageId: number) {
        if (atualStageId !== nextStageId) {
            // aqui vai o código pra fazer o fetch
        }
    }

    return (
        <section id="SectionComp" ref={dropRef}>
            {stageData.itens.length > 0 ? (
                <>
                    {stageData.itens.map(
                        (item) => <ItemCard itemId={item.id} itemName={item.itemName} stageId={stageData.id} handleOnDelete={handleOnDeleteItem} key={item.id} />
                    )}
                </>
            ) : (
                <p id="ppp">No itens yet</p>
            )}</section>
    )
}

export default SectionComp