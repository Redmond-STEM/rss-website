import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import API_URL from '../Api';
import { Table, Button, Modal } from 'react-bootstrap';
import Loading from './Loading';

const StudentCourseRegistrationPage = () => {

    const navigate = useNavigate()

    const { studentid } = useParams();

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [courseToRegisterIndex, setCourseToRegisterIndex] = useState(null);

    useEffect(() => {
        axios.get(API_URL + 'getavailablecourses', {
            params: {
                studentid: studentid,
                token: localStorage.getItem("authtoken")
            }
        })
            .then((res) => {
                setCourses(res.data);
                setLoading(false);
            })
            .catch((error) => {
                navigate("/notfound")
            })
    }, [studentid, navigate]);

    const handleRegistration = () => {
        const courseid = courses[courseToRegisterIndex].id
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
        handleCloseRegisterModal()
    }

    const handleOpenRegisterModal = (index) => {
        setCourseToRegisterIndex(index);
        setShowRegisterModal(true);
    };

    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
        setCourseToRegisterIndex(null);
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
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
                                        <td><Button onClick={() => handleOpenRegisterModal(index)}>Register</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Registration</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure you want to register for {courses[courseToRegisterIndex]?.name || 'null'}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseRegisterModal}>
                                    Cancel
                                </Button>
                                <Button onClick={handleRegistration}>
                                    Register
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentCourseRegistrationPage;
