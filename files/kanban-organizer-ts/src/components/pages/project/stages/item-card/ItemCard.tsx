import "./itemcard.sass"
import { AiOutlineDelete } from "react-icons/ai"

interface IitemCardProps {
    itemName: string
}

function ItemCard({itemName}: IitemCardProps) {
  return (
    <div id="item-card" draggable="true">
        <h3>{itemName}</h3>
        <button><AiOutlineDelete id="icon"/></button>
    </div>
  )
}

export default ItemCard