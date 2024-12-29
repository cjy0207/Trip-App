import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFestivalQuery } from "../../hooks/useFestival";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import Map from "../component/Map/Map";

const FestivalPage = () => {
  const [page, setPage] = useState(1);
  const [allFestivals, setAllFestivals] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: festivals, isFetching } = useFestivalQuery(page, pageSize);

  useEffect(() => {
    if (festivals) {
      setAllFestivals((prev) => [...prev, ...festivals]);
    }
  }, [festivals]);

  const handleCardButtonClick = (location) => {
    setSelectedLocation(location);
  };

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=festival`);
  };

  const handleCardClick = (festival) => {
    navigate(`/search/festival/detail/${festival.contentid}`, {
      state: { festival },
    }); // 수정: 디테일 페이지로 이동하면서 festival 데이터 전달
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="festival" />
      <h1>Festivals</h1>
      <div className="row">
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

        <div className="col-md-8">
          <CardList
            items={allFestivals}
            onButtonClick={handleCardButtonClick}
            onCardClick={handleCardClick} // 수정: onCardClick 전달
          />
          {isFetching && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  );
};

export default FestivalPage;
