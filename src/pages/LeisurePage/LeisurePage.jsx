import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLeisureQuery } from "../../hooks/useLeisure";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import Map from "../component/Map/Map";

const LeisurePage = () => {
  const [page, setPage] = useState(1);
  const [allLeisures, setAllLeisures] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: leisures, isFetching } = useLeisureQuery(page, pageSize);

  useEffect(() => {
    if (leisures) {
      setAllLeisures((prev) => [...prev, ...leisures]);
    }
  }, [leisures]);

  const handleCardButtonClick = (location) => {
    setSelectedLocation(location);
  };

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=leisure`);
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="leisure" />
      <h1>Leisure Activities</h1>

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
          <CardList items={allLeisures} onButtonClick={handleCardButtonClick} />
          {isFetching && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  );
};

export default LeisurePage;