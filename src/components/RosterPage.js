// AssignmentTracker.js
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import '../css/Table.css'; // Import the CSS file for styling

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

      axios.get("http://localhost:5000/api/getaccount", {
          params: {
              token: authtoken, // Add your parameters here
          }})
      .then((res) => {
          setAccount(res.data)
      })
      .catch((error) => {
          console.error("Error:", error);
      });
      axios.get("http://localhost:5000/api/getstudents", {
          params: {
              token: authtoken,
              course: courseid
          }})
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
      const response = await axios.get("http://localhost:5000/api/getaccount", {
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
      <h1>Roster Page</h1>
      <div className="roster-page">
        <h2>Students</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Parent Email</th>
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
        </table>
      </div>
    </div>
  );
};

export default RosterPage;
