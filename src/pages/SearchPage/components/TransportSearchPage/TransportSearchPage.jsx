import React, { useState } from "react";
import useTransport from "../../../../hooks/useTransport";
import "bootstrap/dist/css/bootstrap.min.css";

const TransportSearchPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { transport, loading, error, hasMore } = useTransport(page, pageSize);

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Transport Search</h1>

      <div>
        {loading && <p>Loading transport data...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {!loading && transport.length === 0 && <p>No transport options found.</p>}

        <div className="list-group">
          {transport.map((item, index) => (
            <div key={index} className="list-group-item mb-3">
              <div className="row">
                <div className="col-4">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-8">
                  <h5>{item.title}</h5>
                  <p>Location: {item.location || "Unknown"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={loadMore}
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default TransportSearchPage;