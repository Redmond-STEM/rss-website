import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import '../css/Table.css'; // Import the CSS file for styling

const StudentsPage = () => {

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
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');

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
              token: authtoken
          }})
      .then((res) => { 
          if (res.data != null) {
            setStudents(res.data)
          } else {
            setStudents([])
          }
      })
  }, [courseid])

  const handleFirstNameChange = (e) => {
    setStudentFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setStudentLastName(e.target.value);
  };

  const handleCreateStudent = () => {

    const params = {
      token: localStorage.getItem("authtoken"),
      firstname: studentFirstName,
      lastname: studentLastName
    }

    axios.post("http://localhost:5000/api/createstudent", params).then((res) => { 
      const newStudent = {
        firstname: studentFirstName,
        lastname: studentLastName,
        id: res.data.accountId
      };
  
      setStudents([...students, newStudent]);
      setStudentFirstName('');
      setStudentLastName('');
     })
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = [...students];
    const id = updatedStudents[index].id
    const params = {
      token: localStorage.getItem("authtoken"),
      id: parseInt(id)
    }
    axios.post("http://localhost:5000/api/deletestudent", params).then((res) => { 
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
    })
  };

  return (
    <div className="student-page">
      <h1>Students Page</h1>
      <div className="student-page">
        <h2>Students</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
                <td>
                  <button onClick={() => handleDeleteStudent(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="create-student">
        <h2>Create Assignment</h2>
        <label htmlFor="studentFirstName">First Name:</label>
        <input
          type="text"
          id="studentFirstName"
          value={studentFirstName}
          onChange={handleFirstNameChange}
        />
        <label htmlFor="studentLastName">Last Name:</label>
        <input
          type="text"
          id="studentLastName"
          value={studentLastName}
          onChange={handleLastNameChange}
        />
        <button onClick={handleCreateStudent}>Create</button>
      </div>
    </div>
  );
};

export default StudentsPage;
