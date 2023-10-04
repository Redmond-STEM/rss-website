import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CoursesPage from './components/CoursesPage';
import CounselorsPage from './components/CounselorsPage';
import LoginPage from './components/LoginPage';
import AdminLoginPage from './components/AdminLoginPage';
import LogoutPage from './components/LogoutPage';
import CoursePage from './components/CoursePage';
import { useGoogleOneTapLogin, GoogleOAuthProvider } from '@react-oauth/google';
import AssignmentsPage from './components/AssignmentsPage';
import CreateStudent from './components/CreateStudentPage';
const client_id = "553535256675-gtounck06hsj2m2aoe209aqjjhsnqplf.apps.googleusercontent.com"

  function App() {

    return (
      <div className="App">
        <GoogleOAuthProvider clientId={client_id}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/counselors" element={<CounselorsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/adminlogin" element={<AdminLoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/students" element={<CreateStudent />} />
              <Route path="/course/:courseid/assignments" element={<AssignmentsPage />} />
              <Route path="/course/:courseid" element={<CoursePage />} />
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </div>
  );
  
}

export default App;