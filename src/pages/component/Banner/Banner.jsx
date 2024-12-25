import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./Banner.style.css";

const Banner = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery); // 검색어를 부모로 전달
    }
  };

  return (
    <div className="banner-container">
      <Form className="banner-form" onSubmit={handleSearch}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="숙박 이름을 입력하세요"
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