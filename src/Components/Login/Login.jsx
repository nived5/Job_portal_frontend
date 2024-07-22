import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { updateUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const user = useSelector((state) => state.user)
  const formik = useFormik({
    initialValues: { username: "", password1: "" },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "username should contain atleast 3 characters")
        .max(25, "username is too long")
        .required("username is required"),
      password1: Yup.string()
        .min(8, "password should contain atleast 8")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Password should contain Uppercase special charecters and numbers "
        )
        .required("please secure your account with the password"),
    }),
    onSubmit: async (values) => {
      console.log(values)
      axios
        .post("http://127.0.0.1:8000/UserLogin", values, 
          
          {
            headers:{
              "Content-Type":"multipart/form-data"
            }
          }
        )
        .then((res) => {
          console.log(res.data.result);
          dispatch(updateUser({...user, id:res.data.result.id,username: res.data.result.username,name:res.data.result.name,phoneno:res.data.result.phoneno,account_type:res.data.result.type}))
          
        })
        .catch((err) => console.log(err));
      navigate("/");
    },
  });
console.log(formik.errors)
  return (
    <div className="log-wrapper">
      <div className="login-wrapper">
        <h1 className="font-style">Login Here</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>UserName</label>
          </div>
          <input
            type="text"
            placeholder="Enter your Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <p>{formik.errors.username}</p>

          <div>
            <label>Password</label>
          </div>
          <input
            type="password"
            name="password1"
            value={formik.values.password1}
            onChange={formik.handleChange}
          />
          <p>{formik.errors.password1}</p>
          <div className="button-wrapper">
            <button type="submit" className="button-styling">
              Login
            </button>
          </div>

          <h4>Do you have an account?</h4>
          <Link to="/signup">SignUp</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
