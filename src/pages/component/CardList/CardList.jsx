import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CardList.style.css";

const CardList = ({ items, itemType, onCardClick }) => {
  return (
    <div className="row">
      {items?.map((item, index) => (
        <div key={`${item.contentid}-${index}`} className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm" onClick={() => onCardClick(item)}>
            <img
              src={item.firstimage || "https://via.placeholder.com/300"}
              alt={item.title}
              className="card-img-top img-fluid"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="text-muted mb-1">{item.addr1 || "Unknown address"}</p>
              <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-success" style={{ fontSize: "1rem" }}>
                  {item.score || "N/A"}
                </span>
                <span className="text-end">
                  {item.price ? `${item.price.toLocaleString()}$` : "Price not available"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;