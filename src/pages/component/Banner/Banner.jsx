import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 수정: useNavigate 추가
import "./Banner.style.css";

const Banner = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // 수정: useNavigate 추가

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery); // 수정: searchQuery.trim()을 사용하여 공백만 있는 검색어를 처리
      navigate(`/search?query=${searchQuery}`); // 수정: 검색 후 SearchPage로 이동
    }
  };

  return (
    <div className="banner-container">
      <Form className="banner-form" onSubmit={handleSearch}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="banner-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // 수정: onChange 이벤트 핸들러로 입력값을 상태에 반영
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
