// AssignmentTracker.js
import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import '../css/Table.css'; // Import the CSS file for styling
import API_URL from '../Api';
import { Table, Button } from 'react-bootstrap';

const TeacherPortalPage = () => {

    const navigate = useNavigate()

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        let authtoken = localStorage.getItem("authtoken")

        setCourses([]);

        //load teacher courses here
    }, [])

    return (
        <div className="courses-page">
            <h1>Courses Page</h1>
            <div className="courses-page">
                <h2>Courses</h2>
                <Table bordered style={ {textAlign: "left"} }>
                    <thead>
                        <tr>
                            <th style={ {width: "20%"} }>Course Name</th>
                            <th style={ {width: "20%"} }>Time</th>
                            <th style={ {width: "60%"} }>View Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.name}</td>
                                <td>{course.time}</td>
                                <td><Button href={"/course/" + course.id}>View Course</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default TeacherPortalPage;
