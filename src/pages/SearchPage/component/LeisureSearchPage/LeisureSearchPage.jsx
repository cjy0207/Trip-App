import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSearch from "../../../../hooks/useSearch";
import "bootstrap/dist/css/bootstrap.min.css";

const LeisureSearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [page, setPage] = useState(1);
  const pageSize = 20;

  // 레저 데이터를 검색 (contentTypeId: 28)
  const { results, loading, error } = useSearch(searchQuery, [28], page, pageSize);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <h2>Leisure Search</h2>
      {loading && <p>Loading leisure activities...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && results.length === 0 && <p>No leisure activities found.</p>}

      <div className="list-group">
        {results.map((item, index) => (
          <div key={index} className="list-group-item mb-3">
            <h5>{item.title}</h5>
            <p>{item.addr1 || "Unknown address"}</p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        {Array.from({ length: Math.ceil(results.length / pageSize) }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn mx-1 ${page === pageNumber ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeisureSearchPage;