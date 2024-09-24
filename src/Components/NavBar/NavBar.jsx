

import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initialState, updateUser } from "../../redux/slices/userSlice";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigate = useNavigate();
  return (
    <nav className="nav-wrapper">
      <div className="logo-wrapper">
        <img src="/images/logo.jpg" alt="" className="logo" />
        <h1 className="aclonica-regular">Hirehub</h1>
      </div>

      {/* Hamburger Menu for Mobile View */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className={`nav-items ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
        {user.account_type === "Job seeker" ? (
          <>
            <div>
              {" "}
              <ul className="list-items">
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/companyreviews")}>
                  Company Details
                </li>
              </ul>
            </div>

            {user.username ? (
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
                  <div className="dropdown">
                    <li onClick={handleToggle}>
                      <i className="fa-solid fa-user"></i>
                    </li>
                    {isOpen && (
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/profile")}
                        >
                          Profile
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/savedjobs")}
                        >
                          Saved jobs
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/viewappliedjobs")}
                        >
                          Applied Jobs
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </ul>
            ) : (
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
            )}

            <div className="logout-div">
              <button
                className="logout-button"
                onClick={() => {
                  dispatch(updateUser(initialState));
                  navigate("/loginpage");
                }}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          </>
        ) : user.account_type === "Employer" ? (
          <>
            <ul className="list-items">
              <li onClick={() => navigate("/")}>Home</li>
            </ul>

            {user.username ? (
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
                  <div className="dropdown">
                    <li onClick={() => navigate("/profile")}>
                      <i className="fa-solid fa-user"></i>
                    </li>
                    {isOpen && (
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/profile")}
                        >
                          Profile
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/viewjobpost")}
                        >
                          Added jobs
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/companydetails")}
                        >
                          Add company Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </ul>
            ) : (
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
            )}

            <div className="logout-div">
              <button
                className="logout-button"
                onClick={() => {
                  dispatch(updateUser(initialState));
                  navigate("/loginpage");
                }}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          </>
        ) : user.account_type === "admin" ? (
          <>
            <ul className="list-items">
              <li onClick={() => navigate("/adminpage")}>Home</li>
            </ul>

            {user.username ? (
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
                  <div className="dropdown">
                    <li onClick={handleToggle}>
                      <i className="fa-solid fa-user"></i>
                    </li>
                    {isOpen && (
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/managerlist")}
                        >
                          Manager List
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/adminapplliedjobslist")}
                        >
                          Applied jobs
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/jobseekerlist")}
                        >
                          Job Seeker List
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/joblistadmin")}
                        >
                          Job Post List
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </ul>
            ) : (
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
            )}

            <div className="logout-div">
              <button
                className="logout-button"
                onClick={() => {
                  dispatch(updateUser(initialState));
                  navigate("/loginpage");
                }}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
}

export default NavBar;
