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
  const [existingResume, setExistingResume] = useState([]);
  const [resume, setResume] = useState(null);
  const [uploadedFileName, setUploadedfileResume] = useState([]);
  const user = useSelector((state) => state.user);

  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      experience: "",
      noofyears: "",
      phoneno: "",
    },
    validationSchema: Yup.object({
      experience: Yup.string().required("Job title is required"),
      noofyears: Yup.string().required("Number of years is required"),
      phoneno: Yup.string().required("phoneno required"),
      // .min(0, "Invalid number of years"),
    }),

    onSubmit: (values) => {
      // const handleSubmit = (e) => {
      // e.preventDefault();
      const formData2 = new FormData();
      // console.log(id);
      formData2.append("job_details", id);
      formData2.append("user", user.id);
      formData2.append("resume", existingResume.id);
      formData2.append("experience", values.experience);
      formData2.append("noofyears", values.noofyears);
      formData2.append("new_resume", resume);
      formData2.append("phoneno", values.phoneno);
      // formData2.append("phoneno",user.phoneno)

      console.log(formData2.get("phoneno"));

      axios
        .post("http://127.0.0.1:8000/user_apply_for_jobs", formData2, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setApplyForJobs(res.data);
          alert("Applied successfully!");
          formik.resetForm();
        })
        .catch((err) => console.log(err));

      console.log(applyForJobs);
    },
  });
  // console.log(applyForJobs)

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/Add_jobseeker_resume", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setExistingResume(res.data[0]);
      })
      .catch((err) => console.log(err));
    console.log(existingResume + "hello");
  }, [id]);
  // console.log(existingResume);

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
    console.log(formData.get("Resume"));
    axios
      .post("http://127.0.0.1:8000/Add_jobseeker_resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const fileName = res.data.Resume.split("document/")[1];
        // console.log(re);
        setUploadedfileResume(fileName);
        console.log(fileName);
      });
    // console.log(uploadedFileName+"ttttttttt")
  };

  // console.log(takeResume);
  return (
    <>
      <div className="apply-wrapper">
        {user ? (
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            method="POST"
          >
            <div className="select-resume">
              <div>
                {existingResume && (
                  <div>Existing Resume: {existingResume.Resume}</div>
                )}
              </div>

              <div>
                <label>Add new resume</label>
                <input type="file" onChange={handleFileChange} />
                <button type="button" onClick={handleFileUpload}>
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
              name="noofyears"
              value={formik.values.noofyears}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
            />
            <p>{formik.errors.noofyears}</p>
            <div>
              {/* Email:{user.email} */}
              {/* Phoneno:{user.phoneno} */}
              <label>Phone no</label>
            </div>
            <input
              type="text"
              className="input-field"
              name="phoneno"
              value={formik.values.phoneno}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.phoneno}</p>

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
