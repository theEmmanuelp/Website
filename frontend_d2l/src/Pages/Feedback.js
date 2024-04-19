//a student form that can be submitted
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/StudentFeedbackForm.css";

let user;
const Student_feedback = () => {
  const [studentFeedback, setStudentFeedback] = useState();
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("CurrentUser"));
  const [user, setUser] = useState();
 
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example: Send a POST request to save feedback
      const response = await axios.post("http://localhost:5000/student/sendfeedback", 
	  {StudentID: user.StudentID, Feedback: studentFeedback});
      console.log("Feedback submission response:", response.data);
	  setStudentFeedback('');
      // Add any additional logic or state updates as needed
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };
  
useEffect(() => {
    // Fetch the list of registered courses when the component mounts
	setCurrentUser(localStorage.getItem("CurrentUser"));
	//console.log(currentUser);
	if(currentUser != null){
		setUser(JSON.parse(currentUser));
	}
  },[]); 

  

if(user != null && user.Type == "student"){
  return (
    <div className="StudentFeedbackForm">
      <h2>Student Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Feedback:
          <textarea
            name="FeedBack"
            value={studentFeedback}
            onChange={(e) => setStudentFeedback(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Submit Feedback" />
      </form>
    </div>
  )
}else{
	return(
		<h1>Please log in to send feedback</h1>
	)
}


};

export default Student_feedback;
