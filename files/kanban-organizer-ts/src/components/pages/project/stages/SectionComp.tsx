import "./sectioncomp.sass"
import ItemCard from "./item-card/ItemCard"
import { useDrop } from "react-dnd/dist/hooks"

interface ISectionCompProps {
    stageData: Istages
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

function SectionComp({ stageData, handleOnDeleteItem, moveItemOverTheStages, moveItemUp, moveItemDown }: ISectionCompProps) {

    var nextStageId: number = 0

    const [, dropRef] = useDrop(() => ({
        accept: "item",

        drop: (item: { itemId: number, itemName: string, atualStageId: number }) => moveItem(item.itemId, item.atualStageId, nextStageId),

        hover() {
            nextStageId = stageData.id
        }
    }))

    function moveItem(itemId: number, atualStageId: number, nextStageId: number) {
        moveItemOverTheStages(itemId, atualStageId, nextStageId)

    }

    return (
        <section id="SectionComp" ref={dropRef}>
            {stageData.itens.length > 0 ? (
                <>
                    {stageData.itens.map(
                        (item, index) => <ItemCard
                            itemId={item.id}
                            itemName={item.itemName}
                            stageId={stageData.id}
                            handleOnDelete={handleOnDeleteItem}
                            key={item.id}
                            index={index}
                            isLast={index === stageData.itens.length - 1 ? true : false}
                            biggerThanOne={stageData.itens.length > 1 ? true : false}
                            moveItemUp={moveItemUp}
                            moveItemDown={moveItemDown}
                        />
                    )}
                </>
            ) : (
                <p id="ppp">No itens yet</p>
            )}</section>
    )
}

export default SectionComp