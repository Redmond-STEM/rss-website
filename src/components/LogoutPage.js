import { googleLogout } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const client_id = "437685874727-3qdnsdngbton283ql05pog6u1cfhp985.apps.googleusercontent.com"

const LogoutPage = () => {

    let navigate = useNavigate()

    const onClick = () => {
        axios.post("http://localhost:5000/api/logoutaccount", {
            token: localStorage.getItem("authtoken")
        })
        localStorage.removeItem("authtoken")
        googleLogout()
        navigate("/")
    }

    return (
        <button onClick={onClick}>Logout</button>
    )

}

export default LogoutPage;