//student login
//this page should be the first thing seen
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Student_Login = () => {
	const [studentData, setStudentData] = useState({
    username: '',
    password: ''
  });
  
  //history = useHistory();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      // Send a POST request to login
      const response = await axios.post("http://localhost:5000/student/login", studentData)
	  
	  if(response.status == 200){
			localStorage.setItem("CurrentUser", JSON.stringify(response.data.user));
			console.log(localStorage.getItem("CurrentUser"));
			history.go('/DisplayCourses');
	  }else {
        // Handle other responses or errors accordingly
        console.error('Error:', response.data);
      }
      console.log("Student login response:", response.data);
      // Add any additional logic or state updates as needed
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div>
      <h1>BVC Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="username"
          placeholder="Email"
		  value={studentData.username}
            onChange={handleChange}
          required
        ></input>
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="Password"
		  value={studentData.password}
            onChange={handleChange}
        ></input>{" "}
        <br></br>
        <input type="submit" value="login"></input>
      </form>
    </div>
  );
};

export default Student_Login;
