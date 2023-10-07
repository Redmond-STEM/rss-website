import { googleLogout } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { Modal, Button } from "react-bootstrap"
import axios from "axios"
import API_URL from "../Api"

const LogoutPage = () => {

    let navigate = useNavigate()

    const handleCloseLogoutModal = () => {
        setTimeout(() => {
            navigate("/")
        }, 1000)
    };

    const handleLogoutConfirmed = () => {
        axios.post(API_URL + "logoutaccount", {
            token: localStorage.getItem("authtoken")
        })
        localStorage.removeItem("authtoken")
        googleLogout()
        navigate("/")
    }

    return (
        <Modal show="true" onHide={handleCloseLogoutModal}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to logout?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseLogoutModal}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleLogoutConfirmed}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default LogoutPage;