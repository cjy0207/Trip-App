import React from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./Banner.style.css"; 

const Banner = () => {
  return (
    <div className="banner-container">
      <Form className="banner-form">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="위치"
            className="banner-input"
          />
          <FaSearch className="banner-icon" />
        </div>
      </Form>
    </div>
  );
};

export default Banner;