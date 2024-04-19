import React, { useState } from "react";
import axios from "axios";

const RegisterStudent = () => {
  const [studentData, setStudentData] = useState({
    StudentID: '',
    Student_First_Name: '',
    Student_Last_Name: '',
    Student_Email: '',
    Student_Password: '',
    Student_Phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example: Send a POST request to register a new student
      const response = await axios.post("/api/register-student", studentData);
      console.log("Student registration response:", response.data);
      // Add any additional logic or state updates as needed
    } catch (error) {
      console.error("Error registering student:", error);
    }
  };

  return (
    <div>
      <h2>Register Student</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each property in the StudentInfo table */}
        <label>
          Student ID:
          <input
            type="text"
            name="StudentID"
            value={studentData.StudentID}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            name="Student_First_Name"
            value={studentData.Student_First_Name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="Student_Last_Name"
            value={studentData.Student_Last_Name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="Student_Email"
            value={studentData.Student_Email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="Student_Password"
            value={studentData.Student_Password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="Student_Phone"
            value={studentData.Student_Phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <input type="submit" value="Register Student" />
      </form>
    </div>
  );
};

export default RegisterStudent;
