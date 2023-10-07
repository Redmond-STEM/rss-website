import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../Api";
import Button from "react-bootstrap/Button";

const CoursePage = () => {

    let navigate = useNavigate()

    const { courseid } = useParams()

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
        axios.get(API_URL + "getcourse", {
            params: {
                token: authtoken,
                id: courseid
            }})
        .then((res) => { 
            setCourse(res.data)
        })
        .catch((error) => {
            navigate("/notfound")
        });
    }, [])

    return (
        <div>
            <h1>Course Page</h1>
            <p>Name: {course.name} Time: {course.time}</p>
            <p>Duration: {course.duration} weeks</p>
            <Button href={"/teacherportal/course/" + courseid + "/roster"}>View Roster</Button>
            <br></br>
            <Button href={"/teacherportal/course/" + courseid + "/assignments"}>View Assignments</Button>
        </div>
    );

}

export default CoursePage;