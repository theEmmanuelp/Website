import React, {useEffect, useState , useeffect } from "react";
import Axios from 'axios';

function FeedbackData() {
    const [feedbackData, setFeedbackData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
  
    useEffect(() => {
      // Fetch all data when the component mounts
      fetchFeedbackData();
    }, []);
  
    const fetchFeedbackData = () => {
      Axios.get('http://localhost:5000/admin/getfeedbackdata')
        .then((response) => {
          console.log(response.data);
          setFeedbackData(response.data);
          setFetchError(null);
        })
        .catch((error) => {
          console.warn('Error fetching all data :(', error);
          setFeedbackData([]);
          setFetchError("Error fetching data");
        });
    };
  
    return (
      <div>
        <h2>All Feedback Data</h2>
        {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
  
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {feedbackData.map((f) => (
            <div key={f.Student_ID} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '600px' }}>
              <h3>Student ID: {f.Student_ID}</h3>
              <h3>Student Name: {f.Student_First_Name} {f.Student_Last_Name}</h3>
              <p>{f.Feedback}</p>
              
            </div>
          ))}
        </div>
      </div>
    );
  }
  

export default FeedbackData;
