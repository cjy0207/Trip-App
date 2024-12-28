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

  const { data: accommodations, isLoading, isError, error, isFetching } = useAccommodationQuery(page, pageSize);

  useEffect(() => {
    if (accommodations) {
      setAllAccommodations((prevAccommodations) => [...prevAccommodations, ...accommodations]);
    }
  }, [accommodations]);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=accommodation`);
  };

  const loadMoreAccommodations = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="accommodation" />
      <h1>Accommodations</h1>
      {isLoading && page === 1 && <p>Loading accommodations...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && allAccommodations.length === 0 && <p>No accommodations found.</p>}

      <CardList items={allAccommodations} itemType="accommodation" />

      {isFetching && <p>Loading more accommodations...</p>}

      {!isFetching && accommodations?.length === pageSize && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            className="btn btn-success mb-5"
            onClick={loadMoreAccommodations}
            disabled={isFetching}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AccommodationPage;