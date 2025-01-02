import React from "react";
import "./CardList.style.css";

const CardList = ({ items, onCardClick }) => {
  return (
    <div className="card-list">
      {items?.map((item, index) => (
        <div
          key={index}
          className="card-horizontal"
          onClick={() => onCardClick(item)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={item.firstimage || "https://via.placeholder.com/300"}
            alt={item.title}
            className="card-horizontal-img"
          />
          <div className="card-horizontal-body">
            <h5 className="card-horizontal-title">{item.title}</h5>
            <p className="card-horizontal-location">{item.addr1 || "Unknown address"}</p>
            <div className="card-horizontal-footer">
              <span className="badge">{item.price ? `${item.price}$` : "N/A"}</span>
              <span className="card-horizontal-price">Price not available</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;