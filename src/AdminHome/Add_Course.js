import React, { useState } from "react";
import axios from "axios";

const AddCourseForm = () => {
  const [courseData, setCourseData] = useState({
    Course_Code: '',
    Course_Name: '',
    Course_Info: '',
    Term: '',
    Diploma_Code: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example: Send a POST request to add a new course
      const response = await axios.post("http://localhost:5000/admin/course/add", courseData);
      console.log("Add course response:", response.data);
      // Add any additional logic or state updates as needed
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each property in the Course_table */}
        <label>
          Course Code:
          <input
            type="text"
            name="Course_Code"
            value={courseData.Course_Code}
            onChange={handleChange}
            required
          />
        </label>
        {/* Add similar input fields for other Course_table properties */}
        <br />
        <label>
          Course Name:
          <input
            type="text"
            name="Course_Name"
            value={courseData.Course_Name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Course Info:
          <input
            type="text"
            name="Course_Info"
            value={courseData.Course_Info}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Term:
          <input
            type="text"
            name="Term"
            value={courseData.Term}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Diploma Code:
          <input
            type="text"
            name="Diploma_Code"
            value={courseData.Diploma_Code}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <input type="submit" value="Add Course" />
      </form>
    </div>
  );
};

export default AddCourseForm;
