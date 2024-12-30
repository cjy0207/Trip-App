import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccommodationQuery } from "../../hooks/useAccommodation";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";

const AccommodationPage = () => {
  const [page, setPage] = useState(1);
  const [allAccommodations, setAllAccommodations] = useState([]);
  const pageSize = 10;

  const navigate = useNavigate();

  const { data: accommodations, isFetching } = useAccommodationQuery(page, pageSize);

  useEffect(() => {
    if (accommodations) {
      setAllAccommodations((prev) => [...prev, ...accommodations]);
    }
  }, [accommodations]);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=accommodation`);
  };

  const handleCardClick = (hotel) => {
    navigate(`/search/accommodation/detail/${hotel.contentid}`, { state: { hotel } });
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="accommodation" />
      <h1>Accommodations</h1>
      <CardList items={allAccommodations} onCardClick={handleCardClick} />
      {isFetching && <p>Loading more...</p>}
    </div>
  );
};

export default AccommodationPage;