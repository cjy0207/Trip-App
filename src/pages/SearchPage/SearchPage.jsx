import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "../component/Banner/Banner";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query) => {
    // 현재 경로를 유지하며 검색어를 URL에 추가
    const currentPath = location.pathname;
    navigate(`${currentPath}?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} />

      <div className="mb-4 d-flex justify-content-center">
        <Link
          to="/search"
          className={`btn ${location.pathname === "/search" ? "btn-success" : "btn-primary"} me-2`}
        >
          Accommodation
        </Link>
        <Link
          to="/search/leisure"
          className={`btn ${
            location.pathname === "/search/leisure" ? "btn-success" : "btn-primary"
          } me-2`}
        >
          Leisure
        </Link>
        <Link
          to="/search/festival"
          className={`btn ${
            location.pathname === "/search/festival" ? "btn-success" : "btn-primary"
          } me-2`}
        >
          Festival
        </Link>
        <Link
          to="/search/transport"
          className={`btn ${
            location.pathname === "/search/transport" ? "btn-success" : "btn-primary"
          }`}
        >
          Transport
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default SearchPage;