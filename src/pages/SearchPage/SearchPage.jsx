import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // useNavigate 추가
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import Map from "../component/Map/Map";
import { useSearchQuery } from "../../hooks/useSearch";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get("query") || "";
  const filterFromUrl = searchParams.get("filter") || "all";

  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); // 선택된 위치
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

  // useNavigate 훅 사용
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

  // 카드 클릭 핸들러 추가
  const handleCardClick = (hotel) => {
    navigate(`/search/accommodation/detail/${hotel.contentid}`, { state: { hotel } }); // 수정된 부분
  };

  // 버튼 클릭 핸들러 (지도 보기)
  const handleCardButtonClick = (location) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.error("Kakao Maps SDK가 로드되지 않았습니다.");
      alert("지도를 사용할 수 없습니다. 잠시 후 다시 시도하세요.");
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    if (location && location.lat && location.lng) {
      // 위도와 경도가 있는 경우
      setSelectedLocation(location);
    } else if (location && location.address) {
      // 주소를 좌표로 변환
      geocoder.addressSearch(location.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { y, x } = result[0]; // y: 위도, x: 경도
          setSelectedLocation({ lat: parseFloat(y), lng: parseFloat(x) });
        } else {
          console.error("주소 변환 실패:", status);
          alert("해당 주소를 찾을 수 없습니다.");
        }
      });
    } else {
      console.warn("잘못된 위치 데이터:", location);
    }
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
        {/* 왼쪽 지도 영역 */}
        <div className="col-md-4 mb-4 mt-3">
          <div style={{ position: "sticky", top: "80px" }}>
            {selectedLocation ? (
              <Map
                latitude={selectedLocation.lat}
                longitude={selectedLocation.lng}
                address={selectedLocation.address}
              />
            ) : (
              <p style={{ textAlign: "center" }}>지도를 보려면 "지도 보기" 버튼을 클릭하세요.</p>
            )}
          </div>
        </div>

        {/* 오른쪽 카드 리스트 영역 */}
        <div className="col-md-8">
          <CardList
            items={allResults}
            onCardClick={handleCardClick} // 카드 클릭 핸들러 전달
            onButtonClick={handleCardButtonClick} // 버튼 클릭 이벤트 핸들러 전달
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
