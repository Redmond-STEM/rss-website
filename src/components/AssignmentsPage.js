// AssignmentTracker.js
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import '../css/Table.css'; // Import the CSS file for styling

const AssignmentPage = () => {

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

  const [assignments, setAssignments] = useState([]);
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentWeightage, setAssignmentWeightage] = useState('');

  useEffect(() => {
      let authtoken = localStorage.getItem("authtoken")

      setAssignments([]);

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
      axios.get("http://localhost:5000/api/getassignmentrefs", {
          params: {
              token: authtoken,
              id: courseid
          }})
      .then((res) => { 
          if (res.data != null) {
            setAssignments(res.data)
          } else {
            setAssignments([])
          }
      })
  }, [courseid])

  const handleNameChange = (e) => {
    setAssignmentName(e.target.value);
  };

  const handleWeightageChange = (e) => {
    setAssignmentWeightage(e.target.value);
  };

  const handleCreateAssignment = () => {
    console.log(assignmentName, parseInt(assignmentWeightage))

    const params = {
      token: localStorage.getItem("authtoken"),
      assignment: {
        name: assignmentName,
        weight: parseInt(assignmentWeightage),
        course: parseInt(courseid)
      }
    }

    axios.post("http://localhost:5000/api/createassignment", params).then((res) => { 
      const newAssignment = {
        name: assignmentName,
        weight: assignmentWeightage,
        id: res.data.assignmentId.insertId
      };
  
      setAssignments([...assignments, newAssignment]);
      setAssignmentName('');
      setAssignmentWeightage('');
     })
  };

  const handleDeleteAssignment = (index) => {
    const updatedAssignments = [...assignments];
    const id = updatedAssignments[index].id
    console.log(id)
    const params = {
      token: localStorage.getItem("authtoken"),
      id: parseInt(id)
    }
    axios.post("http://localhost:5000/api/deleteassignment", params).then((res) => { 
      updatedAssignments.splice(index, 1);
      setAssignments(updatedAssignments);
    })
  };

  return (
    <div className="assignment-page">
      <h1>Assignment Page</h1>
      <div className="assignment-page">
        <h2>Assignments</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Weightage</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.name}</td>
                <td>{assignment.weight}</td>
                <td>
                  <button onClick={() => handleDeleteAssignment(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="create-assignment">
        <h2>Create Assignment</h2>
        <label htmlFor="assignmentName">Name:</label>
        <input
          type="text"
          id="assignmentName"
          value={assignmentName}
          onChange={handleNameChange}
        />
        <label htmlFor="assignmentWeightage">Weightage:</label>
        <input
          type="text"
          id="assignmentWeightage"
          value={assignmentWeightage}
          onChange={handleWeightageChange}
        />
        <button onClick={handleCreateAssignment}>Create</button>
      </div>
    </div>
  );
};

export default AssignmentPage;
