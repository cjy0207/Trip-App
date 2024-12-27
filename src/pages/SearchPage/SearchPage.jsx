import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import { useSearchQuery } from "../../hooks/useSearch";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get("query") || "";
  const filterFromUrl = searchParams.get("filter") || "all";

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // 검색 필터: 숙박 (32), 레저 (28), 축제 (15), 여행 코스 (25)
  const filters = {
    accommodation: 32,
    leisure: 28,
    festival: 15,
    tourCourse: 25,
  };

  // React Query를 사용해 검색 결과 가져오기
  const { data: results, isLoading, isError, error } = useSearchQuery(
    keywordFromUrl,
    page,
    pageSize,
    filterFromUrl === "all" ? Object.values(filters) : [filters[filterFromUrl]]
  );

  const handleSearch = (query) => {
    setSearchParams({ query, filter: "all" });
    setPage(1); // 검색어 변경 시 페이지 초기화
  };

  const handleFilterChange = (filter) => {
    setSearchParams({ query: keywordFromUrl, filter });
    setPage(1); // 필터 변경 시 페이지 초기화
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} />
      <div className="mb-3">
        <strong>Filter</strong>
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

      {isLoading && <p>Loading results...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && results?.length === 0 && <p>No results found.</p>}

      {!isLoading && results?.length > 0 && (
        <CardList items={results} itemType={filterFromUrl} />
      )}

      {results?.length > 0 && (
        <div className="text-center mt-4">
          <button onClick={loadMore} className="btn btn-success" disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;