import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFestival from "../../../../hooks/useFestival";
import "bootstrap/dist/css/bootstrap.min.css";

const FestivalSearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || ""; // URL에서 검색어 가져오기

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Custom hook 사용
  const { festivals = [], loading, error, hasMore } = useFestival(page, pageSize, searchQuery);

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
      <h1 className="mb-4">Festival Search</h1>

      <div>
        {/* 로딩 상태 */}
        {loading && <p>Loading festival data...</p>}
        {/* 에러 처리 */}
        {error && <p className="text-danger">Error: {error}</p>}
        {/* 검색 결과 없음 */}
        {!loading && festivals?.length === 0 && <p>No festivals found.</p>}

        {/* 검색 결과 리스트 */}
        <div className="list-group">
          {festivals.map((item, index) => (
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

export default FestivalSearchPage;