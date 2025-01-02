import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccommodationQuery } from "../../hooks/useAccommodation";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import ScrollToTopButton from "../component/ScrollTop/ScrollToTopButton";

const AccommodationPage = () => {
  const [page, setPage] = useState(1);
  const [allAccommodations, setAllAccommodations] = useState([]);
  const pageSize = 10;


  const navigate = useNavigate();

  const { data: accommodations, isFetching } = useAccommodationQuery(page, pageSize);
  // 데이터를 병합하여 상태 업데이트
  useEffect(() => {
    if (accommodations) {
      setAllAccommodations((prev) => [...prev, ...accommodations]);
    }
  }, [accommodations]);

  // 검색 핸들러
  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}&filter=accommodation`);
    }
  };

  // 카드 클릭 핸들러 추가
  const handleCardClick = (accommodation) => { // 수정
    navigate(`/search/accommodation/detail/${accommodation.contentid}`, { state: { accommodation } }); // 수정
  };

  // Load More 버튼 클릭 핸들러
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // 더 로드할 데이터가 있는지 여부를 체크
  const hasMore = accommodations?.length === pageSize;

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="accommodation" />
      <h1>Accommodations</h1>
      <CardList items={allAccommodations} onCardClick={handleCardClick} />
      {isFetching && <p>Loading...</p>}
      {hasMore && !isFetching && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button onClick={loadMore} className="btn btn-success mb-5">
            Load More
          </button>
        </div>
      )}
      <ScrollToTopButton/>
    </div>
  );
};

export default AccommodationPage;