import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import API_URL from '../Api';
import { Table, Button } from 'react-bootstrap';

const ParentPortalPage = () => {

  const navigate = useNavigate()

  const { courseid } = useParams()

  const [students, setStudents] = useState([]);

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
      .catch((error) => {
        if (error.response.status === 404) {
          navigate("/#/notfound")
        }
      })
  }, [courseid, navigate])

  return (
    <div className="student-page">
      <div className="student-page">
        <Table bordered responsive="md" style={ {textAlign: "left"} }>
          <thead>
            <tr>
              <th style={ {width: "10%"} }>First Name</th>
              <th style={ {width: "10%"} }>Last Name</th>
              <th style={ {width: "20%"} }>View Courses</th>
              <th style={ {width: "20%"} }>Register for Courses</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
                <td>
                  <Button href={"/#/parentportal/" + student.id + "/courses"}>
                    View Courses
                  </Button>
                </td>
                <td>
                  <Button href={"/#/parentportal/" + student.id + "/register"}>
                    Register
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ParentPortalPage;
