//A page need to access the AdminCourseControl.js page 
//once login it should transport you to the admin control page

import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

  
const Admin_Login = () => {
	const [adminData, setAdminData] = useState({
    username: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to login
      const response = await axios.post("http://localhost:5000/admin/login", adminData)
	  
	  if(response.status == 200){
			localStorage.setItem("CurrentUser", JSON.stringify(response.data.user));
			console.log(localStorage.getItem("CurrentUser"));
			history.go('/DisplayCourses');
	  }else {
        // Handle other responses or errors accordingly
        console.error('Error:', response.data);
      }
      console.log("Admin login response:", response.data);
      // Add any additional logic or state updates as needed
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
	
  return (
    <div className="LoginBox">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="AdminID" name="username" placeholder="Admin ID" 
		value={adminData.username}
            onChange={handleChange}
		required />
        <br />
        <input type="password" name="password" placeholder="Password" 
		value={adminData.password}
            onChange={handleChange}
		/>
        <br />
          <input type="submit" value="login" />
      </form>
    </div>
  );
};

export default Admin_Login;
