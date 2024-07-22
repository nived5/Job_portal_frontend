import React, { useEffect, useState } from "react";
import "./front.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import JobseekerJobView from "../userJobView/jobseekerJobView";
import PostDetails from "../postdetails/PostDetails";
import axios from "axios";
import SearchJobs from "./SearchJobs";

function Front() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState();
  const [saved, setSaved] = useState([]);

  const user = useSelector((state) => state.user);

  const handleSave = async (id) => {
    // const formdata = new FormData()
    // formdata.append("jobs",id)
    // formdata.append("user",user.id)

    axios
      .post(
        "http://127.0.0.1:8000/jobseeker_saved_jobs",
        { jobs: id, user: user.id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      .then((res) => {
        setSaved(res.data);
      })
      .catch((err) => console.log(err));
    console.log(id);
    console.log(user.id);
  };

  useEffect(() => {
    const fetchposts = async () => {
      axios
        .get(`http://127.0.0.1:8000/PostDetailed_view/${id}`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.log(err));
    };
    fetchposts();
  }, [id]);

  // console.log(posts);

  return (
    <>
      <div>
        {user.account_type === "Job seeker" ? (
          <div>
            <div className="banner">
              <div>
                <SearchJobs />
              </div>
            </div>
            <div className="post-details">
              <div className="job-view" style={{ width: "50%" }}>
                <JobseekerJobView savepost={handleSave} id={id} />
              </div>
              <div className="detailed-post" style={{ width: "43%", marginTop:"30px"}}>
                <PostDetails postdetails={posts} id={id} />{" "}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="font-styling3">
              <div className="font-styling1">
                <h3>Post a job on HIRE HUB</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Front;
