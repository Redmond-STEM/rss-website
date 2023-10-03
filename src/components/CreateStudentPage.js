import React, { useState } from "react";
import axios from "axios"

const CreateStudent = () => {
  const [student, setStudent] = useState({
    firstname: "", // Change "firstName" to "firstname"
    lastname: "",  // Change "lastName" to "lastname"
    token: localStorage.getItem("authtoken")
  });

  const handleFirstNameChange = (e) => { // Change "handleFirstNameChange" to "handleFirstnameChange"
    setStudent({
      ...student,
      firstname: e.target.value, // Change "firstName" to "firstname"
    });
  };

  const handleLastNameChange = (e) => { // Change "handleLastNameChange" to "handleLastnameChange"
    setStudent({
      ...student,
      lastname: e.target.value, // Change "lastName" to "lastname"
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/createstudent", student).then((res) => { console.log(res.data) })
  };

  return (
    <div>
      <h1>Create Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label> {/* Change "firstName" to "firstname" */}
          <input
            type="text"
            id="firstname" // Change "firstName" to "firstname"
            name="firstname" // Change "firstName" to "firstname"
            value={student.firstname} // Change "firstName" to "firstname"
            onChange={handleFirstNameChange} // Change "handleFirstNameChange" to "handleFirstnameChange"
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label> {/* Change "lastName" to "lastname" */}
          <input
            type="text"
            id="lastname" // Change "lastName" to "lastname"
            name="lastname" // Change "lastName" to "lastname"
            value={student.lastname} // Change "lastName" to "lastname"
            onChange={handleLastNameChange} // Change "handleLastNameChange" to "handleLastnameChange"
          />
        </div>
        <button type="submit">Create Student</button>
      </form>
      <div>
        <h2>Student Information:</h2>
        <p>First Name: {student.firstname}</p> {/* Change "firstName" to "firstname" */}
        <p>Last Name: {student.lastname}</p> {/* Change "lastName" to "lastname" */}
      </div>
    </div>
  );
};

export default CreateStudent;