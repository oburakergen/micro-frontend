import React from "react";
import "./search-section.css";
import SearchIcon from "../assets/icons/search.svg";
import PhrIcon from "../assets/icons/phr.svg";
import HcpIcon from "../assets/icons/hcp.svg";

export default function SearchSection() {
  return (
    <div className="search-wrapper">
      <div className="search-box">
        <input type="text" placeholder="How can i help you?" />
        <button className="search-icon">
          <img src={SearchIcon} alt="search" />
        </button>
      </div>

      <div className="categories">
        <div className="category-card">
          <div className="icon-circle">
            <img src={PhrIcon} className="cat-icon" alt="PHR" />
          </div>
          <h3>PHR</h3>
          <p>Public Health Relations</p>
        </div>

        <div className="category-card">
          <div className="icon-circle">
            <img src={HcpIcon} className="cat-icon" alt="HCP" />
          </div>
          <h3>HCP</h3>
          <p>Healthcare Professions</p>
        </div>
      </div>
    </div>
  );
}
