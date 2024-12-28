import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFestivalQuery } from "../../hooks/useFestival";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";

const FestivalPage = () => {
  const [page, setPage] = useState(1);
  const [allFestivals, setAllFestivals] = useState([]); 
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: festivals, isLoading, isError, error, isFetching } = useFestivalQuery(page, pageSize);

  React.useEffect(() => {
    if (festivals) {
      setAllFestivals((prevFestivals) => [...prevFestivals, ...festivals]);
    }
  }, [festivals]);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=festival`);
  };

  const loadMoreFestivals = () => {
    setPage((prevPage) => prevPage + 1); 
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="festival" />
      <h1>Festivals</h1>
      {isLoading && page === 1 && <p>Loading festivals...</p>} 
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && allFestivals.length === 0 && <p>No festivals found.</p>}
      
      <CardList items={allFestivals} itemType="festival" />
      
      {isFetching && <p>Loading more festivals...</p>} 
      
      {!isFetching && festivals?.length === pageSize && ( 
        <div
          style={{
            display: "flex",
            justifyContent: "center", 
            marginTop: "20px", 
          }}
        >
          <button
            className="btn btn-success mb-5"
            onClick={loadMoreFestivals}
            disabled={isFetching}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FestivalPage;