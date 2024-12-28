import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import Map from "../component/Map/Map"; // Import Map
import { useSearchQuery } from "../../hooks/useSearch";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get("query") || "";
  const filterFromUrl = searchParams.get("filter") || "all";

  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본 위치 (서울)
  const pageSize = 10;

  const filters = {
    accommodation: 32,
    leisure: 28,
    festival: 15,
    tourCourse: 25,
  };

  const { data: results, isLoading, isError, error } = useSearchQuery(
    keywordFromUrl,
    page,
    pageSize,
    filterFromUrl === "all" ? Object.values(filters) : [filters[filterFromUrl]]
  );

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("위치를 가져올 수 없습니다:", error);
          alert("현재 위치를 사용할 수 없어 기본 위치를 표시합니다.");
        }
      );
    }
  }, []);

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} />

      {/* 필터 부분 */}
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
        {/* 왼쪽 지도 영역 */}
        <div className="col-md-4 mb-4 mt-3">
          <div style={{ position: "sticky", top: "80px" }}>
            {/* Sticky 속성을 추가하여 스크롤 시 상단에 고정 */}
            <Map latitude={currentLocation.lat} longitude={currentLocation.lng} width="100%" height="300px" />
          </div>
        </div>

        {/* 오른쪽 카드 리스트 영역 */}
        <div className="col-md-8">
          <CardList items={allResults} itemType={filterFromUrl} />

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