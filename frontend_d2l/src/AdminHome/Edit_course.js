import React, { useState, useEffect } from "react";
import axios from "axios";

const EditCourseForm = ({ courseId }) => {
  const [courseData, setCourseData] = useState({
    Course_Code: '',
    Course_Name: '',
    Course_Info: '',
    Term: '',
    Diploma_Code: ''
  });

  useEffect(() => {
    // Fetch course data for the selected courseId
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`/api/get-course/${courseId}`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example: Send a PUT request to update the course
      const response = await axios.put(`/api/edit-course/${courseId}`, courseData);
      console.log("Edit course response:", response.data);
      // Add any additional logic or state updates as needed
    } catch (error) {
      console.error("Error editing course:", error);
    }
  };

  return (
    <div>
      <h2>Edit Course</h2>
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
        <input type="submit" value="Edit Course" />
      </form>
    </div>
  );
};

export default EditCourseForm;
