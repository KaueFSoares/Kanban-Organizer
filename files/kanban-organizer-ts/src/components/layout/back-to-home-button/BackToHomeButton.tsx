import { Link } from "react-router-dom"
import "./backtohomebutton.sass"

function BackToHomeButton() {
    return (
        <Link to="/" id="back-home-btn">
            Go to Login
        </Link>
    )
}

export default BackToHomeButton