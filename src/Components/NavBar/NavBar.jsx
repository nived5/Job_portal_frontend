import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initialState, updateUser } from "../../redux/slices/userSlice";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  return (
    <nav>
      {user.account_type == "Job seeker" ? (
        <div className="nav-wrapper">
          <div className="logo-wrapper">
            <img src="/images/logo.jpg" alt="" className="logo" />

            <h1 className="aclonica-regular ">Hirehub</h1>
          </div>

          <div className="list-items">
            <ul className="wrapper">
              <li onClick={() => navigate("/")}>
                <h3>Home</h3>
              </li>

              <li onClick={() => navigate("/companyreviews")}>
                <h3>CompanyReviews</h3>
              </li>

              {/* <li onClick={() => navigate("/salaryguide")}>
                <h3>Salary Guide</h3>
              </li> */}
            </ul>
          </div>

          {user.username ? (
            <div>
              <ul className="icons">
                <div className="styling">
                  <li>
                    <i className="fa-regular fa-message"></i>
                  </li>
                </div>
                <div className="styling">
                  <li>
                    <i className="fa-solid fa-bell"></i>
                  </li>
                </div>
                <div className="styling">
                  <div className=" dropdown">
                    <li onClick={handleToggle}>
                      <i className="fa-solid fa-user  "></i>
                    </li>
                    {isOpen && (
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/profile")}
                        >
                          Profile
                        </button>
                        <button className="dropdown-item" onClick={()=>navigate('/savedjobs')}>
                          Saved jobs
                        </button>
                        <button
                          className="dropdown-item logout_button"
                          onClick={() => {
                            dispatch(updateUser(initialState))
                            navigate('/loginpage')
                          }}
                        >
                          LogOut
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </ul>
            </div>
          ) : (
            <div>
              <ul className="signin-wrapper">
                <li>
                  <button
                    className="button-style"
                    onClick={() => navigate("/loginpage")}
                  >
                    <h2>Signin</h2>
                  </button>
                </li>
              </ul>
            </div>
          )}
          <div>
            <li
              onClick={() => navigate("/profile")}
              className="employer2"
            >
              {/* <h3>Employers/Post Job</h3> */}
              <div className="text-wrapper">
                <div
                  // className="font-styling1"
                  // onClick={() => navigate("/profile")}
                >
                  <h3 className="resume">Post Your Resume </h3>
                </div>

                {/* <div className="font-styling2">
                  <h3> It takes only a few seconds</h3>
                </div> */}
              </div>
            </li>
          </div>
        </div>
      ) : (
        <div className="nav-wrapper">
          <div className="logo-wrapper">
            <img src="/images/logo.jpg" alt="" className="logo" />

            <h1>HIRE HUB</h1>
          </div>

          <div className="list-items">
            <ul className="wrapper">
              <li onClick={() => navigate("/")}>
                <h3>Home</h3>
              </li>
            </ul>
          </div>
          <div>
            <ul className="icons">
              <div className="styling">
                <li>
                  <i className="fa-regular fa-message"></i>
                </li>
              </div >
              <div className="styling">
                <li>
                  <i className="fa-solid fa-bell"></i>
                </li>
              </div>
              <div className="styling">
              <div className=" dropdown">
                <li onClick={handleToggle}>
                  <i className="fa-solid fa-user  "></i>
                </li>
                {isOpen && (
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </button>
                    <button className="dropdown-item" onClick={()=>navigate('/viewjobpost')}>Added jobs</button>
                    <button
                      className="dropdown-item logout_button"
                      onClick={() => {
                        dispatch(updateUser(initialState))
                        navigate('/loginpage')
                      }}
                    >
                      LogOut
                    </button>
                   
                  </div>
                )}
              </div>
              </div>
            </ul>
          </div>
          <div>
            <li
              onClick={() => navigate("/employeraccount")}
              className="employer2"
            >
              <h3>Employers/Post Job</h3>
            </li>
          </div>
        </div>
        
      )}
    </nav>
  );
}

export default NavBar;
