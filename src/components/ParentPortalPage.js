import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import API_URL from '../Api';
import { Table, Button } from 'react-bootstrap';
import Loading from './Loading';

const ParentPortalPage = () => {

  const navigate = useNavigate()

  const { courseid } = useParams()

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          navigate("/notfound")
        }
      })
  }, [courseid, navigate])

  const navigateToCourses = (studentid) => {
    setTimeout(() => {
      navigate("/parentportal/" + studentid + "/courses")
    }) 
  }

  const navigateToRegister = (studentid) => {
    setTimeout(() => {
      navigate("/parentportal/" + studentid + "/register")
    }) 
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
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
                    <Button onClick={() => navigateToCourses(student.id)}>
                      View Courses
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => navigateToRegister(student.id)}>
                      Register
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      )}
    </div>
  );
};

export default ParentPortalPage;
