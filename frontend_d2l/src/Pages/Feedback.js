//a student form that can be submitted
import React, { useState } from "react";
import axios from "axios";
import "../css/StudentFeedbackForm.css";

const Student_feedback = () => {
  const [studentFeedback, setStudentFeedback] = useState({
    Student_ID: '',
    FeedBack: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentFeedback({ ...studentFeedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example: Send a POST request to save feedback
      const response = await axios.post("/api/submit-feedback", studentFeedback);
      console.log("Feedback submission response:", response.data);
      // Add any additional logic or state updates as needed
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="StudentFeedbackForm">
      <h2>Student Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student ID:
          <input
            type="text"
            name="Student_ID"
            value={studentFeedback.Student_ID}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Feedback:
          <textarea
            name="FeedBack"
            value={studentFeedback.FeedBack}
            onChange={handleChange}
            required
          />
        </label>
        <input type="submit" value="Submit Feedback" />
      </form>
    </div>
  );
};

export default Student_feedback;
