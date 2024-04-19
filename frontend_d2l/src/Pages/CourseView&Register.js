//js for registering and searching 
import React, { useState, useEffect } from "react";
import axios from "axios";

let user;
const Student_ViewingandRegistering = () => {
  const [courseId, setCourseId] = useState('');
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("CurrentUser"));
  
  
  // register a new course
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example: Send a POST request to register the student for the course
      const response = await axios.post("http://localhost:5000/student/addcourse", {
        CourseCode: courseId,
        StudentID: user.StudentID, // Include the student ID in the request
      });

      console.log("Registration response:", response.data);

      // Update the list of registered courses after successful registration
      fetchRegisteredCourses();
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  
  // unregister from a course
  const unregisterCourse = async (e) => {
    e.preventDefault();

    try {
      // Example: Send a POST request to register the student for the course
      const response = await axios.post("http://localhost:5000/student/deletecourse", {
        CourseCode: courseId,
        StudentID: user.StudentID, // Include the student ID in the request
      });

      console.log("Deletion response:", response.data);

      // Update the list of registered courses after successful registration
      fetchRegisteredCourses();
    } catch (error) {
      console.error("Error during course removal:", error);
    }
  };

  const fetchRegisteredCourses = async () => {
    try {
      // Fetch the list of registered courses for the student
      const response = await axios.post("http://localhost:5000/student/getregisteredcourses", { StudentID: user.StudentID });
      setRegisteredCourses(response.data);
    } catch (error) {
      console.error("Error fetching registered courses:", error);
    }
  };

  useEffect(() => {
    // Fetch the list of registered courses when the component mounts
    fetchRegisteredCourses();
	setCurrentUser(localStorage.getItem("CurrentUser"));
	if(currentUser != null){
		user = JSON.parse(currentUser);
	}
  },[]); 

if(user != null && user.Type == "student"){
	return (
	
    <div>
      <h2>Register for a new Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course ID:
          <input
            type="text"
            name="CourseID"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Register" />
      </form>
	  
	  <h2>Remove a registered Course</h2>
      <form onSubmit={unregisterCourse}>
        <label>
          Course ID:
          <input
            type="text"
            name="CourseID"
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <input type="submit" value="Remove" />
      </form>

      <div>
        <h2>Registered Courses</h2>
        <ul>
          {registeredCourses.map((course) => (
            <li key={course.Course_Code}>
              {course.Course_Name} - {course.Course_Code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}else{
	return(
		<h1>Please log in to register for courses</h1>
	)
}
  
  
};

export default Student_ViewingandRegistering;
