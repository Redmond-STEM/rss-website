import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import API_URL from '../Api';
import { Table, Button, Modal } from 'react-bootstrap';

const ParentPortalPage = () => {

  const navigate = useNavigate()

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDeleteIndex, setStudentToDeleteIndex] = useState(null);
  

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
        token: authtoken
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

  const handleOpenDeleteModal = (index) => {
    setStudentToDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setStudentToDeleteIndex(null);
  };  

  const handleDeleteStudent = (index) => {
    const updatedStudents = [...students];
    const id = updatedStudents[index].id
    console.log(id)
    const params = {
      token: localStorage.getItem("authtoken"),
      id: parseInt(id)
    }
    axios.post(API_URL + "deletestudent", params).then((res) => {
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
    })
  };

  const handleViewStudentCourse = (index) => {
    const id = students[index].id
    setTimeout(() => {
      navigate(id + '/courses')
    })
  }

  return (
    <div className="student-page">
      <h1>Students Page</h1>
      <div className="student-page">
        <Table bordered responsive="md">
          <thead className="thead-dark">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
                <td>
                  <Button onClick={() => handleViewStudentCourse(index)}>
                    View Courses
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleOpenDeleteModal(index)}>
                    Delete
                  </Button>
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
            Are you sure you want to delete this student?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteStudent}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ParentPortalPage;
