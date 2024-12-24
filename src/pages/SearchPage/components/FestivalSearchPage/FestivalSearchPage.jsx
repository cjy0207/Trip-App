import React, { useState } from "react"
import useFestival from "../../../../hooks/useFestival";
import "bootstrap/dist/css/bootstrap.min.css";

const FestivalSearchPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { festivals, loading, error, hasMore } = useFestival(page, pageSize);

  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Festival Search</h1>
      {loading && <p>Loading festival data...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      <div className="row">
        {festivals.map((item, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={item.image || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={item.title}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p>{item.location || "Unknown"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button onClick={loadMore} className="btn btn-primary mt-3" disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
};

export default FestivalSearchPage;