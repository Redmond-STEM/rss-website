import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CoursePage = () => {

    const { courseid } = useParams()

    const [account, setAccount] = useState(
        {
            "username": "default user",
            "email": "default email",
            "create_time": "yes",
            "id": 0,
            "auth_type": "google"
        }
    )

    const [course, setCourse] = useState(
        {
            "name": "Precalc",
            "teacher": 0,
            "time": "yes",
            "id": 0,
            "duration": 5,
            "capacity": 10
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
            console.log('pog')
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        axios.get("http://localhost:5000/api/getcourse", {
            params: {
                token: authtoken,
                id: courseid
            }})
        .then((res) => { 
            setCourse(res.data)
        })
    }, [])

    return (
        <div>
            <h1>Course Page</h1>
            <p>Name: {course.name} Time: {course.time}</p>
            <p>Duration: {course.duration} weeks</p>
        </div>
    );

}

export default CoursePage;