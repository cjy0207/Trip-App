import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSearch from "../../../../hooks/useSearch";
import "bootstrap/dist/css/bootstrap.min.css";

const AccommodationSearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { results, loading, error, hasMore } = useSearch(searchQuery, page, pageSize);

  useEffect(() => {
    setPage(1); // 검색어가 변경되면 페이지 초기화
  }, [searchQuery]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container mt-4">
      <div>
        {loading && <p>Loading results...</p>}
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

        {hasMore && (
          <button
            onClick={loadMore}
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default AccommodationSearchPage;