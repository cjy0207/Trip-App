import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../component/Banner/Banner";
import useSearch from "../../hooks/useSearch";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

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

  // 숙박 데이터만 검색
  const { results, loading, error } = useSearch(debouncedQuery, [32], page, pageSize);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber); // 선택된 페이지로 설정
  };

  return (
    <div className="container mt-4">
      {/* 배너 */}
      <Banner onSearch={handleSearch} />

      {/* 로딩 상태 */}
      {loading && <p className="text-center">Loading results...</p>}

      {/* 에러 메시지 */}
      {error && <p className="text-danger text-center">Error: {error}</p>}

      {/* 검색 결과 표시 */}
      {!loading && results.length === 0 && <p className="text-center">No accommodations found.</p>}

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
      {results.length > 0 && (
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
      )}
    </div>
  );
};

export default SearchPage;