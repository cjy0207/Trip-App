import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardList from "../component/CardList/CardList";
import { useLeisureQuery } from "../../hooks/useLeisure";
import Banner from "../component/Banner/Banner";

const LeisurePage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: leisure, isLoading, isError, error } = useLeisureQuery(page, pageSize);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=leisure`);
  };

  const handleCardClick = (leisureSpot) => {
    navigate(`/search/leisure/detail/${leisureSpot.contentid}`, {
      state: { leisureSpot },
    });
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="leisure" />
      <h1>Leisure Spots</h1>
      {isLoading && <p>Loading leisure spots...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && leisure?.length === 0 && <p>No leisure spots found.</p>}
      <CardList
        items={leisure}
        itemType="leisure"
        onCardClick={handleCardClick}  // onCardClick 전달
      />
    </div>
  );
};

export default LeisurePage;
