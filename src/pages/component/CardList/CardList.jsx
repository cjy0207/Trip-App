import React from "react";
import "./CardList.style.css";

const CardList = ({ items, onButtonClick }) => {
  return (
    <div className="card-list">
      {items?.map((item, index) => (
        <div key={index} className="card-horizontal">
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
        </div>
      ))}
    </div>
  );
};

export default CardList;