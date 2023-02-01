import "./itemcard.sass"
import { AiOutlineDelete } from "react-icons/ai"
import { useDrag } from "react-dnd/dist/hooks"
import { BsArrowDownUp, BsArrowDownShort, BsArrowUpShort } from "react-icons/bs"


interface IitemCardProps {
  itemName: string
  itemId: number
  stageId: number
  handleOnDelete: (stageId: number, itemId: number) => void
  index: number
  isLast: boolean
  biggerThanOne: boolean
  moveItemUp: (itemId: number, stageId: number, index: number) => void
  moveItemDown: (itemId: number, stageId: number, index: number) => void
}

function ItemCard({ itemName, itemId, stageId, handleOnDelete, index, isLast, biggerThanOne, moveItemUp, moveItemDown }: IitemCardProps) {

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "item",
    item: { itemId: itemId, itemName: itemName, atualStageId: stageId },
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
      {biggerThanOne &&
        <div id="up-down-buttons-box">
          <BsArrowDownUp id="icon" />
          {index !== 0 &&
            <button className="up-down-buttons" onClick={() => moveItemUp(itemId, stageId, index)}>
              <BsArrowUpShort className="mini-icon" />
            </button>
          }
          {!isLast &&
            <button className="up-down-buttons" onClick={() => moveItemDown(itemId, stageId, index)}>
              <BsArrowDownShort className="mini-icon" />
            </button>
          }
        </div>
      }
      <button onClick={() => handleOnDelete(stageId, itemId)}><AiOutlineDelete className="icon" /></button>
    </div>
  )
}

export default ItemCard