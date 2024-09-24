import axios from 'axios'
import React, { useEffect, useState } from 'react'

function JobPostList() {

    const [jobList,setJobList] = useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/JobPostListAdminView")
        .then((res)=>{setJobList(res.data)})
    })
    const handleDelete = (id)=>{
        axios
        .delete(`http://127.0.0.1:8000/delete_job_post/${id}`)
        .then(()=>{setJobList(jobList.filter(Add_job => Add_job.id !== id))})
        .catch((err)=>console.log(err))

    }
  return (
    <div>
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th>Job Posts</th>
              <th>Delete</th>
              
            </tr>
          </thead>
          <tbody>
            {jobList.map((ele,index) => {
                return(<tr key={index}>
                <td>{ele.job_title}</td>
                <td><button onClick={()=>handleDelete(ele.id)}><i className="fa-solid fa-trash"></i></button></td>
                
              </tr>)
              
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JobPostList