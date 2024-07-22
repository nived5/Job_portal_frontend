import axios from "axios";
import React, { useEffect, useState } from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function AddResume() {
  const [resume, setResume] = useState([]);
  // const Dispatch =useDispatch()
  const [uploadedFileName, setUploadedfileResume] = useState("");
  const user = useSelector((state) => state.user);
  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };
  const handleFileUpload = async () => {
    if (!resume) {
      alert("Please select a file first");
      return;
    }
      const formData = new FormData()
      formData.append("Resume",resume)
      axios
        .post("http://127.0.0.1:8000/Add_jobseeker_resume", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const fileName = res.data.Resume.split('document/')[1]
          setUploadedfileResume(fileName)});
    
  };
  // console.log(values)

  return (
    <>
    {user?(<div className="add-resume">
        <h2>Add your resume </h2>
        <input
          type="file"
          className="resume-input"
          
          onChange={handleFileChange}
        />
        <button
          className="upload-button"
          type="submit"
          onClick={handleFileUpload}
        >
          Upload Resume
        </button>
        {uploadedFileName && <div>Uploaded file: {uploadedFileName}</div>}
        {/* {<ApplyForJobs/> } */}
      </div>):(<div>
        <h3>Please sign in </h3>
        <Link to={'/loginpage'}>Sign in</Link>
      </div>)}
      
      {/* <div>
        {resume.map((ele, index) => {
          return (<div key={index}>{ele.Resume}</div>)
        })}
      </div> */}
      {/* <div>{resume.Resume}</div> */}
    </>
  );
}

export default AddResume;
