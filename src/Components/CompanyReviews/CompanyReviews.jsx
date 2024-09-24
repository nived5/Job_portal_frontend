import React, { useEffect, useState } from "react";
import "./companyreview.css";
import axios from "axios";
import { Button, Card } from "react-bootstrap";

function CompanyReviews() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/CompanyDetails")
      .then((res) => setDetails(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="review-wrapper">
      <h1 className="font">Find great places to work</h1>
      <h3>Get access to millions of company reviews</h3>
      <div className="input-wrap2">
        <input className="review-ip" type="text" placeholder="Search companies..." />
        <button className="button-ip">Find Companies</button>
      </div>

      <div className="card-container">
        {details.length > 0 ? (
          details.map((detail, index) => (
            <div className="card" key={index}>
              <img className="card-image" src={detail.logo} alt={`${detail.company_name} logo`} />
              <div className="card-content">
                <h3>{detail.company_name}</h3>
                <p>{detail.company_details}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No company details available.</p>
        )}
      </div>
    </div>
  );
}

export default CompanyReviews;
