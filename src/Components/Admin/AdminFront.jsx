import axios from "axios";
import React, { useEffect, useState } from "react";
import "./admin.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";

function AdminFront() {
  const [count, setCount] = useState("");
  const [userCount, setUserCount] = useState("");
  const [postCount, setPostCount] = useState("");
  const [appliedJobsList, setAppliedJobsList] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/CountView").then((res) => {
      setCount(res.data.count || 0);
    });
    // console.log(count)
    axios
      .get("http://127.0.0.1:8000/UsersCountView")
      .then((res) => setUserCount(res.data.count1 || 0));
    console.log(userCount);

    axios.get("http://127.0.0.1:8000/TotalNoofJobPost").then((res) => {
      setPostCount(res.data.postCount);
    });

    axios.get("http://127.0.0.1:8000/applied_jobs_view").then((res) => {
      setAppliedJobsList(res.data);
    });
    console.log(appliedJobsList);
  }, []);
  const data = [
    {
      name: "Total Jobs Posted",
      count: postCount,
    },
    {
      name: "Total Applied Jobs",
      count: count,
    },
    {
      name: "Total Users",
      count: userCount,
    },
  ];

  return (
    <div>
      <h2 className="title">Details</h2>
      <div className="App">
        <table>
          <tr>
            <th>Total No of jobs posted</th>
            <th>Total No of Appllied jobs</th>
            <th>Total no of users</th>
          </tr>
          <tr>
            <td>{postCount}</td>
            <td>{count}</td>
            <td>{userCount}</td>
          </tr>
        </table>
      </div>
      <h2 className="title">Chart</h2>
      <div
        style={{
          width: "70%",
          height: 400,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              right: 30,
              left: 140,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray={"2 2"} />
            <XAxis dataKey={"name"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="	#98fb98" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  );
}

export default AdminFront;
