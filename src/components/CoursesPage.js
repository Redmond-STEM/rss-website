import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";

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
        axios.get("http://localhost:5000/api/getaccount", {
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
        </div>
    );

}

export default CoursesPage;