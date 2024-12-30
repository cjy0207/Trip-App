import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import { useAccommodationQuery } from "../../hooks/useAccommodation";
import Banner from "../component/Banner/Banner.jsx"; // Banner 컴포넌트 수정 필요
import "./HomePage.style.css";

const HomePage = () => {
  const [areaCode, setAreaCode] = useState(1); // 선택한 지역 코드
  const navigate = useNavigate(); // 수정: useNavigate 추가

  // useAccommodationQuery에 areaCode만 사용 (페이지 매개변수 제거)
  const { data: accommodations, isLoading, isError, error } = useAccommodationQuery(areaCode);

  const handleAreaChange = (area) => {
    setAreaCode(area); // 선택된 지역 코드 업데이트
  };

  const areaData = [
    { code: 1, name: "Seoul", image: "seoul.png" },
    { code: 39, name: "Jeju", image: "jeju.png" },
    { code: 32, name: "Gangneung", image: "gangneung.png" },
    { code: 5, name: "Busan", image: "busan.png" },
  ];

  // 검색 처리 함수
  const handleSearch = (query) => {
    console.log(`Searching for ${query}`);
    navigate(`/search?query=${query}`); // 수정: 검색어로 SearchPage로 이동
  };

  return (
    <div>
      <Banner onSearch={handleSearch} className="home-banner" /> {/* handleSearch 함수 전달 */}

<div className="container mt-4">
<h1>Select Area</h1>

      <div className="row mb-3">
        {areaData.map((area) => (
          <div key={area.code} className="col-md-3 mb-4">
            <div
              className="home-home-area-card"
              onClick={() => handleAreaChange(area.code)} // 클릭 이벤트
            >
              <img
                src={`/photo/${area.image}`}
                className="home-home-area-card-img"
                alt={area.name}
              />
              <div className="home-home-area-card-body">
                <h5 className="home-home-area-card-title">{area.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1>Accommodation Recommend</h1>

      {isLoading && <p>Loading accommodations...</p>}

      {isError && (
        <p className="text-danger">
          Error: {error.message || "Failed to load accommodations."}
        </p>
      )}

      <div className="row">
        {Array.isArray(accommodations) && accommodations.length > 0 ? (
          accommodations.slice(0, 3).map((item) => (
            <div key={item.contentid} className="col-md-4 mb-4">
              <div className="home-home-card">
                <div className="home-home-card-body">
                  <h5 className="home-home-card-title">{item.title}</h5>
                  <p className="home-home-card-text">{item.addr1}</p>
                  <p className="home-home-card-text">
                    {item.tel ? `Contact: ${item.tel}` : "No contact available"}
                  </p>
                  <Link
                    to={`/detail/${item.contentid}`}
                    state={{ hotel: item }}
                    className="home-btn-primary btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          !isLoading && <p>No accommodations found for the selected area.</p>
        )}
      </div>
</div>
      
    </div>
  );
};

export default HomePage;