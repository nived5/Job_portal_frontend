
import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./front.css";
import { useNavigate } from "react-router-dom";
import "./search.css"

function SearchJobs() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setJobTitle(e.target.value);
    if (e.target.value.length > 0) {
      const searchSuggestions = jobs.filter((job) =>
        job.job_title.toLowerCase().includes(e.target.value.toLowerCase())||
      job.place.toLowerCase().includes(location.toLowerCase())
      );
      setSuggestions(searchSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/job_post_add")
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    const searchResult = jobs.filter(
      (job) =>
        job.job_title.toLowerCase().includes(jobTitle.toLowerCase()) ||
        job.place.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredJobs(searchResult);
  };

  const handleSuggestionClick = (suggestion) => {
    setJobTitle(suggestion.job_title);
    setLocation(suggestion.place);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <input
        className="input-wrap"
        placeholder="job title, keyword, or company"
        value={jobTitle}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.job_title}
            </div>
          ))}
        </div>
      )}
      <input
        className="input1"
        placeholder="city, state, zipcode"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.job_title}
            </div>
          ))}
        </div>
      )}
      <button className="button" onClick={handleSearch}>
        Find Jobs
      </button>
      <div>
        {filteredJobs.map((ele, index) => (
          <div key={index}>
            <h3>{ele.job_title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchJobs;

