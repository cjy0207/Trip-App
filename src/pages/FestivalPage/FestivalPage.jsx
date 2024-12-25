import React, { useState } from "react";
import useFestival from "../../hooks/useFestival";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FestivalPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { festivals, loading, error } = useFestival(page, pageSize);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Festivals</h2>

      {/* 로딩 상태 */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && <p className="text-danger text-center">Error: {error}</p>}

      {/* 데이터 표시 */}
      {!loading && festivals.length === 0 && <p className="text-center">No festivals found.</p>}

      <div className="list-group">
        {festivals.map((item, index) => (
          <div key={index} className="list-group-item mb-3">
            <div className="row">
              <div className="col-4">
                <img
                  src={item.firstimage || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-8">
                <h5>{item.title}</h5>
                <p>Address: {item.addr1 || "Unknown address"}</p>
                <p>Contact: {item.tel || "Not available"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4">
        {Array.from({ length: Math.ceil(festivals.length / pageSize) }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn mx-1 ${
              page === pageNumber ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FestivalPage;