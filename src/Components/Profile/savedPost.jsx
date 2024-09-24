import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function SavedPost() {
  const {id}= useParams()
  const [savedPosts, setSavedPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/jobseeker_saved_jobs/=${id}`);
        setSavedPost(response.data);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, [id]);

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:8000/saved_jobs_view?user=${id}`)
  //     .then((res) => setSavedPost(res.data));
  //   // const data = setSavedPost((res)=>(res.data))
  //   // console.log(data)
  // }, [id]);
  // console.log(savedPosts);
  return (
    <div>
      <h2>saved jobs</h2>
      {savedPosts.length === 0 ? (
        <p>No saved jobs yet</p>
      ) : (
        // <div>
        //   {savedPosts.map((post, index) => (
            
        //     <div key={index}>{post.job_title}</div>
        //   ))}
        // </div>
        <div>
          {savedPosts.map((post,index)=>{
            return( <div key={index}>{post.jobs}</div>)
           
          })}
        </div>
      )}
    </div>
  );
}

export default SavedPost;
