import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccommodationQuery } from "../../hooks/useAccommodation";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";

const AccommodationPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: accommodations, isLoading, isError, error } = useAccommodationQuery(page, pageSize);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=accommodation`);
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="accommodation" />
      <h1>Accommodations</h1>
      {isLoading && <p>Loading accommodations...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && accommodations?.length === 0 && <p>No accommodations found.</p>}
      <CardList items={accommodations} itemType="accommodation" />
    </div>
  );
};

export default AccommodationPage;