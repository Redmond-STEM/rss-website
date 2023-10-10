import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import API_URL from '../Api';
import { Table } from 'react-bootstrap';

const StudentCourseGradePage = () => {

    const navigate = useNavigate()

    const { studentid, courseid } = useParams();

    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        let authtoken = localStorage.getItem('authtoken');

        setAssignments([]);
        axios.get(API_URL + 'getassignments', {
            params: {
                token: authtoken,
                courseid: courseid,
                studentid: studentid
            },
        })
            .then((res) => {
                setAssignments(res.data);
            })
            .catch((error) => {
                navigate("/#/notfound")
            })
    }, [studentid, courseid, navigate]);

    return (
        <div className="grades-page">
            <div className="grades-details">
                <Table bordered style={{ textAlign: "left" }}>
                    <thead className="thead-dark">
                        <tr>
                            <th style={{ width: "40%" }}>Name</th>
                            <th style={{ width: "20%" }}>Grade</th>
                            <th style={{ width: "20%" }}>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((assignment, index) => (
                            <tr key={index}>
                                <td>{assignment.name}</td>
                                <td>{assignment.score}/{assignment.weight}</td>
                                <td>{(assignment.score/assignment.weight) * 100}%</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default StudentCourseGradePage;
