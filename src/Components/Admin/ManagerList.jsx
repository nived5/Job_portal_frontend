
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./managerlist.css";
import { useParams } from "react-router-dom";

function ManagerList() {
  const [managerList, setManagerList] = useState([]);
  const [message, setMessage] = useState("");
  const {id} = useParams()

  useEffect(() => {
    // Fetching the list of managers from the server
    axios.get("http://127.0.0.1:8000/ManagerView")
      .then((res) => {
        setManagerList(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the manager list!", error);
      });
  }, []);

  // Function to handle blocking a user
  const handleBlock = (id) => {
    console.log(id); // Log the ID to verify it's correct
  
    axios
      .patch(`http://127.0.0.1:8000/BlockUserView/${id}/`)
      .then((res) => {
        setMessage(res.data.message); 
        
        // Update the managerList state
        setManagerList(managerList.map((manager) =>
          manager.id === id ? { ...manager, is_blocked: !manager.is_blocked } : manager
        ));
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to block the user.");
      });
  };

  return (
    <div>
      <h2 className="title">Employer List</h2>
      <div className="wrapper">
        
        <table>
          <thead>
            <tr>
              <th>Manager List</th>
              {/* <th>Delete</th> */}
              <th>Block</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {managerList.map((manager, index) => (
              <tr key={index}>
                <td>{manager.username}</td>
                {/* <td>
                  <i className="fa-solid fa-trash"></i>
                </td> */}
                <td>
                  <button onClick={() => handleBlock(manager.id)}>
                    <i className="fa-solid fa-ban"></i>
                  </button>
                </td>
                <td> {manager.is_blocked ? ('Blocked') : ('UnBlocked')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ManagerList;

