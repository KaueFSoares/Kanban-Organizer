import "./itemcard.sass"
import { AiOutlineDelete } from "react-icons/ai"

interface IitemCardProps {
    itemName: string
    itemId: number
    stageId: number
    handleOnDelete: (stageId: number, itemId: number) => void
}

function ItemCard({itemName, itemId, stageId, handleOnDelete}: IitemCardProps) {
  return (
    <div className="item-card" draggable="true">
        <h3>{itemName}</h3>
        <button onClick={() => handleOnDelete(stageId, itemId)}><AiOutlineDelete className="icon"/></button>
    </div>
  )
}

export default ItemCard