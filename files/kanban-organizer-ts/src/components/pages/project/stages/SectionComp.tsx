import "./sectioncomp.sass"
import ItemCard from "./item-card/ItemCard"
import { useDrop } from "react-dnd/dist/hooks"

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

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: "item",
        drop: (item: { id: number }) => addItem(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }))

    const addItem = (id: number) => {
        console.log("id")
    }

    return (
        <section id="SectionComp"  ref={dropRef}>
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