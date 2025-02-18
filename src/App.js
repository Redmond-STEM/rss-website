import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CounselorsPage from './components/CounselorsPage';
import AdminLoginPage from './components/AdminLoginPage';
import LogoutPage from './components/LogoutPage';
import AssignmentsPage from './components/AssignmentsPage';
import CoursePage from './components/CoursePage';
import StudentCourseAssignmentPage from "./components/StudentCourseAssignmentPage";
import StudentCoursesPage from './components/StudentCoursesPage';
import ParentPortal from './components/ParentPortalPage';
import CreateStudentPage from './components/CreateStudentPage';
import TeacherPortalPage from './components/TeacherPortalPage';
import StudentCourseGradePage from './components/StudentCourseGradePage';
import LoginButton from './components/LoginButton';
import API_URL from './Api';
import logo from "./logo.png"
import profile from "./profile.png"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import axios from "axios";
import NotFoundPage from './components/NotFoundPage';
import StudentCourseRegistrationPage from './components/StudentCourseRegistrationPage';
import { Helmet } from "react-helmet";
import NoMobilePage from './components/NoMobilePage';
import ContactPage from './components/ContactPage';
const client_id = process.env.REACT_APP_GOOGLE_OAUTH || process.env.APPSETTING_REACT_APP_GOOGLE_OAUTH;

function App() {

  const [authtoken, setAuthToken] = useState(localStorage.getItem("authtoken"))

  const [account, setAccount] = useState(
    {
      "username": "Not Logged In",
      "email": "default email",
      "create_time": "yes",
      "id": 0,
      "auth_type": "google"
    }
  )

  const [isMobile] = useState(window.innerWidth <= 500);


  useEffect(() => {
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
        setAccount({
          "username": "Not Logged In",
          "email": "default email",
          "create_time": "yes",
          "id": 0,
          "auth_type": "google"
        })
      });
  }, [authtoken])

  return (
    <div>
      {isMobile ? (
        <NoMobilePage />
      ) : (
        <div className="App">
          <GoogleOAuthProvider clientId={client_id}>
            <Helmet>
              <meta charSet="utf-8" name='Redmond STEM Portal' content='This is the website application to manage your account with Redmond STEM.' title='Redmond STEM' />
              <meta property='og:title' content="Redmond STEM Portal" />
              <title>Redmond STEM</title>
              <link rel="canonical" href="https://salmon-desert-06199921e.3.azurestaticapps.net/" />
            </Helmet>
            <Navbar bg="dark" data-bs-theme="dark">
              <Container>
                <Navbar.Brand href="/"><img alt="Redmond STEM" src={logo} width="40" height="40" /></Navbar.Brand>
                <Navbar.Brand href="/">Redmond STEM</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/#/parentportal">Parent Portal</Nav.Link>
                  <Nav.Link href="/#/teacherportal">Teacher Portal</Nav.Link>
                  <NavDropdown title="About Us">
                    <NavDropdown.Item href="/#/counselors">Conunselors</NavDropdown.Item>
                    <NavDropdown.Item href="/#/contact">Contact Us</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <NavDropdown title={<img src={profile} alt="Profile" className="profile-picture" width="40" height="40" />} id="account-dropdown" color="white">
                  <NavDropdown.Item>Hi {account.username}</NavDropdown.Item>
                  <LoginButton setToken={setAuthToken} />
                  <NavDropdown.Item href="/#/logout">Logout</NavDropdown.Item>
                  <NavDropdown.Item href="/#/adminlogin">Admin Login</NavDropdown.Item>
                </NavDropdown>
              </Container>
            </Navbar>
            <br />
            <HashRouter>
              <Routes>
                <Route path="/" exact element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/counselors" element={<CounselorsPage />} />
                <Route path="/adminlogin" element={<AdminLoginPage setToken={setAuthToken} />} />
                <Route path="/logout" element={<LogoutPage setToken={setAuthToken} />} />
                <Route path="/teacherportal/course/:courseid/assignments" element={<AssignmentsPage />} />
                <Route path="/teacherportal/course/:courseid/assignments/:assignmentid" element={<StudentCourseAssignmentPage />} />
                <Route path="/teacherportal/course/:courseid" element={<CoursePage />} />
                <Route path="/parentportal/:studentid/courses" element={<StudentCoursesPage />} />
                <Route path="/parentportal/:studentid/courses/:courseid" element={<StudentCourseGradePage />} />
                <Route path="/parentportal/:studentid/register" element={<StudentCourseRegistrationPage />} />
                <Route path="/parentportal" element={<ParentPortal />} />
                <Route path="/parentportal/createstudent" element={<CreateStudentPage />} />
                <Route path="/teacherportal" element={<TeacherPortalPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/notfound" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </HashRouter>
          </GoogleOAuthProvider>
        </div>
      )}
    </div>
  );

}

export default App;
