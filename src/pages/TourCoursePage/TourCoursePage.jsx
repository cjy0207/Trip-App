import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTourCourseQuery } from "../../hooks/useTourCourse"; 
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";

const TourCoursePage = () => {
  const [page, setPage] = useState(1);
  const [allTourCourses, setAllTourCourses] = useState([]);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: tourCourses, isLoading, isError, error, isFetching } = useTourCourseQuery(page, pageSize); 

  useEffect(() => {
    if (tourCourses) {
      setAllTourCourses((prevCourses) => [...prevCourses, ...tourCourses]);
    }
  }, [tourCourses]);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=tourCourse`);
  };

  const loadMoreTourCourses = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="tourCourse" />
      <h1>Tour Courses</h1>
      {isLoading && page === 1 && <p>Loading tour courses...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && allTourCourses.length === 0 && <p>No tour courses found.</p>}

      <CardList items={allTourCourses} itemType="tourCourse" />

      {isFetching && <p>Loading more tour courses...</p>}

      {!isFetching && tourCourses?.length === pageSize && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            className="btn btn-success mb-5"
            onClick={loadMoreTourCourses}
            disabled={isFetching}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default TourCoursePage;