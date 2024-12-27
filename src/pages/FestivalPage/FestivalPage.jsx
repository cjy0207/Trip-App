import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFestivalQuery } from "../../hooks/useFestival";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";

const FestivalPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: festivals, isLoading, isError, error } = useFestivalQuery(page, pageSize);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=festival`);
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="festival" />
      <h1>Festivals</h1>
      {isLoading && <p>Loading festivals...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && festivals?.length === 0 && <p>No festivals found.</p>}
      <CardList items={festivals} itemType="festival" />
    </div>
  );
};

export default FestivalPage;