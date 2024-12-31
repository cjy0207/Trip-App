import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; 
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import { useSearchQuery } from "../../hooks/useSearch";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get("query") || "";
  const filterFromUrl = searchParams.get("filter") || "all";

  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState([]);
  const pageSize = 10;

  const filters = {
    accommodation: 32,
    leisure: 28,
    festival: 15,
    tourCourse: 25,
  };

  const { data: results, isLoading } = useSearchQuery(
    keywordFromUrl,
    page,
    pageSize,
    filterFromUrl === "all" ? Object.values(filters) : [filters[filterFromUrl]]
  );

  const navigate = useNavigate(); 

  useEffect(() => {
    if (results) {
      setAllResults((prevResults) => [...prevResults, ...results]);
    }
  }, [results]);

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
          <div className="d-flex justify-content-center">
            <strong className="me-3">Filter</strong>
            <button
              onClick={() => handleFilterChange("all")}
              className={`btn btn-sm ${filterFromUrl === "all" ? "btn-success" : "btn-outline-success"} mx-1`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("accommodation")}
              className={`btn btn-sm ${
                filterFromUrl === "accommodation" ? "btn-success" : "btn-outline-success"
              } mx-1`}
            >
              Accommodation
            </button>
            <button
              onClick={() => handleFilterChange("leisure")}
              className={`btn btn-sm ${filterFromUrl === "leisure" ? "btn-success" : "btn-outline-success"} mx-1`}
            >
              Leisure
            </button>
            <button
              onClick={() => handleFilterChange("festival")}
              className={`btn btn-sm ${filterFromUrl === "festival" ? "btn-success" : "btn-outline-success"} mx-1`}
            >
              Festival
            </button>
            <button
              onClick={() => handleFilterChange("tourCourse")}
              className={`btn btn-sm ${
                filterFromUrl === "tourCourse" ? "btn-success" : "btn-outline-success"
              } mx-1`}
            >
              Tour Course
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <CardList
            items={allResults}
            onCardClick={handleCardClick} 
          />

          {results?.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button onClick={loadMore} className="btn btn-success mb-5" disabled={isLoading}>
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;