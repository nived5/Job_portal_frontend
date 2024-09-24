import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./navbar.css";
import { useNavigate } from 'react-router-dom';
import { initialState, updateUser } from '../../redux/slices/userSlice';

function AdminNavBar() {
    const user = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleToggle = () => {
        setIsOpen(!isOpen);
      };
      
  return (
   <nav className='admin-nav'>
    <div className='admin-nav'>
        {user.account_type=="admin"?(<div className="nav-wrapper">
          <div className="logo-wrapper">
            <img src="/images/logo.jpg" alt="" className="logo" />

            <h1 className="aclonica-regular ">Hirehub</h1>
          </div>

          <div className="list-items">
            <ul className="wrapper">
              <li onClick={() => navigate("/adminpage")}>
                <h3>Home</h3>
              </li>

              {/* <li onClick={() => navigate("/companyreviews")}>
                <h3>Companies</h3>
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
                        
                       
                        <button
                          className="dropdown-item logout_button"
                          onClick={() => {
                            dispatch(updateUser(initialState));
                            navigate("/loginpage");
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
            <li onClick={() => navigate("/profile")} className="employer2">
              {/* <h3>Employers/Post Job</h3> */}
              <div className="text-wrapper">
                <div
                // className="font-styling1"
                // onClick={() => navigate("/profile")}
                >
                  {/* <h3 className="resume">Post Your Resume </h3> */}
                </div>

                {/* <div className="font-styling2">
                  <h3> It takes only a few seconds</h3>
                </div> */}
              </div>
            </li>
          </div>
        </div>):(<div></div>)}
    
    </div>
   </nav>
  )
}

export default AdminNavBar