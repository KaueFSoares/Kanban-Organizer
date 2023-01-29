import "./itemcard.sass"
import { AiOutlineDelete } from "react-icons/ai"
import { useDrag } from "react-dnd/dist/hooks"


interface IitemCardProps {
  itemName: string
  itemId: number
  stageId: number
  handleOnDelete: (stageId: number, itemId: number) => void
}

function ItemCard({ itemName, itemId, stageId, handleOnDelete }: IitemCardProps) {

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "item",
    item: {itemId: itemId, itemName: itemName, atualStageId: stageId},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))


  return (
    <div
      className={isDragging ? "is-dragging" : "item-card"}
      ref={dragRef}
    >
      <h3>{itemName}</h3>
      <button onClick={() => handleOnDelete(stageId, itemId)}><AiOutlineDelete className="icon" /></button>
    </div>
  )
}

export default ItemCard