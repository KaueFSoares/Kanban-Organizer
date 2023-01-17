import "./loading.sass"
import load from "./loading-svg.svg"

function Loading() {
  return (
    <div id = "loading-box">
        <img id = "loading-img" src= {load} alt = "Loading" />
    </div>
  )
}

export default Loading