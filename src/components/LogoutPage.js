import { googleLogout } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import API_URL from "../Api"

const LogoutPage = () => {

    let navigate = useNavigate()

    const onClick = () => {
        axios.post(API_URL + "logoutaccount", {
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