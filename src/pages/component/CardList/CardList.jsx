import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CardList.style.css";

const CardList = ({ items, onButtonClick }) => {
  return (
    <div className="card-list">
      {items?.map((item, index) => (
        <div key={index} className="card-horizontal d-flex align-items-center mb-3">
          <img
            src={item.firstimage || "https://via.placeholder.com/300"}
            alt={item.title}
            className="card-horizontal-img img-fluid"
          />
          <div className="card-horizontal-body ms-3">
            <h5 className="card-horizontal-title mb-1">{item.title}</h5>
            <p className="card-horizontal-location text-muted">{item.addr1 || "Unknown location"}</p>
            <div className="card-horizontal-footer d-flex justify-content-between align-items-center mt-2">
              <span className="badge bg-success score-badge">{item.score || "N/A"}</span>
              <div className="card-horizontal-price text-end">
                <div>{item.price ? `${item.price.toLocaleString()}$` : "Price not available"}</div>
                <small className="text-muted">1박 요금</small>
              </div>
            </div>
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={() =>
                onButtonClick({
                  address: item.addr1, // 주소를 전달
                  lat: item.latitude, // 필요 시 위도도 전달
                  lng: item.longitude, // 필요 시 경도도 전달
                })
              }
            >
              지도 보기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;