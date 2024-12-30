import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFestivalQuery } from "../../hooks/useFestival";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";

const FestivalPage = () => {
  const [page, setPage] = useState(1);
  const [allFestivals, setAllFestivals] = useState([]);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: festivals, isFetching } = useFestivalQuery(page, pageSize);

  useEffect(() => {
    if (festivals) {
      setAllFestivals((prev) => [...prev, ...festivals]);
    }
  }, [festivals]);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=festival`);
  };

  const handleCardClick = (festival) => {
    navigate(`/search/festival/detail/${festival.contentid}`, {
      state: { festival },
    });
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="festival" />
      <h1>Festivals</h1>
      <CardList items={allFestivals} onCardClick={handleCardClick} />
      {isFetching && <p>Loading more...</p>}
    </div>
  );
};

export default FestivalPage;