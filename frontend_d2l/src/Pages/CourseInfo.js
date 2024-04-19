import React, {useEffect, useState , useeffect } from "react";
import Axios from 'axios';

function Display_Course_Data() {
    const [CourseData, setCourseData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
  
    useEffect(() => {
      // Fetch all data when the component mounts
      fetchCourseData();
    }, []);
  
    const fetchCourseData = () => {
      Axios.get('http://localhost:5000/api/AllCourseData')
        .then((response) => {
          console.log(response.data);
          setCourseData(response.data);
          setFetchError(null);
        })
        .catch((error) => {
          console.warn('Error fetching all data :(', error);
          setCourseData([]);
          setFetchError("Error fetching data");
        });
    };
  
    return (
      <div>
        <h2>All Courses</h2>
        {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
  
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {CourseData.map((course) => (
            <div key={course.Course_Code} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
              <h3>{course.Course_Name}</h3>
              <p><strong>Course Code:</strong> {course.Course_Code}</p>
              <p><strong>Course Info:</strong> {course.Course_Info}</p>
              <p><strong>Term:</strong> {course.Term}</p>
              
            </div>
          ))}
        </div>
      </div>
    );
  }
  

export default Display_Course_Data;
