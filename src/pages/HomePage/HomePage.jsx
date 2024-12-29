import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAccommodationQuery } from "../../hooks/useAccommodation";
import Banner from "../component/Banner/Banner.jsx";
import "./HomePage.style.css";

const HomePage = () => {
  const [areaCode, setAreaCode] = useState(1); // 선택한 지역 코드

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

  return (
    <div className="container mt-4">
      <Banner />
      <h1>Select Area</h1>

      <div className="row mb-3">
        {areaData.map((area) => (
          <div key={area.code} className="col-md-3 mb-4">
            <div
              className="card"
              style={{ cursor: "pointer" }}
              onClick={() => handleAreaChange(area.code)} // 클릭 이벤트 추가
            >
              <img
                src={`/photo/${area.image}`}
                className="card-img-top"
                alt={area.name}
              />
              <div className="card-body">
                <h5 className="card-title">{area.name}</h5>
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
          accommodations.slice(0, 3).map((item) => ( // 슬라이스 추가
            <div key={item.contentid} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.addr1}</p>
                  <p className="card-text">
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
  );
};

export default HomePage;
