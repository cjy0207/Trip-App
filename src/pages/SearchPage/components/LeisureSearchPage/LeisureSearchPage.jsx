import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLeisure from "../../../../hooks/useLeisure";
import "bootstrap/dist/css/bootstrap.min.css";

const LeisureSearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || ""; // URL에서 검색어 가져오기

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Custom hook 사용
  const { leisure, loading, error, hasMore } = useLeisure(page, pageSize);

  // 검색어가 변경되면 페이지를 초기화
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Leisure Search</h1>

      <div>
        {/* 로딩 상태 */}
        {loading && <p>Loading leisure data...</p>}
        {/* 에러 처리 */}
        {error && <p className="text-danger">Error: {error}</p>}
        {/* 검색 결과 없음 */}
        {!loading && leisure.length === 0 && <p>No leisure activities found.</p>}

        {/* 검색 결과 리스트 */}
        <div className="list-group">
          {leisure.map((item, index) => (
            <div key={index} className="list-group-item mb-3">
              <div className="row">
                <div className="col-4">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-8">
                  <h5>{item.title}</h5>
                  <p>Location: {item.location || "Unknown"}</p>
                  <p>Description: {item.description || "No description available"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더 보기 버튼 */}
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

export default LeisureSearchPage;