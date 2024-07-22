import axios from "axios";
import React, { useEffect, useState } from "react";
import PostDetails from "../postdetails/PostDetails";
import { useParams } from "react-router-dom";
import "./applyforjobs.css";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

function UserJobApplication() {
  const [applyForJobs, setApplyForJobs] = useState([]);
  const [existingResume, setExistingResume] = useState(null);
  const [resume, setResume] = useState(null);
  const [uploadedFileName, setUploadedfileResume] = useState("");
  const user = useSelector((state) => state.user);

  const { id } = useParams();

  
  const formik = useFormik({
    initialValues: {
      experience: "",
      noOfYears: "",
    },
    validationSchema: Yup.object({
      experience: Yup.string().required("Job title is required"),
      noOfYears: Yup.number()
        // .required("Number of years is required")
        .min(0, "Invalid number of years"),
    }),

    onSubmit: (values) => {
      // const handleSubmit = (e) => {
      // e.preventDefault();
      const formData2 = new FormData();
      console.log(id)
      formData2.append("job_details", id);
      
      formData2.append("user", user.id);
      formData2.append("resume", existingResume || uploadedFileName);
      formData2.append("experience", values.experience);
      formData2.append("noofyears", values.noOfYears);

      axios
        .post("http://127.0.0.1:8000/user_apply_for_jobs", formData2, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => setApplyForJobs(res.data))
        .catch((err) => console.log(err));
      // };
    },
   
  });
  console.log(applyForJobs)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/Add_jobseeker_resume/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setExistingResume(res.data[0]);
      });
  }, []);

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };
  const handleFileUpload = async () => {
    if (!resume) {
      alert("Please select a file first");
      return;
    }
    const formData = new FormData();
    formData.append("Resume", resume);
    axios
      .post("http://127.0.0.1:8000/Add_jobseeker_resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const fileName = res.data.Resume.split("document/")[1];
        setUploadedfileResume(fileName);
      });
  };

  // console.log(takeResume);
  return (
    <>
      <div className="apply-wrapper">
        {user ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="select-resume">
              <div>
                {existingResume && <div> {existingResume.Resume}</div>}
              </div>

              <div>
                <label>Add new resume</label>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" onClick={handleFileUpload}>
                  Upload
                </button>
                {uploadedFileName && (
                  <div>Uploaded file: {uploadedFileName}</div>
                )}
              </div>
            </div>
            <div>
              <label>Experience:</label>
            </div>
            <div>
              <label>Job Title</label>
            </div>

            <input
              type="text"
              className="input-field"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
            />
            <div>
              <label>No of years</label>
            </div>
            <input
              type="text"
              className="input-field"
              name="noOfYears"
              value={formik.values.noOfYears}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
            />
            <div className="button-wrapper">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div>please login</div>
        )}

        {/* <PostDetails jobApplication={handleSubmit} id={id} /> */}
      </div>
    </>
  );
}

export default UserJobApplication;
