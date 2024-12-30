import React from "react";
import "./CardList.style.css";

const CardList = ({ items, onButtonClick, onCardClick }) => {  // 수정: onCardClick 추가
  return (
    <div className="card-list">
      {items?.map((item, index) => (
        <div
          key={index}
          className="card-horizontal"
          onClick={() => onCardClick(item)} // 수정: 카드 클릭 시 디테일 페이지로 이동
          style={{ cursor: "pointer" }} 
        >
          <img
            src={item.firstimage || "https://via.placeholder.com/300"}
            alt={item.title}
            className="card-horizontal-img"
          />
          <div className="card-horizontal-body">
            <h5 className="card-horizontal-title">{item.title}</h5>
            <p className="card-horizontal-location">{item.addr1 || "Unknown location"}</p>
            <p className="card-horizontal-price">
              <strong>Price: </strong>
              {item.price ? `${item.price.toLocaleString()}$` : "Price not available"}
            </p>
            <div className="card-horizontal-footer">
              <button
                className="btn btn-sm btn-primary mt-2"
                onClick={(e) => {
                  e.stopPropagation(); // 수정: 클릭 이벤트 전파 방지
                  onButtonClick({
                    address: item.addr1,
                    lat: item.latitude,
                    lng: item.longitude,
                  });
                }}
              >
                지도 보기
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
