import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//all js fille imports for students
import Display_Course_Data from "./Pages/CourseInfo.js";
import Student_homepage from "./Pages/Home.js";
import Student_ViewingandRegistering from "./Pages/CourseView&Register.js";
import Student_Login from "./Pages/Student_Login.js";
import Student_feedback from "./Pages/Feedback.js";
//all js file imporst for Admin
import Admin_Login from "./Pages/Admin_Login.js";
import Admin_Home_Page from './AdminHome/AdminHomePage.js';
import Edit_Course from "./AdminHome/Edit_course.js";
import AddCourseForm from "./AdminHome/Add_Course.js";
import DeleteCourseButton from "./AdminHome/Delete_Course.js";
import RegisterStudent from "./AdminHome/Register_New_Student.js";
//desing imports
import "./css/App.css";
function App() {
  return (
    <div>
      <div className="MenuBox">
        <div>
          <li>
            <a href="/"> Home Page </a>{" "}
          </li>
          <li>
            {" "}
            <a href="/DisplayCourses"> Courses</a>{" "}
          </li>
          <li>

            {" "}
            <a href="/CourseRegister"> Register</a>
          </li>

          <li>
            {" "}
            <a href="/Login"> Login</a>
          </li>

          <li>
            {" "}
            <a href="/Feedback"> Feedback</a>
          </li>


          <li>
            {" "}
            <a href="/Admin"> Admin</a>
          </li>
        </div>
      </div>

      <Router>
        <Routes>
          <Route path="/" exact element={<Student_homepage />} />
          <Route path="/DisplayCourses" exact element={<Display_Course_Data />} />
          <Route path="/CourseRegister" exact element={<Student_ViewingandRegistering />} />
          <Route path="/Login" exact element={<Student_Login />} />
          <Route path="/Admin"exact element={<Admin_Login/>}/> 
          <Route path="/FeedBack" exact element={<Student_feedback/>}/>
          
          <Route path="/AdminHome"exact element={<Admin_Home_Page/>}/> 
          <Route path="/AddCourse" exact element={<AddCourseForm/>} />
          <Route path="/EditCourses"exact element={<Edit_Course/>}/> 
          <Route path="/DeleteCourse" exact element={<DeleteCourseButton/>} />
          <Route path="/RegisterStudent" exact element={<RegisterStudent/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
