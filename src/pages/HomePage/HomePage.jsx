import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAccommodation from "../../hooks/useAccommodation";

const HomePage = () => {
  const [areaCode, setAreaCode] = useState(1);
  const [sigunguCode, setSigunguCode] = useState(null);

  const { accommodations, loading, error } = useAccommodation(areaCode, sigunguCode);

  const handleAreaChange = (area) => {
    setAreaCode(area);
    setSigunguCode(null);
  };

  const areaData = [
    { code: 1, name: "Seoul", image: "seoul.jpg" },
    { code: 39, name: "Jeju", image: "jeju.jpg" },
    { code: 32, name: "Gangneung", image: "gangneung.jpg" },
    { code: 5, name: "Busan", image: "busan.jpg" }
  ];

  return (
    <div className="container mt-4">
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
                src={`path/to/images/${area.image}`} 
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

      {loading && <p>Loading accommodations...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <div className="row">
        {accommodations?.length > 0 ? (
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
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No accommodations found for the selected area.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
