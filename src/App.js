import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CounselorsPage from './components/CounselorsPage';
import LoginPage from './components/LoginPage';
import AdminLoginPage from './components/AdminLoginPage';
import LogoutPage from './components/LogoutPage';
import AssignmentsPage from './components/AssignmentsPage';
import RosterPage from './components/RosterPage';
import StudentCourseAssignmentPage from "./components/StudentCourseAssignmentPage";
import StudentCoursesPage from './components/StudentCoursesPage';
import ParentPortal from './components/ParentPortalPage';
import CreateStudentPage from './components/CreateStudentPage';
import TeacherPortalPage from './components/TeacherPortalPage';
import StudentCourseGradePage from './components/StudentCourseGradePage';
import API_URL from './Api';
import logo from "./logo.jpeg"
import profile from "./profile.png"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import axios from "axios";
import NotFoundPage from './components/NotFoundPage';
import StudentCourseRegistrationPage from './components/StudentCourseRegistrationPage';
const client_id = "553535256675-gtounck06hsj2m2aoe209aqjjhsnqplf.apps.googleusercontent.com"

function App() {

  const [account, setAccount] = useState(
    {
      "username": "Not Logged In",
      "email": "default email",
      "create_time": "yes",
      "id": 0,
      "auth_type": "google"
    }
  )

  useEffect(() => {
    let authtoken = localStorage.getItem("authtoken")
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
  }, [])

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={client_id}>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/"><img alt="Redmond STEM" src={logo} width="40" height="40" /></Navbar.Brand>
            <Navbar.Brand href="/">Redmond STEM</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/#/parentportal">Parent Portal</Nav.Link>
              <Nav.Link href="/#/teacherportal">Teacher Portal</Nav.Link>
              <NavDropdown title="About Us">
                <NavDropdown.Item href="/#/counselors">Conunselors</NavDropdown.Item>
                <NavDropdown.Item>Mission Statement</NavDropdown.Item>
                <NavDropdown.Item>Contact Us</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <NavDropdown title={<img src={profile} alt="Profile" className="profile-picture" width="40" height="40" />} id="account-dropdown" color="white">
              <NavDropdown.Item>Hi {account.username}</NavDropdown.Item>
              <NavDropdown.Item href="/#/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/#/logout">Logout</NavDropdown.Item>
              <NavDropdown.Item href="/#/adminlogin">Admin Login</NavDropdown.Item>
            </NavDropdown>
          </Container>
        </Navbar>
        <br />
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/counselors" element={<CounselorsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/adminlogin" element={<AdminLoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/teacherportal/course/:courseid/assignments" element={<AssignmentsPage />} />
            <Route path="/teacherportal/course/:courseid/assignments/:assignmentid" element={<StudentCourseAssignmentPage />} />
            <Route path="/teacherportal/course/:courseid" element={<RosterPage />} />
            <Route path="/parentportal/:studentid/courses" element={<StudentCoursesPage />} />
            <Route path="/parentportal/:studentid/courses/:courseid" element={<StudentCourseGradePage />} />
            <Route path="/parentportal/:studentid/register" element={<StudentCourseRegistrationPage />} />
            <Route path="/parentportal" element={<ParentPortal />} />
            <Route path="/parentportal/createstudent" element={<CreateStudentPage />} />
            <Route path="/teacherportal" element={<TeacherPortalPage />} />
            <Route path="/notfound" element={<NotFoundPage />} />
          </Routes>
        </HashRouter>
      </GoogleOAuthProvider>
    </div>
  );

}

export default App;