import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./profile.css";
import { useNavigate, useParams } from "react-router-dom";
import AddResume from "./AddResume";
import axios from "axios";

function Profile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState([]);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [getImage, setGetImage] = useState([]);
  const [qualification,setQualification] = useState([])
  const { id } = useParams();
  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!profilePicture) {
      alert("please select a photo first");
      return;
    }
    axios
      .post("http://127.0.0.1:8000/profile_photo_add", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const filename = res.data.photosetUploadedFile(filename);
      });
  };
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/profile_photo_add"${id}`)
      .then((res) => setGetImage(res.data));
  });

  useEffect(()=>{
    axios
    .get("http://127.0.0.1:8000/AddQualification")
    .then((res)=>{setQualification(res.data)})
    .catch((err)=>console.log(err))
  },[])

  return (
    <>
      {user.account_type == "Job seeker" ? (
        <div className="profile">
          <div className="prof-wrapper">
            <div>
              <div className="prof-wrapper1">
                <div>
                  <h2>{user.name}</h2>
                </div>
                <div>{user.username}</div>
                <div>
                  <h3>{user.email}</h3>
                </div>
                <div>{user.phoneno}</div>
              </div>
              <div>{<AddResume />}</div>
            </div>
            
            <div className="profile-photo">
              {profilePicture ? (
                <img src={profilePicture.photo} className="file-choosing" />
              ) : (
                <img
                  src="/images/profile_photo.png"
                  className="file-choosing"
                />
              )}
              <img src="/images/profile_photo.png" className="file-choosing" />
              <input
                type={"file"}
                style={{ display: "" }}
                onChange={handleFileChange}
              />
              <button onClick={handleUpload}>Upload File</button>
            </div>
          </div>

          <div className="details">
            <div>
              <h2>Qualification</h2>
              <hr />
              <h4 className="resume-text">
                Highlight your skills and experince
              </h4>
            </div>

            <div
              onClick={() => navigate("/AddQualification")}
              className="icon-style"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="qualfication">
            <h3>Your Qualifications and skills</h3>
            {qualification.map((ele,index)=>{
              return(<div key={index}>
                
               <div>higher secondary:{ele.higher_secondary}</div> 
               <div>Degree:{ele.degree}</div> 
               <div>Skills:{ele.skills}</div> 
              </div>)
              
            })}
          </div>
        </div>
      ) : (
        <div className="profile">
          <div className="prof-wrapper">
            <div className="prof-wrapper1">
              <div>{user.name}</div>
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>{user.phoneno}</div>{" "}
              <div className="profile-photo">
                <img
                  src="/images/profile_photo.png"
                  className="file-choosing"
                />
                <input type={"file"} style={{ display: "" }} />
              </div>
              <div>Add compnay details</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
