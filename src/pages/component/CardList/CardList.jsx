import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CardList.style.css";

const CardList = ({ items }) => {
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
            <div className="card-horizontal-footer">
              <span className="badge bg-success score-badge">{item.score || "N/A"}</span>
              <div className="card-horizontal-price">
                {item.price ? `${item.price.toLocaleString()}$` : "Price not available"}
                <span className="small-text">1박 요금</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
