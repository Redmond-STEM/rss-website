import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import '../css/Table.css'; // Import the CSS file for styling
import API_URL from '../Api';

const StudentCourseAssignmentPage = () => {
    const { assignmentid, courseid } = useParams();

    const [assignment, setAssignment] = useState({
        name: 'default name',
        weight: 50,
        id: 0,
        course: 0,
    });

    const [account, setAccount] = useState({
        username: 'default user',
        email: 'default email',
        create_time: 'yes',
        id: 0,
        auth_type: 'google',
    });

    const [students, setStudents] = useState([]);

    useEffect(() => {
        let authtoken = localStorage.getItem('authtoken');

        setStudents([]);

        axios.get(API_URL + 'getaccount', {
            params: {
                token: authtoken, // Add your parameters here
            },
        })
            .then((res) => {
                setAccount(res.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        axios
            .get(API_URL + 'getassignmentref', {
                params: {
                    token: authtoken,
                    id: assignmentid,
                },
            })
            .then((res) => {
                setAssignment(res.data);
            });
        axios
            .get(API_URL + 'getstudents', {
                params: {
                    token: authtoken,
                    course: courseid,
                },
            })
            .then((res) => {
                if (res.data != null) {
                    setStudents(res.data);
                } else {
                    setStudents([]);
                }
            });
    }, [assignmentid]);

    useEffect(() => {
        if (students[0]?.score) return;
        const updatedStudents = students.map(async (student) => {
            let scoreLoaded = true;
            const response = await axios
                .get(API_URL + 'getassignment', {
                    params: {
                        token: localStorage.getItem('authtoken'),
                        studentid: student.id,
                        ref_id: assignmentid,
                    },
                })
                .catch((error) => {
                    if (error.response.status === 404) scoreLoaded = false;
                });

            if (scoreLoaded) {
                return { ...student, score: response.data.score };
            } else {
                return { ...student, score: '0' };
            }
        });

        Promise.all(updatedStudents).then((updatedStudentArray) => {
            setStudents(updatedStudentArray);
        });
    }, [students]);

    const handleGradeChange = (event, index) => {
        const newScore = event.target.value;
        if (/^\d+$/.test(newScore)) {
            const updatedStudents = [...students];
            updatedStudents[index] = { ...updatedStudents[index], score: newScore };
            setStudents(updatedStudents);
            axios.post(API_URL + 'setassignment', {
                token: localStorage.getItem('authtoken'),
                studentid: students[index].id,
                refid: assignmentid,
                score: parseInt(newScore),
            })
        }
    };

    return (
        <div className="assignment-page">
            <h1>Set Grades</h1>
            <div className="assignment-page">
                <h2>{assignment.name}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Grade out of {assignment.weight}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.firstname}</td>
                                <td>{student.lastname}</td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={(event) => handleGradeChange(event, index)}
                                        placeholder={student.score === "0" ? "0" : ""}
                                        value={student.score === "0" ? "" : student.score}
                                    ></input>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentCourseAssignmentPage;
