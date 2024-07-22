import React from "react";
import "./salaryguide.css";
function SalaryGuide() {
  return (
    <>
      <div>
        <div className="salary-wrapper">
          <div className="font-style3">
            <h2>Build a Career you'll love</h2>
          </div>
          <div className="inside-wrapper">
            <div>
              <h3>What</h3>
              <input className="input-salary" type="text" />
            </div>
            <div>
              <h3>where</h3>
              <input className="input-salary" type="text" />
            </div>
            <div className="button4">
              <button className="search-button">Search</button>
            </div>
      
          </div>
        </div>
      </div>
    </>
  );
}

export default SalaryGuide;
