import axios from "axios";
import React, { useEffect, useState } from "react";
import "./viewjobpost.css";
import { useNavigate } from "react-router-dom";

function ViewJobPost() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/job_post_add").then((res) => {
      setPosts(res.data);
    });
  });
  return (
    <>
      <div className="post-wrapper">
        {posts.map((ele, index) => {
          return (
            <div key={index} className="singlepost">
              <div className="font-style" onClick={()=>navigate(`/emplapplied/${ele.id}`)}>
                <h2>{ele.job_title}</h2>
              </div>
              <div>{ele.companyName}</div>
              <div>{ele.description}</div>
              <div>{ele.Qualification}</div>
              <div>{ele.salary}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ViewJobPost;
