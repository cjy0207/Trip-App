import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLeisureQuery } from "../../hooks/useLeisure";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import ScrollToTopButton from "../component/ScrollTop/ScrollToTopButton";

const LeisurePage = () => {
  const [page, setPage] = useState(1);
  const [allLeisures, setAllLeisures] = useState([]);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: leisures, isFetching } = useLeisureQuery(page, pageSize);

  useEffect(() => {
    if (leisures) {
      setAllLeisures((prev) => [...prev, ...leisures]);
    }
  }, [leisures]);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=leisure`);
  };

  const handleCardClick = (leisure) => {
    navigate(`/search/leisure/detail/${leisure.contentid}`, {
      state: { leisure },
    });
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const hasMore = leisures?.length === pageSize;

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="leisure" />
      <h1>Leisure Activities</h1>
      <CardList items={allLeisures} onCardClick={handleCardClick} />
      {isFetching && <p>Loading...</p>}
      {hasMore && !isFetching && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button onClick={loadMore} className="btn btn-success mb-5">
            Load More
          </button>
        </div>
      )}
      <ScrollToTopButton/>
    </div>
  );
};

export default LeisurePage;