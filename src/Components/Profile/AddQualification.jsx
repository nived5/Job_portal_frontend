// import axios from "axios";
// import { useFormik } from "formik";
// import React, { useState } from "react";
// import "./addqualifiction.css";

// function AddQualification() {
//   const [qualification, setQualification] = useState([]);
//   const formik = useFormik({
//     initialValues: {
//       higher_secondary: "",
//       degree: "",
//       skills: "",
//     },
//     onSubmit: (values) => {
//       const formData = new FormData();
//       formData.append("higher_secondary", values.higher_secondary);
//       formData.append("degree",values.degree);
//       formData.append("skills", values.skills);
//       axios.post("http://127.0.0.1:8000/AddQualification", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res)=>{setQualification(res.data)})
//       .catch((err)=>console.log(err))
//     },
//   });

//   return(<div>
//     <form className="form-wrapper" onSubmit={formik.handleSubmit}>
//       <div>
//         <div>
//           <div>
//             <h3>Qualifications</h3>
//           </div>
//           <div>
//             <div>
//               <h3>Education and percentage of marks</h3>
//             </div>
            
//               <div >
//                 <input
//                   type="text"
//                   className="input"
//                   name = "higher_secondary"
//                   value={formik.values.higher_secondary}
//                   onChange={formik.handleChange}
//                   // placeholder={`Education ${index + 1}`}
//                 />
//               </div>
//               <div>
//               <h3>Degree</h3>
//             </div>
//                <div >
//                 <input
//                   type="text"
//                   className="input"
//                   name = "degree"
//                   value={formik.values.degree}
//                   onChange={formik.handleChange}
//                   // placeholder={`Education ${index + 1}`}
//                 />
//               </div>
            
//             {/* <div className="addmore" onClick={addEducationField}> */}
//               {/* <h4 style={{ color: "darkblue" }}>Add more</h4> */}
//               {/* <i className="fa-solid fa-plus"></i> */}
//             {/* </div> */}
//           </div>
//           <div>
//             <div>
//               <h3>Skills</h3>
//             </div>
            
//               <div>
//                 <input
//                   type="text"
//                   className="input"
//                   name = "skills"
//                   value={formik.values.skills}
//                   onChange={formik.handleChange}
//                   // placeholder={`Skill ${index + 1}`}
//                 />
//               </div>
            
//             {/* <div className="addmore" onClick={addSkillField}>
//               <h4 style={{ color: "darkblue" }}>Add more</h4>
//               <i className="fa-solid fa-plus"></i>
//             </div> */}
//           </div>
//           <div className="qualification-button">
//             <button type="submit">Submit</button>
//           </div>
//         </div>
//       </div>
//     </form>
//   </div>) 
// }

// export default AddQualification;


import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import "./addqualifiction.css";

function AddQualification() {
  const [qualification, setQualification] = useState([]);
  
  const formik = useFormik({
    initialValues: {
      higher_secondary: "",
      degree: "",
      skills: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("higher_secondary", values.higher_secondary);
      formData.append("degree", values.degree);
      formData.append("skills", values.skills);
      axios.post("http://127.0.0.1:8000/AddQualification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setQualification(res.data);
        alert("Qualifications added successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add qualifications.");
      });
    },
  });

  return (
    <div>
      <form className="form-wrapper" onSubmit={formik.handleSubmit}>
        <div>
          <div>
            <div>
              <h3>Qualifications</h3>
            </div>
            <div>
              <div>
                <h3>Education and percentage of marks</h3>
              </div>
              <div>
                <input
                  type="text"
                  className="input"
                  name="higher_secondary"
                  value={formik.values.higher_secondary}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <h3>Degree</h3>
              </div>
              <div>
                <input
                  type="text"
                  className="input"
                  name="degree"
                  value={formik.values.degree}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div>
              <div>
                <h3>Skills</h3>
              </div>
              <div>
                <input
                  type="text"
                  className="input"
                  name="skills"
                  value={formik.values.skills}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div>
              <h4 style={{ color: "darkblue" }}>Add more</h4>
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
          <div className="qualification-button">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddQualification;

