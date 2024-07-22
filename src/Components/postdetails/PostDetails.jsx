import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./postdetails.css";

function PostDetails({postdetails}) {
  const navigate = useNavigate()
  const {id} = useParams()

  // const [postDetails, setPostDetails] = useState({});
  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:8000/PostDetailed_view/${id}`)
  //     .then((res) => setPostDetails(res.data))
  //     .catch((err) => console.log(err));

     
  // }, [id]);
  return (
    <>
    {postdetails?( <div className="detail-wrapper">
        <div>
          <h2 className="title-font">{postdetails.job_title}</h2>
          <h3>{postdetails.companyName}</h3>
          <h4>{postdetails.description}</h4>
          <h4>Qualification:{postdetails.Qualification}</h4>
          <h4>{postdetails.place}</h4>
          <h4>salary:{postdetails.salary}</h4>

          <div className="apply-button">
            <div><button onClick={()=>navigate(`/Applyforjobs/${id}`)}>Apply now</button></div>
            {/* <div><i className="fa-thin fa-bookmark"></i></div> */}
            
          </div>
        </div>
      </div>):(<div><h2></h2></div>)}
     
    </>
  );
}

export default PostDetails;
