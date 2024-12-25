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

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { results, loading, error, hasMore } = useSearch(searchQuery, page, pageSize);

  useEffect(() => {
    setPage(1); // 검색어가 변경되면 페이지를 초기화
  }, [searchQuery]);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container mt-4">
      {/* 검색 배너 */}
      <Banner onSearch={handleSearch} />

      {/* 검색 결과 표시 */}
      <div>
        {loading && page === 1 && <p>Loading results...</p>}
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "Load More" 버튼 */}
        {hasMore && (
          <button
            onClick={loadMore}
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            Load More
          </button>
        )}

        {loading && page > 1 && <p>Loading more results...</p>}
      </div>
    </div>
  );
};

export default SearchPage;