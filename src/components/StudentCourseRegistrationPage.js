import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import API_URL from '../Api';
import { Table, Button } from 'react-bootstrap';

const StudentCourseRegistrationPage = () => {

    const navigate = useNavigate()

    const { studentid } = useParams();

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(API_URL + 'getcourses')
            .then((res) => {
                setCourses(res.data);
            })
            .catch((error) => {
                navigate("/notfound")
            })
    }, [studentid, navigate]);

    const handleRegistration = (courseid, studentid) => {
        const params = {
            token: localStorage.getItem("authtoken"),
            studentid: studentid,
            courseid: courseid
        }

        axios.post(API_URL + "createpayment", params)
            .then((res) => {
                setTimeout(() => {
                    window.open(res.data.payment_url)
                })
            })
            .catch((error) => {
                navigate("/notfound")
            })
    }

    return (
        <div className="registration-page">
            <div className="registration-details">
                <Table bordered style={{ textAlign: "left" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "15%" }}>Course Name</th>
                            <th style={{ width: "15%" }}>Start Date</th>
                            <th style={{ width: "15%" }}>End Date</th>
                            <th style={{ width: "15%" }}>Time</th>
                            <th style={{ width: "15%" }}>Register</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.name}</td>
                                <td>{new Date(course.startdate).toDateString()}</td>
                                <td>{new Date(course.enddate).toDateString()}</td>
                                <td>{new Date(course.startdate).toLocaleTimeString() + " to " + new Date(course.enddate).toLocaleTimeString()}</td>
                                <td><Button onClick={() => handleRegistration(course.id, studentid)}>Register</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default StudentCourseRegistrationPage;
