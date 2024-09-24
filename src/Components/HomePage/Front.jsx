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

  // const handleSave = async (id) => {
  //   // const formdata = new FormData()
  //   // formdata.append("jobs",id)
  //   // formdata.append("user",user.id)

  //   axios
  //     .post(
  //       "http://127.0.0.1:8000/jobseeker_saved_jobs",
  //       { jobs: id, user: user.id },
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     )

  //     .then((res) => {
  //       setSaved(res.data);
  //     })
  //     .catch((err) => console.log(err));
  //   console.log(id);
  //   console.log(user.id);
  // };
  const handleSave = async (id) => {
    console.log(id);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/jobseeker_saved_jobs",
        { jobs: id, user: user.id }, // Send data as a JSON object
        {
          headers: {
            "Content-Type": "application/json", // Use the correct content type
          },
        }
      );

      setSaved(response.data); // Update the saved state with the response
      console.log("Post saved successfully:", response.data);
    } catch (err) {
      console.error("Error saving the post:", err);
    }

    console.log("Job ID:", id);
    console.log("User ID:", user.id);
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
              <div
                className="detailed-post"
                style={{ width: "43%", marginTop: "30px" }}
              >
                <PostDetails postdetails={posts} id={id} />{" "}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="font-styling3">
              <div className="empl-wrapper">
                <div className="employer-text">
                  <div>
                    <h1 className="dela-gothic-one-regular">Let's hire your next<br/>
                     great candidate <br/>
                     Fast.....</h1>
                  </div>
                  
                  <div>
                    <button
                      className="post-button"
                      onClick={() => navigate("/employeraccount")}
                    >
                      Post your Job here
                    </button>
                  </div>
                </div>
                {/* <div className="image-div">
                  <img src="public/images/download.jfif" className="image" />
                </div> */}
              </div>

              <div className="employer-dash">
                <div
                  className="Added-Jobs"
                  onClick={() => navigate("/viewjobpost")}
                >
                  <h2>Added jobs</h2>
                </div>
                <div
                  onClick={() => navigate("/companydetails")}
                  className="Company-Details"
                >
                  <h2>Company Details</h2>
                </div>

                <div className="Post-Job">
                  <div className="caredinner">  <div >
                  
                  </div>
                  <div  onClick={() => navigate("/employeraccount")}><h2>Post a Job</h2></div></div>
                 
                  
                </div>

                {/* <ul className="Employer-list">
                  <li>
                    <button
                      className="Added-Jobs"
                      onClick={() => navigate("/viewjobpost")}
                    >
                      <i
                        className="fa-solid fa-magnifying-glass"
                        style={{ width: "30px", height: "30px" }}
                      ></i>
                      Added Jobs
                    </button>
                  </li>
                  <li>
                    <button
                      className="Company-Details"
                      onClick={() => navigate("/companydetails")}
                    >
                      <i
                        className="fa-solid fa-plus"
                        style={{ width: "30px", height: "30px" }}
                      ></i>
                      Company Details
                    </button>
                  </li>
                  <li>
                    <button
                      className="Post-Job"
                      onClick={() => navigate("/employeraccount")}
                    >
                      <i
                        className="fa-regular fa-clipboard"
                        style={{ width: "30px", height: "30px" }}
                      ></i>
                      Post a Job
                    </button>
                  </li>
                </ul>*/}

                <div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Front;
