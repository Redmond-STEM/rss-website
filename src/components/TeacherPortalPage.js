// AssignmentTracker.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import API_URL from '../Api';
import { Table, Button } from 'react-bootstrap';
import Loading from './Loading';

const TeacherPortalPage = () => {

    const navigate = useNavigate()

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let authtoken = localStorage.getItem("authtoken")

        setCourses([]);

        axios.get(API_URL + "getteachercourses", {
            params: {
                token: authtoken
            }
        }).then((res) => {
            if (res.data != null) {
                setCourses(res.data)
            } else {
                setCourses([])
            }
            setLoading(false)
        }).catch((error) => {
            navigate("/notfound")
        })
    }, [navigate])

    const viewCourse = (courseid) => {
        setTimeout(() => {
            navigate("/teacherportal/course/" + courseid)
        })
    }

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div className="teacher-page">
                    <div className="teacher-page">
                        <Table bordered style={{ textAlign: "left" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "20%" }}>Course Name</th>
                                    <th style={{ width: "10%" }}>Start Date</th>
                                    <th style={{ width: "10%" }}>End Date</th>
                                    <th style={{ width: "20%" }}>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.name}</td>
                                        <td>{new Date(course.startdate).toDateString()}</td>
                                        <td>{new Date(course.enddate).toDateString()}</td>
                                        <td>{new Date(course.startdate).toLocaleTimeString() + " to " + new Date(course.enddate).toLocaleTimeString()}</td>
                                        <td><Button onClick={() => viewCourse(course.id)}>View Course</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherPortalPage;
