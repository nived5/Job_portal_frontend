import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import "./adddetails.css";
import convertToBase64 from "../../utils/convertToBase64";

function AddCompanyDetails() {
  const [addDetails, setAddDetails] = useState([]);
  const [image64, setImage64] = useState([]);
  const getBase64Image = async (file) => {
    try {
      const base64 = await convertToBase64(file);
      setImage64(base64);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      company_name: "",
      company_details: "",
    },
    // onSubmit: (values) => {
    //   axios
    //     .post("http://127.0.0.1:8000/CompanyDetails", {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //       company_name: values.company_name,
    //       logo: values.logo,
    //       company_details:values.company_details,
    //     })
    //     .then((res) => {
    //       setAddDetails(res.data);
    //     })
    //     .catch((err) => console.log(err));
    // },

    onSubmit: async (values) => {
      try {
        const formdata = new FormData();
        formdata.append("company_name", values.company_name),
          formdata.append("company_details", values.company_details),
          formdata.append("logo", image64);
        if (image64) {
          const response = await axios.post(
            "http://127.0.0.1:8000/CompanyDetails",
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          // setImage64(null)
          formik.resetForm();
          // .then((res)=>{setAddDetails(res.data)})
          setAddDetails(response.data);
          alert("Submitted succesfully")
        } else {
          alert("please select image");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="details">
            <div className="label-stylig">
              <label>Company Name</label>
            </div>

            <input
              type="text"
              name="company_name"
              value={formik.values.company_name}
              onChange={formik.handleChange}
              className="input-styling"
            />
            <div>
              {" "}
              <label className="label-stylig">Logo</label>
            </div>

            <input
              type="file"
              onChange={(e) => getBase64Image(e.target.files[0])}
              className="input-styling"
            />
            <div className="label-stylig">
              <label>Company Details</label>
            </div>

            <input
              type="text"
              name="company_details"
              value={formik.values.company_details}
              onChange={formik.handleChange}
              className="input-styling"
            />
            <div className="button-div">
              <button type="submit" className="button-styling">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCompanyDetails;
