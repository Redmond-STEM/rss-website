import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { FormLabel, Button } from 'react-bootstrap';
import API_URL from '../Api';
import ReCAPTCHA from "react-google-recaptcha";

const CreateStudentPage = () => {

  const navigate = useNavigate()

  const { courseid } = useParams()

  const [verified, setVerified] = useState(false);

  const [students, setStudents] = useState([]);
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');

  const clientkey = process.env.REACT_APP_RECAPTCHA;

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

  const handleFirstNameChange = (e) => {
    setStudentFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setStudentLastName(e.target.value);
  };

  const handleCreateStudent = () => {

    const params = {
      token: localStorage.getItem("authtoken"),
      firstname: studentFirstName,
      lastname: studentLastName
    }

    axios.post(API_URL + "createstudent", params).then((res) => {
      const newStudent = {
        firstname: studentFirstName,
        lastname: studentLastName,
        id: res.data.accountId
      };

      setStudents([...students, newStudent]);
      setStudentFirstName('');
      setStudentLastName('');
    }).then(() => {
      navigate("/parentportal")
    })
  };

  const onVerified = () => {
    console.log(verified)
    setVerified(true)
  };

  return (
    <div className="create-student">
      <FormLabel htmlFor="studentFirstName">First Name: </FormLabel>
      <input
        type="text"
        id="studentFirstName"
        value={studentFirstName}
        onChange={handleFirstNameChange}
      />
      <br />
      <FormLabel htmlFor="studentLastName">Last Name: </FormLabel>
      <input
        type="text"
        id="studentLastName"
        value={studentLastName}
        onChange={handleLastNameChange}
      />
      <ReCAPTCHA sitekey={clientkey} onChange={onVerified} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} />
      {verified && <Button onClick={handleCreateStudent}>Create</Button>}
      <br />
    </div>
  )
};

export default CreateStudentPage;
