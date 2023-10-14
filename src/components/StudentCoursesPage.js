// AssignmentTracker.js
import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import API_URL from '../Api';
import { Table, Button } from 'react-bootstrap';
import Loading from './Loading';

const StudentCoursesPage = () => {

  const navigate = useNavigate()

  const { studentid } = useParams()

  const [student, setStudent] = useState(
    {
      "firstname": "first",
      "lastname": "name",
    }
  )

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let authtoken = localStorage.getItem("authtoken")

    setCourses([]);

    axios.get(API_URL + "getstudent", {
      params: {
        token: authtoken,
        id: studentid
      }
    })
      .then((res) => {
        setStudent(res.data)
      })
      .catch((error) => {
        navigate("/notfound")
      });
    axios.get(API_URL + "getstudentcourses", {
      params: {
        token: authtoken,
        studentid: studentid
      }
    })
      .then((res) => {
        if (res.data != null) {
          setCourses(res.data)
        } else {
          setCourses([])
        }
      }).catch((error) => {
        setCourses([])
      })
  }, [studentid, navigate])

  useEffect(() => {
    if (courses[0]?.teacheremail) return;
    const updatedStudents = courses.map(async (course) => {
      const response = await axios.get(API_URL + "getaccount", {
        params: {
          id: course.teacher
        }
      });

      if (response.data.email != null) {
        return { ...course, teacheremail: response.data.email };
      } else {
        return course;
      }
    });

    Promise.all(updatedStudents).then((updatedStudentArray) => {
      setCourses(updatedStudentArray);
    });
    setLoading(false);
  }, [courses]);

  const navigateToGrades = (studentid, courseid) => {
    setTimeout(() => {
      navigate("/parentportal/" + studentid + "/courses/" + courseid)
    })
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="courses-page">
          <h1>Courses Page</h1>
          <div className="courses-page">
            <h2>Courses for {student.firstname} {student.lastname}</h2>
            <Table bordered style={{ textAlign: "left" }}>
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Course Name</th>
                  <th style={{ width: "15%" }}>Start Date</th>
                  <th style={{ width: "15%" }}>End Date</th>
                  <th style={{ width: "15%" }}>Time</th>
                  <th style={{ width: "15%" }}>Teacher Email</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.name}</td>
                    <td>{new Date(course.startdate).toDateString()}</td>
                    <td>{new Date(course.enddate).toDateString()}</td>
                    <td>{new Date(course.startdate).toLocaleTimeString() + " to " + new Date(course.enddate).toLocaleTimeString()}</td>
                    <td>{course.teacheremail}</td>
                    <td><Button onClick={() => navigateToGrades(studentid, course.id)}>View Grades</Button></td>
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

export default StudentCoursesPage;
