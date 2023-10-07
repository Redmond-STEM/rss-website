// AssignmentTracker.js
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import '../css/Table.css'; // Import the CSS file for styling
import API_URL from '../Api';

const StudentCoursesPage = () => {

  const { studentid } = useParams()

  const [account, setAccount] = useState(
      {
          "username": "default user",
          "email": "default email",
          "create_time": "yes",
          "id": 0,
          "auth_type": "google"
      }
  )

  const [student, setStudent] = useState(
    {
        "firstname": "first",
        "lastname": "name",
    }
  )

  const [courses, setCourses] = useState([]);

  useEffect(() => {
      let authtoken = localStorage.getItem("authtoken")

      setCourses([]);

      axios.get(API_URL + "getaccount", {
          params: {
              token: authtoken, // Add your parameters here
          }})
      .then((res) => {
          setAccount(res.data)
      })
      .catch((error) => {
          console.error("Error:", error);
      });
      axios.get(API_URL + "getstudent", {
          params: {
              token: authtoken,
              id: studentid
          }})
      .then((res) => {
          setStudent(res.data)
      })
      .catch((error) => {
          console.error("Error:", error);
      });
      axios.get(API_URL + "getstudentcourses", {
          params: {
              token: authtoken,
              studentid: studentid
          }})
      .then((res) => { 
          if (res.data != null) {
            setCourses(res.data)
          } else {
            setCourses([])
          }
      }).catch((error) => {
        setCourses([])
      })
  }, [studentid])

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
  }, [courses]);

  return (
    <div className="courses-page">
      <h1>Courses Page</h1>
      <div className="courses-page">
        <h2>Courses for {student.firstname} {student.lastname}</h2>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Time</th>
              <th>Teacher Email</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.time}</td>
                <td>{course.teacheremail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentCoursesPage;
