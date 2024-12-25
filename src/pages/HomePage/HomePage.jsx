import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAccommodation from "../../hooks/useAccommodation";
import useLeisure from "../../hooks/useLeisure";
import Banner from "../component/Banner/Banner";

const HomePage = () => {
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const pageSize = 10; // 페이지 당 데이터 수

  // 각 데이터를 위한 커스텀 훅
  const { accommodations, loading: accLoading, error: accError, hasMore: accHasMore } = useAccommodation(page, pageSize);
  const { leisure, loading: leisureLoading, error: leisureError, hasMore: leisureHasMore } = useLeisure(page, pageSize);

  const navigate = useNavigate();

  // 검색 핸들러
  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  // 다음 페이지를 불러오는 핸들러
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mt-4">
      {/* onSearch prop 전달 */}
      <Banner onSearch={handleSearch} />
      <h1>Information Finder</h1>
      <p>Explore accommodations, leisure spots, transport options, and festivals!</p>

      {/* 숙박 정보 */}
      <section>
        <h2>Accommodations</h2>
        {accLoading && page === 1 && <p>Loading accommodations...</p>}
        {accError && <p className="text-danger">Error: {accError}</p>}
        <div className="row">
          {accommodations.map((item) => (
            <div key={item.contentid} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.addr1}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 레저 정보 */}
      <section>
        <h2>Leisure Spots</h2>
        {leisureLoading && page === 1 && <p>Loading leisure spots...</p>}
        {leisureError && <p className="text-danger">Error: {leisureError}</p>}
        <div className="row">
          {leisure.map((item) => (
            <div key={item.contentid} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.addr1}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 더 보기 버튼 */}
      <div className="text-center">
        {accHasMore || leisureHasMore  ? (
          <button className="btn btn-primary" onClick={loadMore} disabled={accLoading || leisureLoading }>
            Load More
          </button>
        ) : (
          <p>No more data to load.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;