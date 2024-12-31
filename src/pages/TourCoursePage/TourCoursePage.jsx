import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTourCourseQuery } from "../../hooks/useTourCourse";
import Banner from "../component/Banner/Banner";
import CardList from "../component/CardList/CardList";
import ScrollToTopButton from "../component/ScrollTop/ScrollToTopButton";

const TourCoursePage = () => {
  const [page, setPage] = useState(1);
  const [allTourCourses, setAllTourCourses] = useState([]);
  const pageSize = 10;
  const navigate = useNavigate();

  const { data: tourCourses, isFetching } = useTourCourseQuery(page, pageSize);

  useEffect(() => {
    if (tourCourses) {
      setAllTourCourses((prev) => [...prev, ...tourCourses]);
    }
  }, [tourCourses]);

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}&filter=tourCourse`);
  };

  const handleCardClick = (tourCourse) => {
    navigate(`/search/tour/detail/${tourCourse.contentid}`, {
      state: { tourCourse },
    });
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const hasMore = tourCourses?.length === pageSize;

  return (
    <div className="container mt-4">
      <Banner onSearch={handleSearch} filter="tourCourse" />
      <h1>Tour Courses</h1>
      <CardList items={allTourCourses} onCardClick={handleCardClick} />
      {isFetching && <p>Loading...</p>}
      {hasMore && !isFetching && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button onClick={loadMore} className="btn btn-success mb-5">
            Load More
          </button>
        </div>
      )}
      <ScrollToTopButton/>
    </div>
  );
};

export default TourCoursePage;