//js for registering and searching 
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Student_ViewingRegistering.css"

const Student_ViewingandRegistering = () => {
  const [courseId, setCourseId] = useState('');
  const [studentId, setStudentId] = useState(''); // Added state for student ID
  const [registeredCourses, setRegisteredCourses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example: Send a POST request to register the student for the course
      const response = await axios.post("/api/register-course", {
        courseCode: courseId,
        studentId: studentId, // Include the student ID in the request
      });

      console.log("Registration response:", response.data);

      // Update the list of registered courses after successful registration
      fetchRegisteredCourses();
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const fetchRegisteredCourses = async () => {
    try {
      // Example: Fetch the list of registered courses for the student
      const response = await axios.get("/api/registered-courses", {
        params: { studentId: studentId }, // Include the student ID in the request
      });

      setRegisteredCourses(response.data);
    } catch (error) {
      console.error("Error fetching registered courses:", error);
    }
  };

  useEffect(() => {
    // Fetch the list of registered courses when the component mounts
    fetchRegisteredCourses();
  }, [studentId]); // Update the list when the student ID changes

  return (
    <div className="StudentViewingRegistering">
      <h2>Please input Course ID and Student ID</h2>
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
        <label>
          Student ID:
          <input
            type="text"
            name="StudentID"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </label>
        <br />
        <input type="submit" value="Register" />
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
  );
};

export default Student_ViewingandRegistering;
