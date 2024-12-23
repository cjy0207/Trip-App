import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useAccommodation from "../../hooks/useAccommodation";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchPage = () => {
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const pageSize = 10; // 페이지 당 데이터 수
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const { accommodations, loading, error, hasMore } = useAccommodation(page, pageSize);

  // 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // 검색 시 페이지를 초기화
  };

  // 추가 데이터 로드 핸들러
  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Accommodation Search</h1>

      {/* 검색 필터 */}
      <form onSubmit={handleSearch} className="mb-4 d-flex">
        <input
          type="text"
          placeholder="Search location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control me-2"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="row">
        {/* 지도 영역 */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body" style={{ height: "400px" }}>
              <Map
                center={{ lat: 37.5665, lng: 126.978 }} // 기본 지도 중심 위치: 서울
                style={{ width: "100%", height: "100%" }}
                level={7} // 지도 줌 레벨
              >
                {/* 숙소 데이터를 기반으로 마커 표시 */}
                {accommodations.map((item, index) => (
                  <MapMarker
                    key={index}
                    position={{
                      lat: item.latitude || 37.5665, // 숙소의 위도
                      lng: item.longitude || 126.978, // 숙소의 경도
                    }}
                  >
                    <div style={{ padding: "5px", color: "#000" }}>{item.title}</div>
                  </MapMarker>
                ))}
              </Map>
            </div>
          </div>
        </div>

        {/* 숙소 리스트 영역 */}
        <div className="col-md-6">
          {loading && <p>Loading accommodations...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          {!loading && accommodations.length === 0 && <p>No accommodations found.</p>}

          <div className="list-group">
            {accommodations.map((item, index) => (
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
                    <p>Price: {item.price || "N/A"}</p>
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
    </div>
  );
};

export default SearchPage;