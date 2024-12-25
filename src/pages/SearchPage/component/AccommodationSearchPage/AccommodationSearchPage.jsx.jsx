import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useSearch from "../../../../hooks/useSearch";

const AccommodationSearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [page, setPage] = useState(1); // 현재 페이지
  const pageSize = 20; // 한 페이지당 데이터 수

  // 숙박 데이터를 검색 (contentTypeId: 32)
  const { results, loading, error } = useSearch(searchQuery, [32], page, pageSize);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber); // 선택된 페이지로 설정
  };

  return (
    <div className="container mt-4">
      <h2>Accommodation Search</h2>
      {loading && <p>Loading accommodations...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && results.length === 0 && <p>No accommodations found.</p>}

      <div className="list-group">
        {results.map((item, index) => (
          <div key={index} className="list-group-item mb-3">
            <div className="row">
              <div className="col-4">
                <img
                  src={item.firstimage || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-8">
                <h5>{item.title}</h5>
                <p>Address: {item.addr1 || "Unknown address"}</p>
                <p>Contact: {item.tel || "Not available"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        {Array.from({ length: Math.ceil(results.length / pageSize) }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn mx-1 ${
              page === pageNumber ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccommodationSearchPage;