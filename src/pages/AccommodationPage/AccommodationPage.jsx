import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { useAccommodationQuery } from "../../hooks/useAccommodation";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import Map from "../component/Map/Map";

const AccommodationPage = () => {
  const [page, setPage] = useState(1);
  const [allAccommodations, setAllAccommodations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const pageSize = 10;

  const navigate = useNavigate(); // useNavigate 사용

  const { data: accommodations, isFetching } = useAccommodationQuery(page, pageSize);

 

  useEffect(() => {
    if (accommodations) {
      setAllAccommodations((prev) => [...prev, ...accommodations]);
    }
  }, [accommodations]);

  const handleCardButtonClick = (location) => {
    setSelectedLocation(location);
  };

  // 검색 핸들러 추가
  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=accommodation`);
  };

  // 카드 클릭 핸들러 추가
  const handleCardClick = (accommodation) => { // 수정
    navigate(`/search/accommodation/detail/${accommodation.contentid}`, { state: { accommodation } }); // 수정
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="accommodation" />
      <h1>Accommodations</h1>
      <div className="row">
        {/* 왼쪽 지도 영역 */}
        <div className="col-md-4 mb-4 mt-3">
          <div style={{ position: "sticky", top: "80px" }}>
            {selectedLocation ? (
              <Map
                latitude={selectedLocation.lat}
                longitude={selectedLocation.lng}
                address={selectedLocation.address}
              />
            ) : (
              <p>지도를 보려면 "지도 보기" 버튼을 클릭하세요.</p>
            )}
          </div>
        </div>

        {/* 오른쪽 카드 리스트 영역 */}
        <div className="col-md-8">
          {/* CardList에 onCardClick 속성 추가 */}
          <CardList
            items={allAccommodations}
            onCardClick={handleCardClick} // 수정
            onButtonClick={handleCardButtonClick}
          />
          {isFetching && <p>Loading more...</p>}
        </div>
      </div>        
    </div>
  );
};

export default AccommodationPage;
