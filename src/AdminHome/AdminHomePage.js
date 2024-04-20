
import React from "react";
import { Link } from "react-router-dom";
import "../css/AdminPage.css"
function Admin_Home_Page() {
  return (
    <div className="Admin Box">
      <div className="AdminMenu">
        <li>
          <Link to="/AddCourse">Add Course</Link>
        </li>
        <li>
          <Link to="/EditCourses">Edit Courses</Link>
        </li>
        <li>
          <Link to="/DeleteCourse">Delete Course</Link>
        </li>
        <li>
          <Link to="/RegisterStudent">Register Student</Link>
        </li>
		<li>
          <Link to="/FeedbackData">Student Feedback</Link>
        </li>
      </div>
    </div>
  );
}

export default Admin_Home_Page;
