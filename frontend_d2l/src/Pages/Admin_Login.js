//A page need to access the AdminCourseControl.js page 
//once login it should transport you to the admin control page

import React from "react";
import { Link } from "react-router-dom";
import "../css/LoginBox.css"

const Admin_Login = () => {
  return (
    <div className="LoginBox">
      <h1>Admin Login</h1>
      <form action="/login" method="post">
        <input type="AdminID" name="AdminID" placeholder="Admin ID" required />
        <br />
        <input type="password" name="password" placeholder="Password" />
        <br />
        {/* Use Link to navigate to the "/studentlogin" page */}
        <Link to="/AdminHome">
          <input type="submit" value="login" />
        </Link>
      </form>
    </div>
  );
};

export default Admin_Login;
