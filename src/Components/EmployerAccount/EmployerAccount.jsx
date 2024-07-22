import React from "react";
import "./employeraccount.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as idGenerator } from "uuid"

function EmployerAccount() {
const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      
      job_title: "",
      companyName: "",
      place:"",
      description: "",
      Qualification: "",
      salary: "",
    },
    validationSchema: Yup.object({
      job_title: Yup.string().required("This field is required"),
      companyName: Yup.string().required("This field is required"),
      place:Yup.string().required("This field is required"),
      description: Yup.string().required("This field is required"),
      Qualification: Yup.string().required("This field is required"),
      salary: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const data = await axios.post("http://127.0.0.1:8000/job_post_add", {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          _id:idGenerator(),
          job_title: values.job_title,
          companyName: values.companyName,
          place:values.place,
          description: values.description,
          Qualification: values.Qualification,
          salary: values.salary,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  console.log(formik.errors);

  return (
    <>
      <div className="account-wrapper">
        <div className="image2-wrapper">
          <div>
            <h2>Post your jobs here...</h2>
            <img
              src="/images/Illustration3.jpg"
              alt="image"
              className="image2-styling"
            />
          </div>
          <h3>
            You haven't posted a job before, so you'll need to create an
            employer account.
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>
                <h3>Job title*</h3>
              </label>
            </div>
            <input
              type="text"
              className="input-employer"
              name="job_title"
              value={formik.values.job_title}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.job_title}</p>

            <div>
              <label>
                <h3>Company name*</h3>
              </label>
            </div>
            <input
              className="input-employer"
              type="text"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.companyName}</p>

            <div>
              <label>
                <h3>Place*</h3>
              </label>
            </div>
            <input
              className="input-employer"
              type="text"
              name="place"
              value={formik.values.place}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.place}</p>

            <div>
              <label>
                <h3>Job details*</h3>
              </label>
            </div>
            <input
              className="input-employer"
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.description}</p>
            <div>
              <label>
                <h3>Qualifications </h3>
              </label>
            </div>
            <input
              className="input-employer"
              type="text"
              name="Qualification"
              value={formik.values.Qualification}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.Qualification}</p>
            <div>
              <label>
                <h3>Salary details </h3>
              </label>
            </div>
            <input
              className="input-employer"
              type="text"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.salary}</p>
            {/* <div>
                <label><h3>Your phone number</h3></label>
            </div>
            <input  className="input-employer"type="text"/> */}
            <button className="empl-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmployerAccount;
