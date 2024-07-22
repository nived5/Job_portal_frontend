import React, { useEffect } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios";

function SignUp() {
const navigate = useNavigate()

    const formik=useFormik({
        initialValues:{
            username:"",
            password1:"",
            password2:"",
            Name:"",
            email:"",
            phoneno:"",
            place:"",
          
          
        },
        validationSchema:Yup.object({
            username:Yup.string()
            .min(3,"Username should contain atleast 3 charecters")
            .max(25,"Username is too long")
            .required("Username is required"),
            password1:Yup.string()
            .min(8,"Password should contain atleast 8 charecters")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"Password should contain Uppercase special charecters and numbers ")
            .required("Password is required"),
            password2:Yup.string()
            .oneOf([Yup.ref("password1")],"Password must be same")
            .required("Please confirm your password"),
            Name:Yup.string()
            .required("Name is required "),
            email:Yup.string()
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Email is not valid")
            .required("Email is required "),
            phoneno:Yup.string()
                // .matches(/^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/,"Phone no is not  valid")
                .required("Phone no is required"),
            place:Yup.string()
            .required("Place is required"),
           

        }),
        onSubmit: async(values) =>{
          // console.log(values)
        
          axios
          .post("http://127.0.0.1:8000/user_registration",values, {
            headers:{
              "Content-Type":"multipart/form-data"
            }
         
          })
          .then((res)=>{
          console.log(res.data)})
          .catch(err =>console.log(err))
         navigate('/')
          
        }
        

    })
    console.log(formik.errors)
  return (
    <>
      <div className="wrapper1">
        <div className="signup-wrapper">
          <h1>Sign Up</h1>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div>
                <label>Username</label>
              </div>
              <input type="text" 
              placeholder="Enter your Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              className="label"
              
              />
              <p>{formik.errors.username}</p>
              <div>
                <label>Password</label>
              </div>
              <input type="password" 
              placeholder="Enter your Password"
              name="password1"
              value={formik.values.password1}
              onChange={formik.handleChange}
              className="label"
              />
              <p>{formik.errors.password1}</p>

             
              <div>
                <label>Confirm password</label>
              </div>
              <input type="password" 
              placeholder="Re-Enter your password"
              name="password2"
              value={formik.values.password2}
              onChange={formik.handleChange}
              className="label"
              />
              <p>{formik.errors.password2}</p>

              <div>
                <label>Name</label>
              </div>
              <input type="text" 
              placeholder="Enter your Name"
              name="Name"
              value={formik.values.Name}
              onChange={formik.handleChange}
              className="label"
              />
               <p>{formik.errors.Name}</p>

              <div>
                <label>Email</label>
              </div>
              <input type="text" 
              placeholder="Enter your Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="label"
              />
              <p>{formik.errors.email}</p>
              <div>
                <label>Phone No</label>
              </div>
              <input type="text" 
              placeholder="Enter your Phone number"
              name="phoneno"
              value={formik.values.phoneno}
              onChange={formik.handleChange}
              className="label"/>
              <p>{formik.errors.phoneno}</p>


              <div>
                <label>Place</label>
              </div>
              <input type="text" 
              placeholder="Enter your Place"
              name="place"
              value={formik.values.place}
              onChange={formik.handleChange}
              className="label"
              />
              <p>{formik.errors.place}</p>
              
              <div className="button2">
                <button className="signup-button" type="submit">SignUp</button>
              </div>
              <Link to="/loginpage">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
