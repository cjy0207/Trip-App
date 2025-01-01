import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Banner.style.css";

const Banner = ({ onSearch, className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className={`banner-container ${className}`}>
      <Form className="banner-form" onSubmit={handleSearch}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="banner-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="banner-icon-btn">
            <FaSearch className="banner-icon" />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Banner;