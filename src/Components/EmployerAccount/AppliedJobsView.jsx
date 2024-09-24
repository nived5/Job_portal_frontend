import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./appliedjobsview.css";

function AppliedJobsView() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    axios
      .get(`http://127.0.0.1:8000/jobseeker_view_jobs/${id}`)
      .then((res) => {
        console.log(res.data);
        setAppliedJobs(res.data);
      })
      .catch((err) => console.log(err));
    //    console.log(appliedJobs)
  }, [id]);
  return (
    <div className="view">
      <div>
        {appliedJobs.map((ele, index) => {
          return (
            <div key={index} className="job-card">
              <div>
                <strong>Applied for:</strong> {ele.job_details}
              </div>
              <div>User:{ele.user}</div>
              <div>Resume:{ele.resume}</div>
              <div className="resumedownload">
                <button className="downloadButton">
                  {" "}
                  <a href={` http://127.0.0.1:8000/${ele.new_resume}`} download>
                    {ele.new_resume}
                  </a>
                  Download Resume
                </button>
              </div>
              {/* {ele.phoneno} */}
              <div>
                
                <button className="call-button">
                  
                  <a href={`tel:${ele.phoneno} `}>{ele.phoneno}</a>Call
                </button>
              </div>

              {/* {ele.user.} */}
            </div>
          );
        })}
      </div>
    </div>

    // <div className="view">
    //   <div className="inner-div">
    //     <div></div>

    //   </div>
    // </div>
  );
}

export default AppliedJobsView;
