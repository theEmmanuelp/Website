import  {React, useState, useEffect }from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Axios from 'axios';


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
import DeleteCourseForm from "./AdminHome/Delete_Course.js";
import RegisterStudent from "./AdminHome/Register_New_Student.js";
import FeedbackData from "./AdminHome/FeedbackData.js";


let user;
//desing imports
import "./css/App.css";
	// render log out
	const LoginDisplay = () => {
		if(user && user.Type == "student"){
			return(
			<div>
			<li>
            {" "}
			<p>Logged in as {user.Student_First_Name} {user.Student_Last_Name}</p>
          </li>
		  <li>
		  {" "}
			<a onClick={LogOut}> Logout</a>
		  </li>
			</div>
			);
		}else if(user && user.Type == "admin"){
			return(
			<div>
			<li>
            {" "}
			<p>Logged in as admin</p>
          </li>
		  <li>
			<a onClick={LogOut}> Logout</a>
		  </li>
			</div>
			);
		}else{
			return(
				<p>You are not logged in</p>
			)
		}
	};
	
	async function LogOut(){
		localStorage.clear()
		Axios.get("http://localhost:5000/logout");
	}

function App() {
	// check current user
	const [currentUser, setCurrentUser] = useState(localStorage.getItem("CurrentUser"));
	user = JSON.parse(currentUser);
useEffect(() => {
	setCurrentUser(localStorage.getItem("CurrentUser"));
	if(currentUser != null){
		user = JSON.parse(currentUser);
		console.log(user);
	}
	

	
});
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
            <a href="/Feedback"> Feedback</a>
          </li>

          <li>
            {" "}
            <a href="/Login"> Student Login</a>
          </li>
		
          <li>
            {" "}
				{user != null && user.Type == "admin" ? <a href="/AdminHome">Admin Controls</a> : <a href="/Admin">Admin Login</a>}
          </li>
		  
        </div>
		<LoginDisplay />
      </div>

      <Router>
        <Routes>
          <Route path="/" exact element={<Student_homepage />} />
          <Route path="/DisplayCourses" exact element={<Display_Course_Data />} />
          <Route path="/CourseRegister" exact element={<Student_ViewingandRegistering />} />
          <Route path="/Feedback" exact element={<Student_feedback />} />
          <Route path="/Login" exact element={<Student_Login />} />
          <Route path="/Admin"exact element={<Admin_Login/>}/> 
          
          <Route path="/AdminHome"exact element={<Admin_Home_Page/>}/> 
          <Route path="/EditCourses"exact element={<Edit_Course/>}/> 
          <Route path="/AddCourse"exact element={<AddCourseForm/>}/> 
          <Route path="/DeleteCourse"exact element={<DeleteCourseForm/>}/> 
          <Route path="/RegisterStudent"exact element={<RegisterStudent/>}/> 
          <Route path="/FeedbackData"exact element={<FeedbackData/>}/> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
