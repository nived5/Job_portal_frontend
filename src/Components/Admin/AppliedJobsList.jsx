import axios from "axios";
import React, { useEffect, useState } from "react";
import "./admin.css";

function AppliedJobsList() {
  const [appliedJobsList, setAppliedJobsList] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/applied_jobs_view")
    .then((res) => {
      setAppliedJobsList(res.data);
    });
    console.log(appliedJobsList);
  }, []);
  return (
    <div>
      <h2 className="title">Appllied Job list</h2>
      <div className="App">
        <table>
          {appliedJobsList.map((ele, index) => {
            return (
              <div key={index} className="data-details">
                <th>Applied job details:</th>
                <th>Applied user</th>
                <tr>
                  <td>{ele.job_details}</td>
                  <td>{ele.user}</td>
                </tr>
                <div className="block-buttton">
                  <div>
                    <button>
                      <i
                        className="fa-solid fa-ban"
                        style={{ color: "#ce3812;" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default AppliedJobsList;
