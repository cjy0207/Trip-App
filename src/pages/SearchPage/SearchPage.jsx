import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import Banner from "../component/Banner/Banner";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [currentFilter, setCurrentFilter] = useState("all"); // 현재 필터 상태
  const [page, setPage] = useState(1); // 현재 페이지
  const pageSize = 20; // 한 페이지당 데이터 수
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery); // 디바운싱된 검색어

  // 디바운싱 로직
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms 이후에 검색어 적용

    return () => {
      clearTimeout(handler); // 기존 타이머 제거
    };
  }, [searchQuery]);

  // 레저 및 숙박 데이터를 검색
  const { results, loading, error } = useSearch(
    debouncedQuery,
    currentFilter === "leisure" ? [28] : currentFilter === "accommodation" ? [32] : [32, 28],
    page,
    pageSize
  );

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType);
    setPage(1); // 필터 변경 시 페이지를 초기화
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber); // 선택된 페이지로 설정
  };

  return (
    <div className="container mt-4">
      {/* 배너 */}
      <Banner onSearch={handleSearch} />

      {/* 필터링 버튼 */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn ${
            currentFilter === "all" ? "btn-primary" : "btn-outline-primary"
          } mx-2`}
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className={`btn ${
            currentFilter === "accommodation" ? "btn-primary" : "btn-outline-primary"
          } mx-2`}
          onClick={() => handleFilterChange("accommodation")}
        >
          Accommodation
        </button>
        <button
          className={`btn ${
            currentFilter === "leisure" ? "btn-primary" : "btn-outline-primary"
          } mx-2`}
          onClick={() => handleFilterChange("leisure")}
        >
          Leisure
        </button>
      </div>

      {/* 검색 결과 표시 */}
      <div>
        {loading && <p>Loading results...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {!loading && results.length === 0 && <p>No results found.</p>}

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
                  <p>
                    Type: {item.contenttypeid === 32 ? "Accommodation" : "Leisure"}
                  </p>
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
    </div>
  );
};

export default SearchPage;