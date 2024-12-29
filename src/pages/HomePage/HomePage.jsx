import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAccommodationQuery } from "../../hooks/useAccommodation";
import Banner from "../component/Banner/Banner.jsx";
import "./HomePage.style.css";

const HomePage = () => {
  const [areaCode, setAreaCode] = useState(1); 
  const [page, setPage] = useState(1); 
  const { data: accommodations, isLoading, isError, error } = useAccommodationQuery(page, 10); 

  const handleAreaChange = (area) => {
    setAreaCode(area);
    setPage(1); 
  };

  const areaData = [
    { code: 1, name: "Seoul", image: "seoul.png" },
    { code: 39, name: "Jeju", image: "jeju.png" },
    { code: 32, name: "Gangneung", image: "gangneung.png" },
    { code: 5, name: "Busan", image: "busan.png" },
  ];

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

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
              onClick={() => handleAreaChange(area.code)}
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
          accommodations.map((item) => (
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

      <div className="d-flex justify-content-between mt-4">
        <button
          className="home-btn-primary btn"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button className="home-btn-primary btn" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;