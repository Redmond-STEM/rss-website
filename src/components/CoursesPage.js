import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import API_URL from "../Api";
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"

const CoursesPage = () => {

    const [account, setAccount] = useState(
        {
            "username": "default user",
            "email": "default email",
            "create_time": "yes",
            "id": 0,
            "auth_type": "google"
        }
    )

    useEffect(() => {
        let authtoken = localStorage.getItem("authtoken")
        axios.get(API_URL + "getaccount", {
        params: {
            token: authtoken, // Add your parameters here
        }})
        .then((res) => {
            setAccount(res.data)
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }, [])

    return (
        <div>
            <h1>Courses Page</h1>
            <p>Name: {account.username} Email: {account.email}</p>
            <p>Auth: {account.auth_type}</p>
            <Button>Test Button</Button>
        </div>
    );

}

export default CoursesPage;