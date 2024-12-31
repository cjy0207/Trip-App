import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import { useSearchQuery } from "../../hooks/useSearch";
import ScrollToTopButton from "../component/ScrollTop/ScrollToTopButton";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get("query") || "";
  const filterFromUrl = searchParams.get("filter") || "all";

  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState([]);
  const pageSize = 10;

  const filters = {
    all: "All",
    accommodation: "숙박",
    leisure: "레저",
    festival: "축제",
    tourCourse: "여행 코스",
  };

  const filterTypeIds = {
    all: null,
    accommodation: 32,
    leisure: 28,
    festival: 15,
    tourCourse: 25,
  };

  const { data: results, isLoading } = useSearchQuery(
    keywordFromUrl,
    page,
    pageSize,
    filterFromUrl === "all" ? Object.values(filterTypeIds).filter(Boolean) : [filterTypeIds[filterFromUrl]]
  );

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Query Params:", { keywordFromUrl, filterFromUrl });
    console.log("Results:", results);

    if (results) {
      setAllResults((prevResults) => [...prevResults, ...results]);
    } else if (page === 1) {
      setAllResults([]);
    }
  }, [results, page]);

  const handleSearch = (query) => {
    setSearchParams({ query, filter: "all" });
    setPage(1);
    setAllResults([]);
  };

  const handleFilterChange = (filter) => {
    setSearchParams({ query: keywordFromUrl, filter });
    setPage(1);
    setAllResults([]);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCardClick = (hotel) => {
    navigate(`/search/accommodation/detail/${hotel.contentid}`, { state: { hotel } });
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} />

      <div className="row">
        <div className="col-12 mb-3 text-center">
          <div className="d-flex justify-content-center flex-wrap">
            {Object.keys(filters).map((key) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className={`btn btn-sm mx-1 ${
                  filterFromUrl === key ? "btn-success" : "btn-outline-success"
                }`}
              >
                {filters[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <CardList items={allResults} onCardClick={handleCardClick} />

          {allResults.length > 0 && (
            <div className="text-center mt-4 mb-4">
              <button onClick={loadMore} className="btn btn-success" disabled={isLoading}>
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
};

export default SearchPage;