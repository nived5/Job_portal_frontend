import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AdminJobSeekerList() {
    const [jobseekerList,setJobseekerList] = useState([])
    const [message, setMessage] = useState("");
    useEffect(()=>{
        axios
        .get("http://127.0.0.1:8000/JobSeekerList")
        .then((res)=>{setJobseekerList(res.data)})
    })
    const handleBlock = (id) => {
      console.log(id); // Log the ID to verify it's correct
    
      axios
        .patch(`http://127.0.0.1:8000/BlockUserView/${id}/`)
        .then((res) => {
          setMessage(res.data.message); 
          
          // Update the managerList state
          setJobseekerList(jobseekerList.map((jobseeker) =>
            jobseeker.id === id ? { ...jobseeker, is_blocked: !jobseeker.is_blocked } : jobseeker
          ));
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to block the user.");
        });
    };

  return (
    <div>
          <h2 className="title">Job seeker List</h2>
    <div className="wrapper">
      <table>
        <thead>
          <tr>
            <th>Job Seeker list</th>
            
            <th>Block</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobseekerList.map((ele,index) => {
              return(<tr key={index}>
              <td>{ele.username}</td>
            
              <td><button onClick={() => handleBlock(ele.id)}><i className="fa-solid fa-ban"></i></button></td>
              <td> {ele.is_blocked ? ('Blocked') : (' NotBlocked')}</td>
           
            </tr>)
            
          })}
          
        </tbody>
      </table>
    </div>
    {message && <p>{message}</p>}
  </div>
  )
}

export default AdminJobSeekerList