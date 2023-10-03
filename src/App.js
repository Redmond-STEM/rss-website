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
import { useGoogleOneTapLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import token from "random-web-token"
import CreateStudent from './components/CreateStudentPage';
const client_id = "437685874727-3qdnsdngbton283ql05pog6u1cfhp985.apps.googleusercontent.com"

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
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </div>
  );
  
}

export default App;