import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLeisureQuery } from "../../hooks/useLeisure";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";

const LeisurePage = () => {
  const [page, setPage] = useState(1);
  const [allLeisures, setAllLeisures] = useState([]);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: leisures, isLoading, isError, error, isFetching } = useLeisureQuery(page, pageSize);

  useEffect(() => {
    if (leisures) {
      setAllLeisures((prevLeisures) => [...prevLeisures, ...leisures]);
    }
  }, [leisures]);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=leisure`);
  };

  const loadMoreLeisures = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="leisure" />
      <h1>Leisure Activities</h1>
      {isLoading && page === 1 && <p>Loading leisure activities...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && allLeisures.length === 0 && <p>No leisure activities found.</p>}

      <CardList items={allLeisures} itemType="leisure" />

      {isFetching && <p>Loading more leisure activities...</p>}

      {!isFetching && leisures?.length === pageSize && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            className="btn btn-success mb-5"
            onClick={loadMoreLeisures}
            disabled={isFetching}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default LeisurePage;