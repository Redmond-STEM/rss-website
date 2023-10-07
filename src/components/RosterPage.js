// AssignmentTracker.js
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios" // Import the CSS file for styling
import API_URL from '../Api';

const RosterPage = () => {

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

  const [students, setStudents] = useState([]);

  useEffect(() => {
    let authtoken = localStorage.getItem("authtoken")

    setStudents([]);

    axios.get(API_URL + "getaccount", {
      params: {
        token: authtoken, // Add your parameters here
      }
    })
      .then((res) => {
        setAccount(res.data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    axios.get(API_URL + "getstudents", {
      params: {
        token: authtoken,
        course: courseid
      }
    })
      .then((res) => {
        if (res.data != null) {
          setStudents(res.data)
        } else {
          setStudents([])
        }
      })
  }, [courseid])

  useEffect(() => {
    if (students[0]?.parentemail) return;
    const updatedStudents = students.map(async (student) => {
      const response = await axios.get(API_URL + "getaccount", {
        params: {
          id: student.parent
        }
      });

      if (response.data.email != null) {
        return { ...student, parentemail: response.data.email };
      } else {
        return student;
      }
    });

    Promise.all(updatedStudents).then((updatedStudentArray) => {
      setStudents(updatedStudentArray);
    });
  }, [students]);

  return (
    <div className="roster-page">
      <h1 className="mb-4">Roster Page</h1>
      <div className="student-list">
        <h2 className="mb-3">Students</h2>
        <Table bordered responsive="md">
          <thead className="thead-dark">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Parent Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
                <td>{student.parentemail}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>

  );
};

export default RosterPage;
