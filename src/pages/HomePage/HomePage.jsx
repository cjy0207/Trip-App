import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccommodationQuery } from "../../hooks/useAccommodation";
import Banner from "../component/Banner/Banner";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  // React Query 훅을 통해 숙박 정보 가져오기
  const { data: accommodations, isLoading, isError, error } = useAccommodationQuery(page, pageSize);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // 배너 검색 핸들러: 검색어를 검색 페이지로 전달
  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`); // 검색창으로 이동
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} />
      <h1>Home Page</h1>
      <p>Explore accommodations!</p>

      <section>
        <h2>Accommodations</h2>
        {isLoading && <p>Loading accommodations...</p>}
        {isError && <p>Error: {error.message}</p>}
        <div className="list">
          {accommodations?.map((item) => (
            <div key={item.contentid} className="list-item">
              <h4>{item.title}</h4>
              <p>{item.addr1}</p>
            </div>
          ))}
        </div>
        <button onClick={loadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      </section>
    </div>
  );
};

export default HomePage;