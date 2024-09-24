import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AppliedJobs() {
  const [appliedJobsView, setAppliedJobsView] = useState([]);
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/applied_jobs_view")
      .then((res) => {setAppliedJobsView(res.data)
        console.log(appliedJobsView)
      });
    //   console.log(appliedJobsView)
  },[]);

  

  return (
    <div>
      <div>
        <h3>Applied Jobs</h3>
      </div>

      {appliedJobsView.map((ele,index) => {
        return(<div key={index}>
          <div /*onClick={()=>navigate(`/postdetails/${ele.job_details}`)}*/>{ele.job_details}</div>
          
        </div>)
        
      })}
    </div>
  );
}

export default AppliedJobs;
