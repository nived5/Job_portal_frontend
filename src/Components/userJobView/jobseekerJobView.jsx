import axios from "axios";
import React, { useEffect, useState } from "react";
import "./jobseekerjobview.css";
import { useNavigate, useParams } from "react-router-dom";

function JobseekerJobView({ savepost }) {
  // const {id} = useParams()
  const [loading, setLoading] = useState(false);
  const [posts, setPost] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [savedJobs, setsavedJobs] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleToggle = (id) => {
    setIsOpen(id);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/job_post_add")
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(posts);
  return (
    <>
      <div className="post2-wrapper">
        <div></div>
        {posts.map((ele, index) => {
          // console.log(ele._id);
          return (
            <div key={index} className="singlepost2">
              <div className="job-details">
                <div className="font-style4">
                  <h2 onClick={() => navigate("/" + ele.id)}>
                    {ele.job_title}
                  </h2>
                </div>

                <div>{ele.companyName}</div>
                <div>{ele.description}</div>
                <div>{ele.Qualification}</div>
                <div>{ele.place}</div>
                <div>{ele.salary}</div>
              </div>
              <div
                className="menubar"
                onClick={() => {
                  handleToggle(ele.id);
                }}
              ></div>
              <div
                onClick={() => {
                  savepost(ele.id);
                 
                }}
              >
                <i className={`${
                    savepost(id)
                      ? "fa-solid fa-bookmark save"
                      : "fa-solid fa-bookmark"
                  }`}></i>
                {/* <i
                  onClick={() => savepost(id)}
                  className={`${
                    savepost(id)
                      ? "fa-solid fa-bookmark save"
                      : "fa-solid fa-bookmark"
                  }`}
                ></i> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default JobseekerJobView;
