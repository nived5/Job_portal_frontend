import React, { useState } from "react";
import "./addqualifiction.css";

function AddQualification() {

  const [educationField,setEducationField]= useState("")
  const handleEducationChange = (index, event) => {
    const values = [...educationField];
    values[index].value = event.target.value;
    setEducationFields(values);
  };

  const addEducationField=()=>{
    setEducationField([...educationField,{value:""}])
  }
  return (
    <div>
      <form className="form-wrapper">
        <div>
          <div>
            <div>
              <h3>Qualifications</h3>
            </div>
            <div>
              <div>
                <h3>Education</h3>
              </div>
              <label>
                <h4>Higher secondary</h4>
              </label>
              <input type="text" className="input" />
              <label>
                <h3>Degree</h3>
              </label>
              <input type="text" className="input" />
              <div className="addmore">
                <div>
                  <label>
                    <h4  style={{color:"darkblue"}}>Add more</h4>
                  </label>
                </div>
                <div style={{marginLeft:"500px",alignItems:"center",justifyContent:"center"}} onClick={addEducationField}>
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3>Skills</h3>
              </div>
              <label>
                <h4>Add your skills</h4>
              </label>
              <input type="text" className="input" />
            </div>
            <div className="addmore">
                <div>
                  <label>
                    <h4  style={{color:"darkblue"}}>Add more</h4>
                  </label>
                </div>
                <div style={{marginLeft:"500px",alignItems:"center",justifyContent:"center"}} onClick={<input type="text"/>}>
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div className="qualification-button">
                <button>Submit</button>
              </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddQualification;
