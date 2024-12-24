import React from "react";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchPage = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Search</h1>

      <div className="mb-4 d-flex justify-content-center">
        <Link to="/search" className="btn btn-primary me-2">
          Accommodation
        </Link>
        <Link to="/search/leisure" className="btn btn-primary me-2">
          Leisure
        </Link>
        <Link to="/search/festival" className="btn btn-primary me-2">
          Festival
        </Link>
        <Link to="/search/transport" className="btn btn-primary">
          Transport
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default SearchPage;