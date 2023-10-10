// AssignmentTracker.js
import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import '../css/Table.css'; // Import the CSS file for styling
import API_URL from '../Api';
import { Button, Table, Modal } from 'react-bootstrap';

const AssignmentPage = () => {

  const navigate = useNavigate()

  const { courseid } = useParams()

  const [assignments, setAssignments] = useState([]);
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentWeightage, setAssignmentWeightage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDeleteIndex, setAssignmentToDeleteIndex] = useState(null);

  useEffect(() => {
      let authtoken = localStorage.getItem("authtoken")

      setAssignments([]);

      axios.get(API_URL + "getassignmentrefs", {
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
      .catch((error) => {
        navigate("/notfound")
      })
  }, [courseid, navigate])

  const handleNameChange = (e) => {
    setAssignmentName(e.target.value);
  };

  const handleWeightageChange = (e) => {
    setAssignmentWeightage(e.target.value);
  };

  const handleCreateAssignment = () => {
    const params = {
      token: localStorage.getItem("authtoken"),
      assignment: {
        name: assignmentName,
        weight: parseInt(assignmentWeightage),
        course: parseInt(courseid)
      }
    }

    axios.post(API_URL + "createassignment", params).then((res) => { 
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

  const handleOpenDeleteModal = (index) => {
    setAssignmentToDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setAssignmentToDeleteIndex(null);
  };  

  const handleDeleteAssignment = () => {
    const updatedAssignments = [...assignments];
    const id = updatedAssignments[assignmentToDeleteIndex].id
    console.log(id)
    const params = {
      token: localStorage.getItem("authtoken"),
      id: parseInt(id)
    }
    axios.post(API_URL + "deleteassignment", params).then((res) => { 
      updatedAssignments.splice(assignmentToDeleteIndex, 1);
      setAssignments(updatedAssignments);
    })
    handleCloseDeleteModal()
  };

  return (
    <div className="assignment-page">
      <div className="assignment-page">
        <Table bordered style={ {textAlign: "left"} }>
          <thead>
            <tr>
              <th style={ {width: "20%"} }>Name</th>
              <th style={ {width: "10%"} }>Weightage</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.name}</td>
                <td>{assignment.weight}</td>
                <td>
                  <Button  variant="danger" onClick={() => handleOpenDeleteModal(index)}>
                    Delete
                  </Button>
                </td>
                <td>
                  <Button href={"/teacherportal/course/%23"+ assignment.course + "/assignments/%23" + assignment.id}>Set Grades</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this assignment?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAssignment}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="create-assignment">
        <h2>Create Assignment</h2>
        <label htmlFor="assignmentName">Name: </label>
        <input
          type="text"
          id="assignmentName"
          value={assignmentName}
          onChange={handleNameChange}
        />
        <br/>
        <label htmlFor="assignmentWeightage">Weightage: </label>
        <input
          type="text"
          id="assignmentWeightage"
          value={assignmentWeightage}
          onChange={handleWeightageChange}
        />
        <br/>
        <Button onClick={handleCreateAssignment}>Create</Button>
      </div>
    </div>
  );
};

export default AssignmentPage;
