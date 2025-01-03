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
    tourcourse: 25,
  };

  const { data: results, isLoading } = useSearchQuery(
    keywordFromUrl,
    page,
    pageSize,
    filterFromUrl === "all" ? Object.values(filterTypeIds).filter(Boolean) : [filterTypeIds[filterFromUrl]]
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (results && results.length > 0) {
      setAllResults((prevResults) => {
        const newResults = results.filter(
          (result) => !prevResults.some((prev) => prev.contentid === result.contentid)
        );
        return [...prevResults, ...newResults];
      });
    }
  }, [results, page]);

  const handleSearch = (query) => {
    console.log("Searching with query:", query);
    setSearchParams({ query, filter: "all" });
    setPage(1);
    setAllResults([]);
  };

  const handleFilterChange = (filter) => {
    console.log("Changing filter to:", filter);
    setSearchParams({ query: keywordFromUrl, filter });
    setPage(1);
    setAllResults([]);
  };

  const loadMore = () => {
    console.log("Loading more results...");
    setPage((prevPage) => prevPage + 1);
  };

  // 카드 클릭 핸들러
  const handleCardClick = (item) => {
    console.log("Clicked item:", item);

    const categoryMap = {
      32: "accommodation",
      28: "leisure",
      15: "festival",
      25: "tourcourse",
    };

    const category = categoryMap[item.contenttypeid];

    if (category) {
      navigate(`/search/${category}/detail/${item.contentid}`, { state: { [category]: item } });
      console.log("Navigating to:", `/search/${category}/detail/${item.contentid}`, {
        state: { [category]: item },
      });
    } else {
      console.warn("Unknown contenttypeid:", item.contenttypeid);
    }
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} />

      <div className="row">
        <div className="col-12 mb-3 text-center">
          <div className="d-flex justify-content-center">
            <strong className="me-3">Filter</strong>
            {Object.keys(filters).map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`btn btn-sm ${
                  filterFromUrl === filter ? "btn-success" : "btn-outline-success"
                } mx-1`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 카드 리스트 영역 */}
      <div className="row">
        <div className="col-12">
          <CardList items={allResults} onCardClick={handleCardClick} />

          {results?.length > 0 && (
            <div className="text-center mt-4">
              <button
                onClick={loadMore}
                className="btn btn-success mb-5"
                disabled={isLoading}
              >
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
