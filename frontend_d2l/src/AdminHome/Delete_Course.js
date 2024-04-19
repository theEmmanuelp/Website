import React, { useState } from "react";
import axios from "axios";

const DeleteCourseForm = () => {
  const [courseCode, setCourseCode] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // Example: Send a DELETE request to remove the course
      const response = await axios.delete(`/api/delete-course/${courseCode}`);
      console.log("Delete course response:", response.data);
      // Add any additional logic or state updates as needed
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div>
      <h2>Delete Course</h2>
      <form onSubmit={handleDelete}>
        <label>
          Course Code:
          <input
            type="text"
            name="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </label>
        <br />
        <input type="submit" value="Delete Course" />
      </form>
    </div>
  );
};

export default DeleteCourseForm;
