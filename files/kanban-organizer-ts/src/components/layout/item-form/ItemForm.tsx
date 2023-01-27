import "./itemform.sass"
import { useState } from "react"

interface IitemFormProps {
    handleOnClose: () => void
    handleOnSubmit: (item: Iitens) => void
}

interface Iitens {
    id: number
    itemName: string
}

function ItemForm({ handleOnClose, handleOnSubmit }: IitemFormProps) {

    const [itemName, setItemName] = useState<{itemName: string}>({itemName: ""})
    var item: Iitens = {id: 0, itemName: ""}

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setItemName({ ...itemName, [e.target.name]: e.target.value })
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        item.id = Math.random()
        item.itemName = itemName.itemName

        handleOnSubmit(item)
    }



    return (
        <div id="overlay">
            <div id="item-form-box">
                <header>
                    <h3>New item</h3>
                    <button onClick={() => handleOnClose()}><p>X</p></button>
                </header>

                <form id="form" onSubmit={submit} >
                    <div>
                        <label>Item name</label>
                        <input type="text" name="itemName" onChange={handleOnChange} placeholder="Insert the item name" />
                    </div>

                    <input type="submit" value="Create" id="submit" />
                </form>
            </div>
        </div>
    )
}

export default ItemForm