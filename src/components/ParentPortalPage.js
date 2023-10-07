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

  const [students, setStudents] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDeleteIndex, setStudentToDeleteIndex] = useState(null);
  

  useEffect(() => {
    let authtoken = localStorage.getItem("authtoken")

    setStudents([]);

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

  const handleDeleteStudent = () => {
    const updatedStudents = [...students];
    const id = updatedStudents[studentToDeleteIndex].id
    console.log(id)
    const params = {
      token: localStorage.getItem("authtoken"),
      id: parseInt(id)
    }
    axios.post(API_URL + "deletestudent", params).then((res) => {
      updatedStudents.splice(studentToDeleteIndex, 1);
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
      <div className="student-page">
        <Table bordered responsive="md" style={ {textAlign: "left"} }>
          <thead>
            <tr>
              <th style={ {width: "10%"} }>First Name</th>
              <th style={ {width: "10%"} }>Last Name</th>
              <th style={ {width: "20%"} }>View Courses</th>
              <th style={ {width: "20%"} }>Delete</th>
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
                  <Button  variant="danger" onClick={() => handleOpenDeleteModal(index)}>
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
