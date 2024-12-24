import React, { useState } from "react";
import useAccommodation from "../../hooks/useAccommodation";
import Banner from "../component/Banner/Banner";

const HomePage = () => {
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const pageSize = 10; // 페이지 당 데이터 수

  const { accommodations, loading, error, hasMore } = useAccommodation(page, pageSize);

  // 다음 페이지를 불러오는 핸들러
  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container mt-4">
      <Banner/>
      <h1>Accommodation Finder</h1>
      <p>Explore all accommodations with pagination!</p>

      {/* 로딩 상태 표시 */}
      {loading && page === 1 && <p>Loading accommodations...</p>} {/* 첫 페이지 로딩 메시지 */}

      {/* 에러 메시지 표시 */}
      {error && <p className="text-danger">Error: {error}</p>}

      {/* 숙박 데이터 출력 */}
      <div className="row">
        {accommodations.map((item) => (
          <div key={item.contentid} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.addr1}</p>
                <p className="card-text">
                  {item.tel ? `Contact: ${item.tel}` : "No contact available"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 더 보기 버튼 */}
      {hasMore && !loading && (
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={loadMore}
            disabled={loading}
          >
            Load More
          </button>
        </div>
      )}

      {/* 로딩 상태 표시 */}
      {loading && page > 1 && <p>Loading more accommodations...</p>} {/* 추가 로딩 메시지 */}
    </div>
  );
};

export default HomePage;