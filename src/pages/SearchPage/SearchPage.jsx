import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // useNavigate 추가
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

  const navigate = useNavigate(); // navigate 추가

  // 결과 업데이트
  useEffect(() => {
    if (results) {
      setAllResults((prevResults) => [...prevResults, ...results]);
    }
  }, [results]);

  // 검색 처리
  const handleSearch = (query) => {
    setSearchParams({ query, filter: "all" });
    setPage(1);
    setAllResults([]);
  };

  // 필터 변경 처리
  const handleFilterChange = (filter) => {
    setSearchParams({ query: keywordFromUrl, filter });
    setPage(1);
    setAllResults([]);
  };

  // 더보기 버튼 클릭 처리
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // 카드 클릭 핸들러
  const handleCardClick = (hotel) => {
    navigate(`/search/accommodation/detail/${hotel.contentid}`, { state: { hotel } });
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} />

      {/* 필터 영역 */}
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
        {/* 오른쪽 카드 리스트 영역 */}
        <div className="col-12">
          <CardList
            items={allResults}
            onCardClick={handleCardClick} // 카드 클릭 핸들러 전달
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