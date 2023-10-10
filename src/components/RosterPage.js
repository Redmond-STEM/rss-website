// AssignmentTracker.js
import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from "axios" // Import the CSS file for styling
import API_URL from '../Api';

const RosterPage = () => {

  const navigate = useNavigate()

  const { courseid } = useParams()
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState({
    "name": "default name",
    "startdate": "default time",
    "enddate": "default time",
    "id": 0,
    "teacher": 0,
  })

  useEffect(() => {
    let authtoken = localStorage.getItem("authtoken")


    setStudents([]);

    axios.get(API_URL + "getcourse", {
      params: {
        token: authtoken,
        id: courseid
      }
    })
      .then((res) => {
        setCourse(res.data)
      })
      .catch((error) => {
        navigate("/#/notfound")
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
      .catch((error) => {
        navigate("/notfound")
      })
  }, [courseid, navigate])

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
      <h1 className="mb-4">{course.name}</h1>
      <div className="student-list">
        <Button href={"/#/teacherportal/course/" + courseid + "/assignments"}>View Assignments</Button>
        <Table bordered responsive="md" style={{ textAlign: "left" }}>
          <thead className="thead-dark">
            <tr>
              <th style={{ width: "20%" }}>First Name</th>
              <th style={{ width: "20%" }}>Last Name</th>
              <th style={{ width: "60%" }}>Parent Email</th>
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
